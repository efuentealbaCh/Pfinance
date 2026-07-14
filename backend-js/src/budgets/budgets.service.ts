import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { randomUUID } from 'crypto';

@Injectable()
export class BudgetsService {
  constructor(private prisma: PrismaService) {}

  async findAll(userId: bigint) {
    const budgets = await this.prisma.budgets.findMany({
      where: { user_id: userId },
      include: { categories: true },
      orderBy: { created_at: 'desc' },
    });
    
    const enriched = await Promise.all(budgets.map(b => this.enrichBudgetWithSpent(b, userId)));
    return { budgets: enriched };
  }

  async findOne(id: string, userId: bigint) {
    const budget = await this.prisma.budgets.findFirst({
      where: { id, user_id: userId },
      include: { categories: true },
    });
    if (!budget) throw new NotFoundException('Budget not found');
    return { budget: await this.enrichBudgetWithSpent(budget, userId) };
  }

  async create(userId: bigint, data: any) {
    const budget = await this.prisma.budgets.create({
      data: {
        id: randomUUID(),
        user_id: userId,
        category_id: data.category_id,
        amount: data.amount,
        period: data.period,
        created_at: new Date(),
        updated_at: new Date(),
      },
      include: { categories: true },
    });
    return { message: 'Presupuesto creado exitosamente.', budget: await this.enrichBudgetWithSpent(budget, userId) };
  }

  async update(id: string, userId: bigint, data: any) {
    const existing = await this.prisma.budgets.findFirst({ where: { id, user_id: userId } });
    if (!existing) throw new NotFoundException('Budget not found');

    const budget = await this.prisma.budgets.update({
      where: { id },
      data: {
        category_id: data.category_id,
        amount: data.amount,
        period: data.period,
        updated_at: new Date(),
      },
      include: { categories: true },
    });
    return { message: 'Presupuesto actualizado exitosamente.', budget: await this.enrichBudgetWithSpent(budget, userId) };
  }

  async remove(id: string, userId: bigint) {
    const existing = await this.prisma.budgets.findFirst({ where: { id, user_id: userId } });
    if (!existing) throw new NotFoundException('Budget not found');

    await this.prisma.budgets.delete({ where: { id } });
    return { message: 'Presupuesto eliminado exitosamente.' };
  }

  private async enrichBudgetWithSpent(budget: any, userId: bigint) {
    const [dateFrom, dateTo] = this.getPeriodRange(budget.period);

    const spentAgg = await this.prisma.transactions.aggregate({
      _sum: { amount: true },
      where: {
        user_id: userId,
        category_id: budget.category_id,
        type: 'expense',
        date: { gte: dateFrom, lte: dateTo }
      }
    });

    const spent = Number(spentAgg._sum.amount || 0);
    const amount = Number(budget.amount);
    const percentage = amount > 0 ? Number(((spent / amount) * 100).toFixed(1)) : 0;

    const { categories, ...rest } = budget;

    return {
      ...rest,
      category: categories,
      amount,
      spent: Number(spent.toFixed(2)),
      percentage,
      period_from: dateFrom.toISOString().split('T')[0],
      period_to: dateTo.toISOString().split('T')[0],
    };
  }

  private getPeriodRange(period: string): [Date, Date] {
    const now = new Date();
    
    if (period.match(/^\d{4}-\d{2}$/)) {
       const [year, month] = period.split('-');
       const start = new Date(Number(year), Number(month) - 1, 1);
       const end = new Date(Number(year), Number(month), 0, 23, 59, 59, 999);
       return [start, end];
    }

    switch (period) {
      case 'weekly':
        const day = now.getDay();
        const diff = now.getDate() - day + (day === 0 ? -6 : 1);
        const startOfWeek = new Date(now.setDate(diff));
        startOfWeek.setHours(0,0,0,0);
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(endOfWeek.getDate() + 6);
        endOfWeek.setHours(23,59,59,999);
        return [startOfWeek, endOfWeek];
      case 'yearly':
        return [new Date(now.getFullYear(), 0, 1), new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999)];
      default:
        return [new Date(now.getFullYear(), now.getMonth(), 1), new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999)];
    }
  }
}
