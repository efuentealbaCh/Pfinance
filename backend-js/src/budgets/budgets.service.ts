import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { randomUUID } from 'crypto';
import { calculateBudgetPercentage, resolveBudgetPeriod } from '../common/budget-period.util';

@Injectable()
export class BudgetsService {
  constructor(private prisma: PrismaService) {}

  async findAll(userId: string) {
    const budgets = await this.prisma.budgets.findMany({
      where: { user_id: userId },
      include: { categories: true },
      orderBy: { created_at: 'desc' },
    });
    
    const enriched = await Promise.all(budgets.map(b => this.enrichBudgetWithSpent(b, userId)));
    return { budgets: enriched };
  }

  async findOne(id: string, userId: string) {
    const budget = await this.prisma.budgets.findFirst({
      where: { id, user_id: userId },
      include: { categories: true },
    });
    if (!budget) throw new NotFoundException('Budget not found');
    return { budget: await this.enrichBudgetWithSpent(budget, userId) };
  }

  async create(userId: string, data: any) {
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

  async update(id: string, userId: string, data: any) {
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

  async remove(id: string, userId: string) {
    const existing = await this.prisma.budgets.findFirst({ where: { id, user_id: userId } });
    if (!existing) throw new NotFoundException('Budget not found');

    await this.prisma.budgets.delete({ where: { id } });
    return { message: 'Presupuesto eliminado exitosamente.' };
  }

  private async enrichBudgetWithSpent(budget: any, userId: string) {
    const { from: dateFrom, to: dateTo } = resolveBudgetPeriod(budget.period);

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
    const percentage = calculateBudgetPercentage(spent, amount);

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
}
