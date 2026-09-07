import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { randomUUID } from 'crypto';
import {
  buildSavingsProjection,
  startOfPaceWindow,
  GoalMovementStats,
} from '../common/savings-projection.util';

/** Cantidad de movimientos que devuelve el historial de una meta. */
const MOVEMENTS_PAGE_SIZE = 50;

@Injectable()
export class SavingsGoalsService {
  constructor(private prisma: PrismaService) {}

  async findAll(userId: string) {
    const goals = await this.prisma.savings_goals.findMany({
      where: { user_id: userId },
      orderBy: { created_at: 'desc' },
    });

    // Los agregados de todas las metas se traen de una sola vez: calcular la proyección meta
    // por meta dentro del map dispararía una consulta por fila (N+1) en el listado.
    const stats = await this.loadMovementStats(goals.map(g => g.id));

    return { goals: goals.map(g => this.formatGoal(g, stats.get(g.id) ?? null)) };
  }

  async findOne(id: string, userId: string) {
    const goal = await this.prisma.savings_goals.findFirst({
      where: { id, user_id: userId },
    });
    if (!goal) throw new NotFoundException('Savings goal not found');

    const stats = await this.loadMovementStats([id]);
    return { goal: this.formatGoal(goal, stats.get(id) ?? null) };
  }

