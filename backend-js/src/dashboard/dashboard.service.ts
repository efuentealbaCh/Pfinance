import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CurrencyService } from '../currency/currency.service';
import { Currency, normalizeCurrency, roundToCurrency } from '../common/currency.util';

/** Gasto acumulado de una categoría dentro de un período. */
export interface PeriodCategoryExpense {
  /** Id de la categoría, o `null` si las transacciones no tenían categoría asignada. */
  category_id: string | null;
  /** Nombre de la categoría, o `null` si no existe/no está asignada (cada consumidor elige su fallback). */
  name: string | null;
  /** Total gastado en la categoría dentro del período, en la moneda base del usuario. */
  total: number;
  /** Color de la categoría, o `null` si no tiene. */
  color: string | null;
}

/** Totales agregados de un período, sin datos de presentación. */
export interface PeriodTotals {
  totalIncome: number;
  totalExpense: number;
  balance: number;
  /** Moneda en la que están expresados los totales (la moneda base del usuario). */
  currency: Currency;
  /** Gastos por categoría, ordenados de mayor a menor. */
  expensesByCategory: PeriodCategoryExpense[];
}

/** Una transacción ya convertida a la moneda base, lista para agregar. */
interface ConvertedTransaction {
  date: Date;
  type: string;
  category_id: string | null;
  /** Monto en la moneda base del usuario. */
  amount: number;
}

@Injectable()
export class DashboardService {
  constructor(
    private prisma: PrismaService,
    private currencyService: CurrencyService,
  ) {}

  /**
   * Arma el `where` de transacciones común a todas las lecturas del dashboard.
   *
   * @param userId dueño de las transacciones
   * @param filters filtros opcionales: `user_account_id`, `date_from`, `date_to` (`YYYY-MM-DD`)
   * @returns el objeto `where` para Prisma
   */
  private buildTransactionsWhere(userId: string, filters: any) {
    const whereTransactions: any = { user_id: userId };
    if (filters.user_account_id) whereTransactions.user_account_id = filters.user_account_id;
    if (filters.date_from || filters.date_to) {
      whereTransactions.date = {};
      if (filters.date_from) whereTransactions.date.gte = new Date(filters.date_from);
      if (filters.date_to) whereTransactions.date.lte = new Date(filters.date_to);
    }
    return whereTransactions;
  }

  /**
   * Trae las transacciones del período con su monto ya convertido a la moneda base del usuario.
   *
   * La agregación pasó de hacerse en SQL (`aggregate`/`groupBy`) a hacerse en memoria porque con
   * cuentas en distinta moneda sumar la columna `amount` directamente daría un número sin
   * sentido: mezclaría pesos con dólares. Cada movimiento se convierte con la cotización de SU
   * fecha, así que el total de un mes pasado no cambia cuando se mueve el dólar.
   *
   * Para el caso habitual (todas las cuentas en la misma moneda que la base) la conversión es un
   * cortocircuito y no toca la tabla de cotizaciones.
   *
   * @param userId dueño de las transacciones
   * @param filters filtros del período
   * @param baseCurrency moneda a la que se convierte todo
   * @returns las transacciones del período, con `amount` en la moneda base
   */
  private async loadConvertedTransactions(
    userId: string,
    filters: any,
    baseCurrency: Currency,
  ): Promise<ConvertedTransaction[]> {
    const rows = await this.prisma.transactions.findMany({
      where: this.buildTransactionsWhere(userId, filters),
      select: {
        date: true,
        type: true,
        amount: true,
        category_id: true,
        user_accounts: { select: { currency: true } },
      },
      orderBy: { date: 'asc' },
    });

    const converted: ConvertedTransaction[] = [];
    for (const row of rows) {
      const from = normalizeCurrency(row.user_accounts?.currency);
      converted.push({
        date: row.date,
        type: row.type,
        category_id: row.category_id,
        amount: await this.currencyService.convert(Number(row.amount), from, baseCurrency, row.date),
      });
    }

    return converted;
  }

  /**
   * Agrega en memoria una lista de transacciones ya convertidas.
   *
   * @param transactions transacciones en la moneda base
   * @returns totales del período y gastos por categoría (sin nombres ni colores todavía)
   */
  private aggregate(transactions: ConvertedTransaction[]) {
    let totalIncome = 0;
    let totalExpense = 0;
    const byCategory = new Map<string | null, number>();

    for (const t of transactions) {
      if (t.type === 'income') {
        totalIncome += t.amount;
      } else if (t.type === 'expense') {
        totalExpense += t.amount;
        byCategory.set(t.category_id, (byCategory.get(t.category_id) ?? 0) + t.amount);
      }
    }

    return { totalIncome, totalExpense, byCategory };
  }

