import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

/** Gasto acumulado de una categoría dentro de un período. */
export interface PeriodCategoryExpense {
  /** Id de la categoría, o `null` si las transacciones no tenían categoría asignada. */
  category_id: string | null;
  /** Nombre de la categoría, o `null` si no existe/no está asignada (cada consumidor elige su fallback). */
  name: string | null;
  /** Total gastado en la categoría dentro del período. */
  total: number;
  /** Color de la categoría, o `null` si no tiene. */
  color: string | null;
}

/** Totales agregados de un período, sin datos de presentación. */
export interface PeriodTotals {
  totalIncome: number;
  totalExpense: number;
  balance: number;
  /** Gastos por categoría, ordenados de mayor a menor. */
  expensesByCategory: PeriodCategoryExpense[];
}

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

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
   * Totales de ingresos, gastos, balance y desglose de gastos por categoría de un período.
   *
   * Está separado de `getSummary` para que el resumen mensual por correo (`ReportsService`)
   * use exactamente la misma agregación que ve el usuario en el dashboard, en vez de una
   * segunda implementación que pueda dar otro número para el mismo mes.
   *
   * @param userId dueño de las transacciones
   * @param filters filtros opcionales: `user_account_id`, `date_from`, `date_to` (`YYYY-MM-DD`)
   * @returns totales del período y gastos por categoría de mayor a menor
   */
  async getPeriodTotals(userId: string, filters: any): Promise<PeriodTotals> {
    const whereTransactions = this.buildTransactionsWhere(userId, filters);

    const incomeAgg = await this.prisma.transactions.aggregate({
      _sum: { amount: true },
      where: { ...whereTransactions, type: 'income' },
    });
    const expenseAgg = await this.prisma.transactions.aggregate({
      _sum: { amount: true },
      where: { ...whereTransactions, type: 'expense' },
    });

    const totalIncome = Number(incomeAgg._sum.amount || 0);
    const totalExpense = Number(expenseAgg._sum.amount || 0);
    const balance = totalIncome - totalExpense;

    const expensesGroup = await this.prisma.transactions.groupBy({
      by: ['category_id'],
      _sum: { amount: true },
      where: { ...whereTransactions, type: 'expense' },
      orderBy: { _sum: { amount: 'desc' } },
    });

    const categoryIds = expensesGroup.map(e => e.category_id).filter(id => id);
    const categories = await this.prisma.categories.findMany({ where: { id: { in: categoryIds as string[] } } });

    const expensesByCategory = expensesGroup.map(g => {
      const cat = categories.find(c => c.id === g.category_id);
      return {
        category_id: g.category_id,
        name: cat?.name ?? null,
        total: Number(g._sum.amount),
        color: cat?.color ?? null,
      };
    });

    return { totalIncome, totalExpense, balance, expensesByCategory };
  }

  async getSummary(userId: string, filters: any) {
    const whereTransactions = this.buildTransactionsWhere(userId, filters);

    const { totalIncome, totalExpense, balance, expensesByCategory } = await this.getPeriodTotals(userId, filters);

    const allTransactions = await this.prisma.transactions.findMany({
      where: whereTransactions,
      select: { date: true, type: true, amount: true },
      orderBy: { date: 'asc' },
    });

    const chartMap = new Map<string, { income: number, expense: number }>();
    for (const t of allTransactions) {
      const d = new Date(t.date).toISOString().split('T')[0];
      if (!chartMap.has(d)) chartMap.set(d, { income: 0, expense: 0 });
      const current = chartMap.get(d)!;
      if (t.type === 'income') current.income += Number(t.amount);
      else if (t.type === 'expense') current.expense += Number(t.amount);
    }

    const chartData = Array.from(chartMap.entries()).map(([date, data]) => ({
      date,
      income: data.income,
      expense: data.expense,
    }));

    return {
      summary: { totalIncome, totalExpense, balance },
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
