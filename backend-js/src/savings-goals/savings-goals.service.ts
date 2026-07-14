import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { randomUUID } from 'crypto';

@Injectable()
export class SavingsGoalsService {
  constructor(private prisma: PrismaService) {}

  async findAll(userId: bigint) {
    const goals = await this.prisma.savings_goals.findMany({
      where: { user_id: userId },
      orderBy: { created_at: 'desc' },
    });
    return { goals: goals.map(g => this.formatGoal(g)) };
  }

  async findOne(id: string, userId: bigint) {
    const goal = await this.prisma.savings_goals.findFirst({
      where: { id, user_id: userId },
    });
    if (!goal) throw new NotFoundException('Savings goal not found');
    return { goal: this.formatGoal(goal) };
  }

  async create(userId: bigint, data: any) {
    const goal = await this.prisma.savings_goals.create({
      data: {
        id: randomUUID(),
        user_id: userId,
        name: data.name,
        target_amount: data.target_amount,
        current_amount: data.current_amount || 0,
        deadline: data.deadline ? new Date(data.deadline) : null,
        created_at: new Date(),
        updated_at: new Date(),
      },
    });
    return { message: 'Meta de ahorro creada exitosamente.', goal: this.formatGoal(goal) };
  }

  async update(id: string, userId: bigint, data: any) {
    const existing = await this.prisma.savings_goals.findFirst({ where: { id, user_id: userId } });
    if (!existing) throw new NotFoundException('Savings goal not found');

    const goal = await this.prisma.savings_goals.update({
      where: { id },
      data: {
        name: data.name,
        target_amount: data.target_amount,
        deadline: data.deadline ? new Date(data.deadline) : null,
        updated_at: new Date(),
      },
    });
    return { message: 'Meta de ahorro actualizada exitosamente.', goal: this.formatGoal(goal) };
  }

  async remove(id: string, userId: bigint) {
    const existing = await this.prisma.savings_goals.findFirst({ where: { id, user_id: userId } });
    if (!existing) throw new NotFoundException('Savings goal not found');

    await this.prisma.savings_goals.delete({ where: { id } });
    return { message: 'Meta de ahorro eliminada exitosamente.' };
  }

  async deposit(id: string, userId: bigint, amount: number) {
    const goal = await this.prisma.savings_goals.findFirst({ where: { id, user_id: userId } });
    if (!goal) throw new NotFoundException('Savings goal not found');

    const newAmount = Number(goal.current_amount) + Number(amount);
    
    const updated = await this.prisma.savings_goals.update({
      where: { id },
      data: { current_amount: newAmount, updated_at: new Date() },
    });

    const isCompleted = newAmount >= Number(updated.target_amount);
    const message = isCompleted
      ? '🎉 ¡Felicidades! Has alcanzado tu meta de ahorro.'
      : 'Abono registrado exitosamente.';

    return { message, goal: this.formatGoal(updated) };
  }

  async withdraw(id: string, userId: bigint, amount: number) {
    const goal = await this.prisma.savings_goals.findFirst({ where: { id, user_id: userId } });
    if (!goal) throw new NotFoundException('Savings goal not found');

    const withdrawAmount = Number(amount);
    const currentAmount = Number(goal.current_amount);

    if (withdrawAmount > currentAmount) {
      throw new UnprocessableEntityException(`No puedes retirar más de lo que tienes ahorrado ($${currentAmount.toFixed(2)}).`);
    }

    const updated = await this.prisma.savings_goals.update({
      where: { id },
      data: { current_amount: currentAmount - withdrawAmount, updated_at: new Date() },
    });

    return { message: 'Retiro registrado exitosamente.', goal: this.formatGoal(updated) };
  }

  private formatGoal(goal: any) {
    const target = Number(goal.target_amount);
    const current = Number(goal.current_amount);
    const percentage = target > 0 ? Number(((current / target) * 100).toFixed(1)) : 0;
    const remaining = Math.max(0, target - current);
    const is_completed = current >= target;

    return {
      ...goal,
      target_amount: target,
      current_amount: current,
      percentage,
      remaining,
      is_completed,
    };
  }
}
