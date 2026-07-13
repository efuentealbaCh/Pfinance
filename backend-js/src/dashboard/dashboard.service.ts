import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async getSummary(userId: bigint, filters: any) {
    const whereTransactions: any = { user_id: userId };
    if (filters.user_account_id) whereTransactions.user_account_id = filters.user_account_id;
    if (filters.date_from || filters.date_to) {
      whereTransactions.date = {};
      if (filters.date_from) whereTransactions.date.gte = new Date(filters.date_from);
      if (filters.date_to) whereTransactions.date.lte = new Date(filters.date_to);
    }

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
        name: cat?.name || 'Unknown',
        total: Number(g._sum.amount),
        color: cat?.color || '#cccccc',
      };
    });

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
      expensesByCategory,
      chartData,
    };
  }
}