  async create(userId: string, data: any) {
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

  async update(id: string, userId: string, data: any) {
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

    const stats = await this.loadMovementStats([id]);
    return { message: 'Meta de ahorro actualizada exitosamente.', goal: this.formatGoal(goal, stats.get(id) ?? null) };
  }

  async remove(id: string, userId: string) {
    const existing = await this.prisma.savings_goals.findFirst({ where: { id, user_id: userId } });
    if (!existing) throw new NotFoundException('Savings goal not found');

    // Los movimientos se van con la meta por el `onDelete: Cascade` de la FK.
    await this.prisma.savings_goals.delete({ where: { id } });
    return { message: 'Meta de ahorro eliminada exitosamente.' };
  }

  async deposit(id: string, userId: string, amount: number) {
    const depositAmount = this.parseAmount(amount);

    const existing = await this.prisma.savings_goals.findFirst({
      where: { id, user_id: userId },
      select: { id: true },
    });
    if (!existing) throw new NotFoundException('Savings goal not found');

    // El saldo y el movimiento se escriben en la misma transacción: si quedaran desincronizados,
    // el historial dejaría de explicar el `current_amount` y el ritmo calculado sería falso.
    const updated = await this.prisma.$transaction(async tx => {
      const goal = await tx.savings_goals.update({
        where: { id },
        // `increment` y no un valor calculado en JS: dos abonos simultáneos con lectura previa
        // se pisarían entre sí y uno de los dos se perdería.
        data: { current_amount: { increment: depositAmount }, updated_at: new Date() },
      });

      await tx.savings_goal_movements.create({
        data: { savings_goal_id: id, type: 'deposit', amount: depositAmount, created_at: new Date() },
      });

      return goal;
    });

    const newAmount = Number(updated.current_amount);
    const isCompleted = newAmount >= Number(updated.target_amount);
    const message = isCompleted
      ? '🎉 ¡Felicidades! Has alcanzado tu meta de ahorro.'
      : 'Abono registrado exitosamente.';

    const stats = await this.loadMovementStats([id]);
    return { message, goal: this.formatGoal(updated, stats.get(id) ?? null) };
  }

  async withdraw(id: string, userId: string, amount: number) {
    const withdrawAmount = this.parseAmount(amount);

    const goal = await this.prisma.savings_goals.findFirst({ where: { id, user_id: userId } });
    if (!goal) throw new NotFoundException('Savings goal not found');

    const currentAmount = Number(goal.current_amount);
    if (withdrawAmount > currentAmount) {
      throw new UnprocessableEntityException(`No puedes retirar más de lo que tienes ahorrado ($${currentAmount.toFixed(2)}).`);
    }

    const updated = await this.prisma.$transaction(async tx => {
      // La validación de arriba existe para dar el mensaje con el saldo real; la garantía de
      // que el saldo no queda negativo es este `updateMany` condicionado, que también corta si
      // otro retiro simultáneo se llevó el dinero entre la lectura y la escritura.
      const result = await tx.savings_goals.updateMany({
        where: { id, current_amount: { gte: withdrawAmount } },
        data: { current_amount: { decrement: withdrawAmount }, updated_at: new Date() },
      });
      if (result.count === 0) {
        throw new UnprocessableEntityException('El saldo de la meta cambió, volvé a intentar el retiro.');
      }

      await tx.savings_goal_movements.create({
        data: { savings_goal_id: id, type: 'withdrawal', amount: withdrawAmount, created_at: new Date() },
      });

      return tx.savings_goals.findUniqueOrThrow({ where: { id } });
    });

    const stats = await this.loadMovementStats([id]);
    return { message: 'Retiro registrado exitosamente.', goal: this.formatGoal(updated, stats.get(id) ?? null) };
  }

  /**
   * Historial de aportes y retiros de una meta, del más reciente al más antiguo.
   *
   * @param id id de la meta
   * @param userId dueño autenticado; una meta ajena responde 404, nunca sus movimientos
   * @returns los últimos `MOVEMENTS_PAGE_SIZE` movimientos
   */
  async findMovements(id: string, userId: string) {
    const goal = await this.prisma.savings_goals.findFirst({
      where: { id, user_id: userId },
      select: { id: true },
    });
    if (!goal) throw new NotFoundException('Savings goal not found');

    const movements = await this.prisma.savings_goal_movements.findMany({
      where: { savings_goal_id: id },
      // `created_at` es `TIMESTAMP(0)`: dos movimientos del mismo segundo empatan y el orden
      // quedaría indefinido entre consultas. El `id` desempata para que la lista sea estable.
      orderBy: [{ created_at: 'desc' }, { id: 'desc' }],
      take: MOVEMENTS_PAGE_SIZE,
    });

    return {
      movements: movements.map(m => ({
        id: m.id,
        savings_goal_id: m.savings_goal_id,
        type: m.type,
        amount: Number(m.amount),
        created_at: m.created_at,
      })),
    };
  }

  /**
   * Trae los agregados de movimientos de varias metas con un costo fijo de dos consultas,
   * independiente de cuántas metas se pidan.
   *
   * Son dos y no una porque hacen falta dos cosas distintas: las sumas **dentro** de la ventana
   * de ritmo, y saber si la meta tiene algún movimiento **fuera** de ella. Sin lo segundo, una
   * meta abandonada hace un año (con historial viejo pero sin aportes recientes) caería en el
   * fallback de estimación y le prometería al usuario una fecha de cumplimiento inventada,
   * cuando la respuesta correcta es "a este ritmo no llegás".
   *
   * @param goalIds ids de las metas a agregar
   * @param reference instante de referencia para la ventana (default: ahora)
   * @returns mapa `goalId -> stats`, sin entrada para las metas sin movimientos
   */
  private async loadMovementStats(
    goalIds: string[],
    reference: Date = new Date(),
  ): Promise<Map<string, GoalMovementStats>> {
    const stats = new Map<string, GoalMovementStats>();
    if (goalIds.length === 0) return stats;

    const windowStart = startOfPaceWindow(reference);

    const [windowRows, totalRows] = await Promise.all([
      this.prisma.savings_goal_movements.groupBy({
        by: ['savings_goal_id', 'type'],
        where: { savings_goal_id: { in: goalIds }, created_at: { gte: windowStart } },
        _sum: { amount: true },
        _min: { created_at: true },
      }),
      this.prisma.savings_goal_movements.groupBy({
        by: ['savings_goal_id'],
        where: { savings_goal_id: { in: goalIds } },
        _count: { _all: true },
      }),
    ]);

    for (const row of totalRows) {
      stats.set(row.savings_goal_id, {
        window_deposits: 0,
        window_withdrawals: 0,
        window_first_at: null,
        total_count: row._count._all,
      });
    }

    for (const row of windowRows) {
      const entry = stats.get(row.savings_goal_id);
      if (!entry) continue;

      const sum = Number(row._sum.amount ?? 0);
      if (row.type === 'deposit') {
        entry.window_deposits += sum;
      } else {
        entry.window_withdrawals += sum;
      }

      // El agrupado viene partido por tipo: el primer movimiento de la ventana es el más
      // antiguo entre las dos filas de la meta.
      const first = row._min.created_at;
      if (first && (!entry.window_first_at || first < entry.window_first_at)) {
        entry.window_first_at = first;
      }
    }

    return stats;
  }

  /**
   * Valida el monto de un abono o retiro.
   *
   * La validación del cliente no alcanza: el controlador recibe el body sin DTO, así que un
   * `amount` ausente o no numérico llegaría como `NaN` y corrompería `current_amount`.
   *
   * @param value monto crudo recibido en el body
   * @returns el monto normalizado a 2 decimales (la precisión de la columna)
   * @throws BadRequestException si no es un número positivo
   */
  private parseAmount(value: any): number {
    const amount = Number(value);
    if (!Number.isFinite(amount) || amount <= 0) {
      throw new BadRequestException('El monto debe ser un número mayor a cero.');
    }
    return Number(amount.toFixed(2));
  }

  /**
   * Da forma a una meta para la API, agregando avance y proyección.
   *
   * @param goal fila de `savings_goals`
   * @param stats agregados de movimientos ya resueltos por `loadMovementStats`. Se reciben
   *        precalculados justamente para que el listado no consulte una vez por meta.
   */
  private formatGoal(goal: any, stats: GoalMovementStats | null = null) {
    const target = Number(goal.target_amount);
    const current = Number(goal.current_amount);
    const percentage = target > 0 ? Number(((current / target) * 100).toFixed(1)) : 0;
    const remaining = Math.max(0, target - current);
    const is_completed = current >= target;

    const projection = buildSavingsProjection(
      { target_amount: target, current_amount: current, deadline: goal.deadline ?? null, created_at: goal.created_at ?? null },
      stats,
    );

    return {
      ...goal,
      target_amount: target,
      current_amount: current,
      percentage,
      remaining,
      is_completed,
      projection,
    };
  }
}
