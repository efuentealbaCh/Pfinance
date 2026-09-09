import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { randomUUID } from 'crypto';
import { calculateBudgetPercentage, resolveBudgetPeriod } from '../common/budget-period.util';
import { CurrencyService } from '../currency/currency.service';
import { Currency, normalizeCurrency, roundToCurrency } from '../common/currency.util';

@Injectable()
export class BudgetsService {
  constructor(
    private prisma: PrismaService,
    private currencyService: CurrencyService,
  ) {}

  async findAll(userId: string) {
    const budgets = await this.prisma.budgets.findMany({
      where: { user_id: userId },
      include: { categories: true },
      orderBy: { created_at: 'desc' },
    });

    const baseCurrency = await this.currencyService.getUserBaseCurrency(userId);

    const enriched = await Promise.all(budgets.map(b => this.enrichBudgetWithSpent(b, userId, baseCurrency)));
    return { budgets: enriched };
  }

  async findOne(id: string, userId: string) {
    const budget = await this.prisma.budgets.findFirst({
      where: { id, user_id: userId },
      include: { categories: true },
    });
    if (!budget) throw new NotFoundException('Budget not found');
    return { budget: await this.enrichBudgetWithSpent(budget, userId, await this.currencyService.getUserBaseCurrency(userId)) };
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
    return {
      message: 'Presupuesto creado exitosamente.',
      budget: await this.enrichBudgetWithSpent(budget, userId, await this.currencyService.getUserBaseCurrency(userId)),
    };
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
    return {
      message: 'Presupuesto actualizado exitosamente.',
      budget: await this.enrichBudgetWithSpent(budget, userId, await this.currencyService.getUserBaseCurrency(userId)),
    };
  }

  async remove(id: string, userId: string) {
    const existing = await this.prisma.budgets.findFirst({ where: { id, user_id: userId } });
    if (!existing) throw new NotFoundException('Budget not found');

    await this.prisma.budgets.delete({ where: { id } });
    return { message: 'Presupuesto eliminado exitosamente.' };
  }

  /**
   * Agrega a un presupuesto cuánto se lleva gastado en su período.
   *
   * El gasto se acumula en memoria convirtiendo cada movimiento, y no con un `SUM` de SQL, por
   * el mismo motivo que en el dashboard: una suma en la base mezcla montos de cuentas en
   * distinta moneda como si fueran la misma unidad, y 85.000 pesos más 100 dólares darían
   * 85.100 de nada. Cada movimiento se convierte con la cotización de SU fecha, para que
   * recalcular un período viejo no cambie de resultado según la cotización de hoy.
   *
   * @param budget presupuesto con su categoría incluida
   * @param userId dueño del presupuesto
   * @param baseCurrency moneda en la que se expresan `amount` y `spent`
   */
  private async enrichBudgetWithSpent(budget: any, userId: string, baseCurrency: Currency) {
    const { from: dateFrom, to: dateTo } = resolveBudgetPeriod(budget.period);

    const rows = await this.prisma.transactions.findMany({
      where: {
        user_id: userId,
        category_id: budget.category_id,
        type: 'expense',
        date: { gte: dateFrom, lte: dateTo },
      },
      select: {
        date: true,
        amount: true,
        user_accounts: { select: { currency: true } },
      },
    });

    let spent = 0;
    for (const row of rows) {
      const from = normalizeCurrency(row.user_accounts?.currency);
      spent += await this.currencyService.convert(Number(row.amount), from, baseCurrency, row.date);
    }
    spent = roundToCurrency(spent, baseCurrency);

    const amount = Number(budget.amount);
    const percentage = calculateBudgetPercentage(spent, amount);

    const { categories, ...rest } = budget;

    return {
      ...rest,
      category: categories,
      amount,
      spent,
      percentage,
      currency: baseCurrency,
      period_from: dateFrom.toISOString().split('T')[0],
      period_to: dateTo.toISOString().split('T')[0],
    };
  }
}
