import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PrismaService } from '../prisma/prisma.service';
import { DashboardService } from '../dashboard/dashboard.service';
import { MailService } from '../mail/mail.service';
import { baseEmailTemplate } from '../mail/templates/base.template';
import { MonthlySummaryEmailData, monthlySummaryContent } from '../mail/templates/monthly-summary.template';
import {
  MonthPeriod,
  calculateVariation,
  currentMonthKey,
  previousMonthKey,
  resolveMonthPeriod,
} from '../common/monthly-period.util';

/**
 * Día 1 de cada mes a las 09:00 (hora del servidor), el mismo horario que el aviso diario de
 * cuotas recurrentes. No se usa medianoche para no competir con el pico de jobs de esa hora y
 * para que, si el correo se lee al toque, llegue en un horario razonable.
 */
const MONTHLY_SUMMARY_CRON = '0 9 1 * *';

/** Cuántas categorías se listan en el correo antes de agrupar el resto. */
const EMAIL_TOP_CATEGORIES = 5;

/** Etiqueta para los gastos que no tienen categoría asignada. */
const UNCATEGORIZED_LABEL = 'Sin categoría';

/** Color de respaldo para categorías sin color propio (el mismo que usa el dashboard). */
const FALLBACK_CATEGORY_COLOR = '#cccccc';

@Injectable()
export class ReportsService {
  private readonly logger = new Logger(ReportsService.name);

  constructor(
    private prisma: PrismaService,
    private dashboardService: DashboardService,
    private mailService: MailService,
  ) {}

  /**
   * Arma el resumen mensual de un usuario: totales del mes, comparación contra el mes anterior
   * y desglose de gastos por categoría.
   *
   * Los totales salen de `DashboardService.getPeriodTotals`, así que son exactamente los mismos
   * números que el usuario ve en el dashboard para ese rango de fechas.
   *
   * @param userId dueño del resumen (siempre el del token, nunca uno arbitrario)
   * @param month mes a reportar en `YYYY-MM`; si no viene, se usa el mes anterior al actual
   * @returns el resumen del mes con la comparación y las categorías de gasto
   * @throws BadRequestException si el mes no tiene formato `YYYY-MM` o está en el futuro
   */
  async getMonthlySummary(userId: string, month?: string) {
    const requestedKey = month ?? previousMonthKey(currentMonthKey());

    let period: MonthPeriod;
    try {
      period = resolveMonthPeriod(requestedKey);
    } catch (error) {
      throw new BadRequestException((error as Error).message);
    }

    // Comparación de strings `YYYY-MM`: al ser de largo fijo y con ceros a la izquierda,
    // el orden lexicográfico coincide con el cronológico.
    if (period.key > currentMonthKey()) {
      throw new BadRequestException(`No se puede pedir el resumen de un mes futuro (${period.key}).`);
    }

    const previousPeriod = resolveMonthPeriod(previousMonthKey(period.key));

    const [current, previous, transactionsCount] = await Promise.all([
      this.dashboardService.getPeriodTotals(userId, { date_from: period.from, date_to: period.to }),
      this.dashboardService.getPeriodTotals(userId, { date_from: previousPeriod.from, date_to: previousPeriod.to }),
      this.countMovements(userId, period),
    ]);

    const expensesByCategory = current.expensesByCategory.map(category => ({
      name: category.name ?? UNCATEGORIZED_LABEL,
      color: category.color ?? FALLBACK_CATEGORY_COLOR,
      total: category.total,
      // Participación sobre el gasto del mes. Si no hubo gastos no hay categorías, pero se
      // guarda igual contra la división por cero.
      percentage:
        current.totalExpense > 0 ? Number(((category.total / current.totalExpense) * 100).toFixed(1)) : 0,
    }));

    return {
      month: period,
      previous_month: previousPeriod,
      totals: {
        income: current.totalIncome,
        expense: current.totalExpense,
        balance: current.balance,
        transactions_count: transactionsCount,
      },
      previous_totals: {
        income: previous.totalIncome,
        expense: previous.totalExpense,
        balance: previous.balance,
      },
      comparison: {
        income: calculateVariation(current.totalIncome, previous.totalIncome),
        expense: calculateVariation(current.totalExpense, previous.totalExpense),
      },
      expenses_by_category: expensesByCategory,
      // Falso cuando el mes no tuvo movimientos: el frontend puede mostrar un estado vacío
      // en vez de una pantalla llena de ceros.
      has_activity: transactionsCount > 0,
    };
  }