  /**
   * Totales de ingresos, gastos, balance y desglose de gastos por categoría de un período,
   * expresados en la moneda base del usuario.
   *
   * Está separado de `getSummary` para que el resumen mensual por correo (`ReportsService`)
   * use exactamente la misma agregación que ve el usuario en el dashboard, en vez de una
   * segunda implementación que pueda dar otro número para el mismo mes.
   *
   * @param userId dueño de las transacciones
   * @param filters filtros opcionales: `user_account_id`, `date_from`, `date_to` (`YYYY-MM-DD`)
   * @param baseCurrency moneda base ya resuelta; si no viene, se lee la del usuario
   * @returns totales del período y gastos por categoría de mayor a menor
   */
  async getPeriodTotals(userId: string, filters: any, baseCurrency?: Currency): Promise<PeriodTotals> {
    const currency = baseCurrency ?? (await this.currencyService.getUserBaseCurrency(userId));
    const transactions = await this.loadConvertedTransactions(userId, filters, currency);

    return this.buildPeriodTotals(transactions, currency);
  }

  /**
   * Arma el resultado de `getPeriodTotals` a partir de transacciones ya cargadas.
   *
   * Existe aparte para que `getSummary` no tenga que leer y convertir las transacciones dos
   * veces: una para los totales y otra para el gráfico.
   *
   * @param transactions transacciones del período, ya convertidas a `currency`
   * @param currency moneda base de los totales
   * @returns totales del período y gastos por categoría de mayor a menor
   */
  private async buildPeriodTotals(
    transactions: ConvertedTransaction[],
    currency: Currency,
  ): Promise<PeriodTotals> {
    const { totalIncome, totalExpense, byCategory } = this.aggregate(transactions);

    const categoryIds = [...byCategory.keys()].filter((id): id is string => !!id);
    const categories = categoryIds.length
      ? await this.prisma.categories.findMany({ where: { id: { in: categoryIds } } })
      : [];

    const expensesByCategory = [...byCategory.entries()]
      .map(([categoryId, total]) => {
        const cat = categories.find(c => c.id === categoryId);
        return {
          category_id: categoryId,
          name: cat?.name ?? null,
          total: roundToCurrency(total, currency),
          color: cat?.color ?? null,
        };
      })
      .sort((a, b) => b.total - a.total);

    const roundedIncome = roundToCurrency(totalIncome, currency);
    const roundedExpense = roundToCurrency(totalExpense, currency);

    return {
      totalIncome: roundedIncome,
      totalExpense: roundedExpense,
      balance: roundToCurrency(roundedIncome - roundedExpense, currency),
      currency,
      expensesByCategory,
    };
  }

  async getSummary(userId: string, filters: any) {
    const currency = await this.currencyService.getUserBaseCurrency(userId);
    const transactions = await this.loadConvertedTransactions(userId, filters, currency);

    const { totalIncome, totalExpense, balance, expensesByCategory } = await this.buildPeriodTotals(
      transactions,
      currency,
    );

    const chartMap = new Map<string, { income: number; expense: number }>();
    for (const t of transactions) {
      const d = new Date(t.date).toISOString().split('T')[0];
      if (!chartMap.has(d)) chartMap.set(d, { income: 0, expense: 0 });
      const current = chartMap.get(d)!;
      if (t.type === 'income') current.income += t.amount;
      else if (t.type === 'expense') current.expense += t.amount;
    }

    const chartData = Array.from(chartMap.entries()).map(([date, data]) => ({
      date,
      income: roundToCurrency(data.income, currency),
      expense: roundToCurrency(data.expense, currency),
    }));

    return {
      // `currency` se expone para que el frontend sepa en qué moneda están estos totales, que no
      // es necesariamente la de las cuentas que los originaron.
      summary: { totalIncome, totalExpense, balance, currency },
      // Se mantienen los fallbacks originales ('Unknown' / '#cccccc') para no cambiarle la
      // respuesta al frontend que ya consume este endpoint.
      expensesByCategory: expensesByCategory.map(c => ({
        name: c.name ?? 'Unknown',
        total: c.total,
        color: c.color ?? '#cccccc',
      })),
      chartData,
    };
  }
}
