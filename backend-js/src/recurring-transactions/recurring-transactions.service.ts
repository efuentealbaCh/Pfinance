import { BadRequestException, ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from '../prisma/prisma.service';
import { TransactionsService } from '../transactions/transactions.service';
import { PushService } from '../push/push.service';
import { MailService } from '../mail/mail.service';
import { baseEmailTemplate } from '../mail/templates/base.template';
import { recurringDueContent, RecurringDueItem } from '../mail/templates/recurring-due.template';
import {
  PendingOccurrence,
  calculatePendingOccurrences,
  formatDateOnly,
  occurrenceDate,
  parseDateOnly,
  startOfToday,
} from '../common/recurrence.util';
import { CreateRecurringTransactionDto } from './dto/create-recurring-transaction.dto';
import { UpdateRecurringTransactionDto } from './dto/update-recurring-transaction.dto';

/**
 * Ruta del frontend que abre el service worker al hacer click en la notificación push.
 * Apunta a Transacciones y no a una pantalla propia de recurrentes porque esa vista todavía
 * no existe en el PWA, y una ruta desconocida redirige al landing (`*` -> `/` en App.tsx).
 */
const RECURRING_FRONTEND_PATH = '/transactions';

@Injectable()
export class RecurringTransactionsService {
  private readonly logger = new Logger(RecurringTransactionsService.name);

  constructor(
    private prisma: PrismaService,
    private transactionsService: TransactionsService,
    private pushService: PushService,
    private mailService: MailService,
  ) {}

  /** `include` común a todas las lecturas, para que la forma de la respuesta no varíe. */
  private readonly include = {
    categories: true,
    user_accounts: { include: { banks: true } },
  };

  /**
   * Normaliza una recurrencia al formato que consume el frontend: aplana las relaciones de
   * Prisma (igual que `TransactionsService.mapTransaction`), pasa las fechas a `YYYY-MM-DD`
   * y agrega el progreso de cuotas.
   *
   * @param recurring fila de `recurring_transactions` con sus relaciones incluidas
   * @param pendingCount cuotas vencidas sin confirmar en el momento de la consulta
   * @returns el objeto listo para serializar
   */
  private mapRecurring(recurring: any, pendingCount = 0) {
    const { categories, user_accounts, ...rest } = recurring;

    let mappedUserAccount = undefined;
    if (user_accounts) {
      const { banks, ...uaRest } = user_accounts;
      mappedUserAccount = { ...uaRest, bank: banks };
    }

    const hasFixedInstallments = recurring.installments_total !== null;

    return {
      ...rest,
      amount: Number(recurring.amount),
      start_date: formatDateOnly(recurring.start_date),
      next_run_date: formatDateOnly(recurring.next_run_date),
      category: categories || null,
      user_account: mappedUserAccount,
      // Progreso tipo "cuota 8 de 36". En una suscripción indefinida no aplica y va en null,
      // para que el frontend pueda distinguir los dos casos sin inspeccionar los números.
      installments_progress: hasFixedInstallments
        ? `${recurring.installments_generated} de ${recurring.installments_total}`
        : null,
      installments_remaining: hasFixedInstallments
        ? recurring.installments_total - recurring.installments_generated
        : null,
      pending_count: pendingCount,
    };
  }

  /**
   * Verifica que la cuenta exista y sea del usuario autenticado.
   *
   * @param userId id del usuario autenticado
   * @param accountId id de la cuenta a validar
   * @throws NotFoundException si no existe o es de otro usuario (mismo mensaje en ambos casos,
   *         para no filtrar la existencia de recursos ajenos)
   */
  private async assertAccountBelongsToUser(userId: string, accountId: string) {
    const account = await this.prisma.user_accounts.findFirst({
      where: { id: accountId, user_id: userId },
    });
    if (!account) throw new NotFoundException('Account not found');
  }

  /**
   * Verifica que la categoría exista.
   *
   * Ojo: `categories` es una tabla global en este esquema (no tiene `user_id`), así que no hay
   * forma real de validar pertenencia — lo único verificable es la existencia. Si en algún
   * momento las categorías pasan a ser por usuario, este es el punto a ajustar.
   *
   * @param categoryId id de la categoría, o null/undefined si la recurrencia no lleva
   * @throws NotFoundException si se pasó un id que no existe
   */
  private async assertCategoryExists(categoryId?: string | null) {
    if (!categoryId) return;
    const category = await this.prisma.categories.findFirst({ where: { id: categoryId } });
    if (!category) throw new NotFoundException('Category not found');
  }

  /**
   * Crea una recurrencia. La primera cuota vence en `start_date`, así que `next_run_date`
   * arranca con ese mismo valor: si la fecha de inicio ya pasó, la cuota aparece como
   * pendiente en la consulta siguiente.
   *
   * @param userId id del usuario autenticado
   * @param dto datos validados de la recurrencia
   * @returns la recurrencia creada, ya mapeada
   */
  async create(userId: string, dto: CreateRecurringTransactionDto) {
    await this.assertAccountBelongsToUser(userId, dto.user_account_id);
    await this.assertCategoryExists(dto.category_id);

    const startDate = parseDateOnly(dto.start_date);
    const now = new Date();

    const recurring = await this.prisma.recurring_transactions.create({
      data: {
        user_id: userId,
        user_account_id: dto.user_account_id,
        category_id: dto.category_id ?? null,
        type: dto.type,
        amount: dto.amount,
        description: dto.description ?? null,
        frequency: dto.frequency,
        start_date: startDate,
        next_run_date: startDate,
        installments_total: dto.installments_total ?? null,
        created_at: now,
        updated_at: now,
      },
      include: this.include,
    });

    return {
      message: 'Transacción recurrente creada exitosamente.',
      recurring_transaction: this.mapRecurring(recurring, calculatePendingOccurrences(recurring).length),
    };
  }

  /**
   * Lista las recurrencias del usuario con el progreso de cuotas y cuántas tiene vencidas.
   *
   * @param userId id del usuario autenticado
   * @returns las recurrencias mapeadas, activas primero
   */
  async findAll(userId: string) {
    const recurrings = await this.prisma.recurring_transactions.findMany({
      where: { user_id: userId },
      include: this.include,
      // Las activas primero, y dentro de ellas la que vence antes: es el orden en el que al
      // usuario le sirve verlas.
      orderBy: [{ active: 'desc' }, { next_run_date: 'asc' }],
    });

    const today = startOfToday();

    return {
      recurring_transactions: recurrings.map(r =>
        this.mapRecurring(r, calculatePendingOccurrences(r, today).length),
      ),
    };
  }

  /**
   * Edita una recurrencia.
   *
   * `next_run_date` no se recibe del cliente: se recalcula siempre a partir de la fecha de
   * inicio y la frecuencia vigentes más las cuotas ya confirmadas. Si el usuario corrige la
   * fecha de inicio o cambia la frecuencia, las cuotas futuras se reacomodan solas sin que las
   * ya confirmadas se toquen.
   *
   * @param id id de la recurrencia
   * @param userId id del usuario autenticado
   * @param dto campos a modificar
   * @returns la recurrencia actualizada
   */
  async update(id: string, userId: string, dto: UpdateRecurringTransactionDto) {
    const existing = await this.prisma.recurring_transactions.findFirst({ where: { id, user_id: userId } });
    if (!existing) throw new NotFoundException('Recurring transaction not found');

    if (dto.user_account_id && dto.user_account_id !== existing.user_account_id) {
      await this.assertAccountBelongsToUser(userId, dto.user_account_id);
    }
    if (dto.category_id) await this.assertCategoryExists(dto.category_id);

    const startDate = dto.start_date ? parseDateOnly(dto.start_date) : existing.start_date;
    const frequency = dto.frequency ?? existing.frequency;
    // `undefined` = el campo no vino en el body; `null` = el usuario la pasó a indefinida.
    const installmentsTotal =
      dto.installments_total !== undefined ? (dto.installments_total ?? null) : existing.installments_total;

    // Si el nuevo total ya está cubierto por las cuotas confirmadas, la recurrencia terminó.
    // El camino inverso (extender el total de una terminada) no la reactiva sola: eso se hace
    // explícito con el toggle, para que reanudar una recurrencia siempre sea una decisión.
    const active =
      installmentsTotal !== null && existing.installments_generated >= installmentsTotal ? false : existing.active;

    const recurring = await this.prisma.recurring_transactions.update({
      where: { id },
      data: {
        user_account_id: dto.user_account_id ?? existing.user_account_id,
        category_id: dto.category_id !== undefined ? (dto.category_id ?? null) : existing.category_id,
        type: dto.type ?? existing.type,
        amount: dto.amount ?? existing.amount,
        description: dto.description !== undefined ? (dto.description ?? null) : existing.description,
        frequency,
        start_date: startDate,
        next_run_date: occurrenceDate(startDate, frequency, existing.installments_generated),
        installments_total: installmentsTotal,
        active,
        updated_at: new Date(),
      },
      include: this.include,
    });

    return {
      message: 'Transacción recurrente actualizada exitosamente.',
      recurring_transaction: this.mapRecurring(recurring, calculatePendingOccurrences(recurring).length),
    };
  }

  /**
   * Elimina una recurrencia. Las transacciones ya confirmadas no se tocan: son movimientos
   * reales que ya impactaron el saldo.
   *
   * @param id id de la recurrencia
   * @param userId id del usuario autenticado
   */
  async remove(id: string, userId: string) {
    const existing = await this.prisma.recurring_transactions.findFirst({ where: { id, user_id: userId } });
    if (!existing) throw new NotFoundException('Recurring transaction not found');

    await this.prisma.recurring_transactions.delete({ where: { id } });

    return { message: 'Transacción recurrente eliminada exitosamente.' };
  }

  /**
   * Pausa o reanuda una recurrencia.
   *
   * Existe para no obligar a borrar una suscripción que se pausa unos meses: mientras está
   * pausada no acumula cuotas pendientes, y al reanudarla vuelve a contar desde su
   * `next_run_date` (con lo cual las cuotas del período pausado aparecen como vencidas y el
   * usuario decide una por una si confirmarlas u omitirlas).
   *
   * @param id id de la recurrencia
   * @param userId id del usuario autenticado
   * @returns la recurrencia con el nuevo estado
   */
  async toggle(id: string, userId: string) {
    const existing = await this.prisma.recurring_transactions.findFirst({ where: { id, user_id: userId } });
    if (!existing) throw new NotFoundException('Recurring transaction not found');

    const isFinished =
      existing.installments_total !== null && existing.installments_generated >= existing.installments_total;

    if (!existing.active && isFinished) {
      throw new BadRequestException('La recurrencia ya completó todas sus cuotas y no se puede reanudar.');
    }

    const recurring = await this.prisma.recurring_transactions.update({
      where: { id },
      data: { active: !existing.active, updated_at: new Date() },
      include: this.include,
    });

    return {
      message: recurring.active ? 'Transacción recurrente reanudada.' : 'Transacción recurrente pausada.',
      recurring_transaction: this.mapRecurring(recurring, calculatePendingOccurrences(recurring).length),
    };
  }

  /**
   * Devuelve todas las cuotas vencidas del usuario, incluidas varias de una misma recurrencia
   * si pasó más de un período sin confirmar.
   *
   * Es el mecanismo de recuperación del diseño: las cuotas no existen como filas, se derivan
   * comparando `next_run_date` contra hoy. Por eso, aunque el aviso del cron nunca haya salido
   * (en Render gratuito el servicio se duerme), acá aparecen igual.
   *
   * @param userId id del usuario autenticado
   * @returns las cuotas vencidas ordenadas de la más antigua a la más reciente
   */
  async findPending(userId: string) {
    const today = startOfToday();

    const recurrings = await this.prisma.recurring_transactions.findMany({
      where: { user_id: userId, active: true, next_run_date: { lte: today } },
      include: this.include,
      orderBy: { next_run_date: 'asc' },
    });

    const pending = recurrings.flatMap(recurring => {
      const { categories, user_accounts } = recurring as any;
      const { banks, ...accountRest } = user_accounts ?? {};

      return calculatePendingOccurrences(recurring, today).map(occurrence => ({
        recurring_transaction_id: recurring.id,
        date: occurrence.date_string,
        type: recurring.type,
        amount: Number(recurring.amount),
        description: recurring.description,
        frequency: recurring.frequency,
        installment_number: occurrence.installment_number,
        installments_total: recurring.installments_total,
        installments_progress:
          recurring.installments_total !== null
            ? `Cuota ${occurrence.installment_number} de ${recurring.installments_total}`
            : null,
        category: categories || null,
        user_account: user_accounts ? { ...accountRest, bank: banks } : undefined,
      }));
    });

    // Orden global por fecha: al usuario le interesa la cuota más vieja primero, sin importar
    // de qué recurrencia venga.
    pending.sort((a, b) => a.date.localeCompare(b.date));

    return { pending, total: pending.length };
  }

  /**
   * Confirma la cuota vencida más antigua: registra la transacción real y avanza el estado.
   *
   * La transacción se crea por `TransactionsService.create`, el mismo camino que una carga
   * manual, para que ajuste el saldo de la cuenta, deje el registro en `transaction_logs` y
   * dispare las alertas de presupuesto. Lleva la fecha de la cuota (no la de hoy) para que
   * caiga en el período de presupuesto correcto.
   *
   * @param id id de la recurrencia
   * @param userId id del usuario autenticado
   * @param reqMetadata ip y user agent, para la auditoría de la transacción
   * @returns la transacción creada, los avisos de presupuesto y la recurrencia actualizada
   */
  async confirm(id: string, userId: string, reqMetadata: any) {
    const { previous, occurrence } = await this.claimOldestPending(id, userId);

    let created: any;
    try {
      created = await this.transactionsService.create(
        userId,
        {
          user_account_id: previous.user_account_id,
          category_id: previous.category_id,
          amount: Number(previous.amount),
          description: previous.description,
          date: occurrence.date_string,
          type: previous.type,
          // Una recurrencia no tiene grupo asociado, así que nunca genera una deuda compartida.
          is_shared: false,
        },
        reqMetadata,
      );
    } catch (error) {
      // La cuota se reserva antes de crear la transacción; si la creación falla hay que
      // devolverla a pendiente o quedaría consumida sin movimiento que la respalde.
      await this.revertClaim(previous);
      throw error;
    }

    const recurring = await this.prisma.recurring_transactions.findUnique({
      where: { id },
      include: this.include,
    });

    return {
      message: `Cuota ${occurrence.installment_number} confirmada exitosamente.`,
      transaction: created.transaction,
      warnings: created.warnings,
      recurring_transaction: this.mapRecurring(recurring, calculatePendingOccurrences(recurring!).length),
    };
  }

  /**
   * Omite la cuota vencida más antigua sin crear ninguna transacción (ej. un mes en el que no
   * llegó el cobro), avanzando igual el estado para que no vuelva a aparecer como pendiente.
   *
   * En un crédito de consumo la cuota omitida igual cuenta contra el total: si se saltea la 8
   * de 36, la próxima pendiente es la 9. Es a propósito — el skip significa "esta cuota ya está
   * resuelta fuera de la app", no "esta cuota no existió".
   *
   * @param id id de la recurrencia
   * @param userId id del usuario autenticado
   * @returns la recurrencia con el estado ya avanzado
   */
  async skip(id: string, userId: string) {
    const { occurrence } = await this.claimOldestPending(id, userId);

    const recurring = await this.prisma.recurring_transactions.findUnique({
      where: { id },
      include: this.include,
    });

    return {
      message: `Cuota ${occurrence.installment_number} omitida exitosamente.`,
      recurring_transaction: this.mapRecurring(recurring, calculatePendingOccurrences(recurring!).length),
    };
  }

  /**
   * Reserva la cuota vencida más antigua avanzando el estado de la recurrencia.
   *
   * El avance se hace con un `updateMany` condicionado a `installments_generated`, que actúa
   * como control de concurrencia optimista: si dos requests intentan confirmar la misma cuota
   * a la vez, la segunda actualiza 0 filas y se corta con 409 en vez de duplicar el movimiento.
   * Un `findFirst` + `update` no daría esa garantía.
   *
   * @param id id de la recurrencia
   * @param userId id del usuario autenticado
   * @returns el estado previo (necesario para poder revertir) y la cuota reservada
   * @throws NotFoundException si la recurrencia no existe o es de otro usuario
   * @throws BadRequestException si está pausada o no tiene cuotas vencidas
   * @throws ConflictException si otra request se quedó con la misma cuota
   */
  private async claimOldestPending(
    id: string,
    userId: string,
  ): Promise<{ previous: any; occurrence: PendingOccurrence }> {
    const previous = await this.prisma.recurring_transactions.findFirst({ where: { id, user_id: userId } });
    if (!previous) throw new NotFoundException('Recurring transaction not found');

    if (!previous.active) {
      throw new BadRequestException('La recurrencia está pausada o ya terminó: no tiene cuotas por confirmar.');
    }

    const [occurrence] = calculatePendingOccurrences(previous);
    if (!occurrence) {
      throw new BadRequestException('La recurrencia no tiene cuotas vencidas por confirmar.');
    }

    const installmentsGenerated = previous.installments_generated + 1;
    const isFinished =
      previous.installments_total !== null && installmentsGenerated >= previous.installments_total;

    const claimed = await this.prisma.recurring_transactions.updateMany({
      where: { id, user_id: userId, installments_generated: previous.installments_generated },
      data: {
        installments_generated: installmentsGenerated,
        next_run_date: occurrenceDate(previous.start_date, previous.frequency, installmentsGenerated),
        // Al resolver la última cuota el crédito queda saldado y la recurrencia se cierra sola.
        active: isFinished ? false : previous.active,
        updated_at: new Date(),
      },
    });

    if (claimed.count === 0) {
      throw new ConflictException('Esa cuota ya fue confirmada u omitida por otra operación.');
    }

    return { previous, occurrence };
  }

  /**
   * Deshace la reserva de una cuota, devolviendo la recurrencia a su estado anterior.
   * El error se loguea y no se propaga, para no tapar el error original que motivó el revert.
   *
   * @param previous estado de la recurrencia antes de reservar la cuota
   */
  private async revertClaim(previous: any) {
    try {
      await this.prisma.recurring_transactions.update({
        where: { id: previous.id },
        data: {
          installments_generated: previous.installments_generated,
          next_run_date: previous.next_run_date,
          active: previous.active,
          updated_at: new Date(),
        },
      });
    } catch (error) {
      this.logger.error(
        `No se pudo revertir la reserva de la cuota de la recurrencia ${previous.id}; quedó en ` +
          `installments_generated=${previous.installments_generated + 1} sin transacción asociada: ` +
          `${(error as Error).message}`,
        (error as Error).stack,
      );
    }
  }

  /**
   * Job diario que avisa a cada usuario que tiene cuotas venciendo hoy.
   *
   * Solo mira `next_run_date = hoy`, así que cada cuota se avisa una sola vez de forma natural
   * y no hace falta una tabla de deduplicación. Las que se pierdan porque el servicio estaba
   * dormido (Render gratuito) no se avisan más tarde, pero tampoco se pierden: aparecen igual
   * en `GET /recurring-transactions/pending`. Ese es el disparador de respaldo del diseño.
   *
   * Es defensivo a propósito: un error con un usuario no puede cortar el procesamiento del resto.
   */
  @Cron(CronExpression.EVERY_DAY_AT_9AM, { name: 'recurring-transactions-due' })
  async notifyDueToday() {
    const today = startOfToday();

    let recurrings: any[];
    try {
      recurrings = await this.prisma.recurring_transactions.findMany({
        where: { active: true, next_run_date: today },
        include: { categories: true },
      });
    } catch (error) {
      this.logger.error(
        `No se pudieron consultar las recurrencias que vencen el ${formatDateOnly(today)}: ${(error as Error).message}`,
        (error as Error).stack,
      );
      return;
    }

    if (recurrings.length === 0) {
      this.logger.log(`No hay cuotas de transacciones recurrentes que venzan el ${formatDateOnly(today)}.`);
      return;
    }

    // Se agrupa por usuario para mandar un solo aviso con todas sus cuotas del día, en vez de
    // una notificación por recurrencia.
    const byUser = new Map<string, RecurringDueItem[]>();
    for (const recurring of recurrings) {
      const items = byUser.get(recurring.user_id) ?? [];
      items.push({
        description: recurring.description || recurring.categories?.name || 'Pago recurrente',
        amount: Number(recurring.amount),
        type: recurring.type,
        date: formatDateOnly(recurring.next_run_date),
        installment_number: recurring.installments_generated + 1,
        installments_total: recurring.installments_total,
      });
      byUser.set(recurring.user_id, items);
    }

    let notified = 0;
    let failed = 0;

    for (const [userId, items] of byUser) {
      try {
        await this.notifyUserDueToday(userId, items);
        notified++;
      } catch (error) {
        failed++;
        this.logger.error(
          `No se pudo avisar al usuario ${userId} de sus ${items.length} cuota(s) del día: ${(error as Error).message}`,
          (error as Error).stack,
        );
      }
    }

    this.logger.log(
      `Aviso de cuotas del ${formatDateOnly(today)}: ${recurrings.length} cuota(s) en ${byUser.size} usuario(s); ` +
        `${notified} avisado(s), ${failed} con error.`,
    );
  }

  /**
   * Envía a un usuario el aviso de sus cuotas del día por un único canal: push si tiene alguna
   * suscripción activa, y correo solo como respaldo cuando no tiene ninguna. Es el mismo
   * criterio que usan las alertas de presupuesto.
   *
   * @param userId id del usuario destinatario
   * @param items cuotas que le vencen hoy
   */
  private async notifyUserDueToday(userId: string, items: RecurringDueItem[]) {
    const total = items.reduce((sum, item) => sum + item.amount, 0);
    const body =
      items.length === 1
        ? `Tenés una cuota de $${items[0].amount} por confirmar: ${items[0].description}.`
        : `Tenés ${items.length} cuotas por confirmar hoy, por un total de $${Number(total.toFixed(2))}.`;

    const subscriptions = await this.prisma.push_subscriptions.count({ where: { user_id: userId } });

    if (subscriptions > 0) {
      await this.pushService.sendToUser(userId, {
        title: 'Pfinance — Cuota por confirmar',
        body,
        url: RECURRING_FRONTEND_PATH,
      });
      return;
    }

    const user = await this.prisma.users.findUnique({
      where: { id: userId },
      select: { email: true, name: true },
    });
    if (!user) return;

    await this.mailService.sendMail({
      to: user.email,
      subject:
        items.length === 1
          ? 'Pfinance — Tenés una cuota por confirmar'
          : `Pfinance — Tenés ${items.length} cuotas por confirmar`,
      html: baseEmailTemplate(recurringDueContent(user.name, items), body),
    });
  }
}