  /**
   * Job mensual que manda por correo el resumen del mes que terminó.
   *
   * Solo se le escribe a los usuarios con al menos un movimiento en el mes reportado: mandarle
   * un resumen en cero a alguien que no usó la app es ruido, no información.
   *
   * En Render gratuito el servicio se duerme y este job puede no correr nunca. Por eso el
   * resumen también está disponible bajo demanda en `GET /reports/monthly-summary`, que es el
   * disparador de respaldo del diseño (mismo criterio que el aviso de cuotas recurrentes).
   *
   * Es defensivo a propósito: un error con un usuario no puede cortar el envío al resto.
   */
  @Cron(MONTHLY_SUMMARY_CRON, { name: 'monthly-summary' })
  async sendMonthlySummaries() {
    const period = resolveMonthPeriod(previousMonthKey(currentMonthKey()));

    let recipients: { id: string; email: string; name: string }[];
    try {
      recipients = await this.findUsersWithActivity(period);
    } catch (error) {
      this.logger.error(
        `No se pudieron consultar los usuarios con actividad en ${period.label}: ${(error as Error).message}`,
        (error as Error).stack,
      );
      return;
    }

    if (recipients.length === 0) {
      this.logger.log(`Resumen mensual de ${period.label}: ningún usuario tuvo movimientos, no se envía nada.`);
      return;
    }

    let sent = 0;
    let failed = 0;

    // Secuencial a propósito: son correos de baja prioridad y disparar decenas de envíos en
    // paralelo contra el SMTP es la forma más rápida de que el proveedor empiece a rechazarlos.
    for (const user of recipients) {
      try {
        await this.sendMonthlySummaryTo(user, period.key);
        sent++;
      } catch (error) {
        failed++;
        this.logger.error(
          `No se pudo enviar el resumen de ${period.label} al usuario ${user.id}: ${(error as Error).message}`,
          (error as Error).stack,
        );
      }
    }

    this.logger.log(
      `Resumen mensual de ${period.label}: ${recipients.length} usuario(s) con actividad; ` +
        `${sent} enviado(s), ${failed} con error.`,
    );
  }

  /**
   * Usuarios con al menos un movimiento (ingreso o gasto) en el período.
   *
   * Se resuelve con un `groupBy` sobre `transactions` y una sola lectura de `users`, para no
   * recorrer toda la tabla de usuarios ni hacer una consulta por cada uno.
   *
   * @param period mes reportado
   * @returns id, email y nombre de cada destinatario
   */
  private async findUsersWithActivity(period: MonthPeriod) {
    const activity = await this.prisma.transactions.groupBy({
      by: ['user_id'],
      where: {
        date: { gte: new Date(period.from), lte: new Date(period.to) },
        type: { in: ['income', 'expense'] },
      },
    });

    const userIds = activity.map(row => row.user_id);
    if (userIds.length === 0) return [];

    return this.prisma.users.findMany({
      where: { id: { in: userIds } },
      select: { id: true, email: true, name: true },
    });
  }

  /**
   * Calcula y envía el resumen de un mes a un usuario puntual.
   *
   * @param user destinatario (id, email y nombre)
   * @param monthKey mes a reportar en `YYYY-MM`
   */
  private async sendMonthlySummaryTo(user: { id: string; email: string; name: string }, monthKey: string) {
    const summary = await this.getMonthlySummary(user.id, monthKey);
    const data = this.buildEmailData(summary);

    await this.mailService.sendMail({
      to: user.email,
      subject: `Tu resumen de ${summary.month.label} en Pfinance`,
      html: baseEmailTemplate(
        monthlySummaryContent(user.name, data),
        `Ingresos, gastos y balance de ${summary.month.label}, comparados con ${summary.previous_month.label}.`,
      ),
    });
  }

  /**
   * Adapta el resumen al formato que consume la plantilla: recorta las categorías al top y
   * agrupa el resto en un único total, para que el correo no crezca sin límite.
   *
   * @param summary resumen devuelto por `getMonthlySummary`
   * @returns los datos listos para `monthlySummaryContent`
   */
  private buildEmailData(summary: Awaited<ReturnType<ReportsService['getMonthlySummary']>>): MonthlySummaryEmailData {
    const topCategories = summary.expenses_by_category.slice(0, EMAIL_TOP_CATEGORIES);
    const otherCategoriesTotal = summary.expenses_by_category
      .slice(EMAIL_TOP_CATEGORIES)
      .reduce((total, category) => total + category.total, 0);

    return {
      month_label: summary.month.label,
      previous_month_label: summary.previous_month.label,
      income: summary.totals.income,
      expense: summary.totals.expense,
      balance: summary.totals.balance,
      transactions_count: summary.totals.transactions_count,
      income_variation: summary.comparison.income,
      expense_variation: summary.comparison.expense,
      top_categories: topCategories,
      other_categories_total: Number(otherCategoriesTotal.toFixed(2)),
    };
  }

  /**
   * Cantidad de movimientos del usuario en el período.
   *
   * Cuenta solo ingresos y gastos, igual que los totales: las transferencias entre cuentas
   * propias no suman ni restan al resumen, así que tampoco deberían inflar el conteo.
   *
   * @param userId dueño de las transacciones
   * @param period mes reportado
   * @returns cantidad de movimientos
   */
  private countMovements(userId: string, period: MonthPeriod) {
    return this.prisma.transactions.count({
      where: {
        user_id: userId,
        date: { gte: new Date(period.from), lte: new Date(period.to) },
        type: { in: ['income', 'expense'] },
      },
    });
  }
}
