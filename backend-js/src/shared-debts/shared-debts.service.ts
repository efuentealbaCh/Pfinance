import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SharedDebtsService {
  constructor(private prisma: PrismaService) {}

  async create(groupId: string, userId: bigint, data: any) {
    const sum = data.splits.reduce((acc: number, split: any) => acc + Number(split.percentage), 0);
    if (Math.round(sum * 100) / 100 !== 100.00) {
      throw new UnprocessableEntityException('Percentages must sum to 100.');
    }

    const gId = BigInt(groupId);

    const groupMembership = await this.prisma.group_user.findFirst({
      where: { group_id: gId, user_id: userId }
    });
    if (!groupMembership) throw new NotFoundException('Group not found');

    const debt = await this.prisma.$transaction(async (tx) => {
      const created = await tx.shared_debts.create({
        data: {
          group_id: gId,
          created_by: userId,
          title: data.title,
          amount: data.amount,
          date: new Date(data.date),
          created_at: new Date(),
          updated_at: new Date(),
        }
      });

      for (const split of data.splits) {
        if (Number(split.percentage) > 0) {
          const amount_owed = (Number(data.amount) * Number(split.percentage)) / 100;
          await tx.shared_debt_splits.create({
            data: {
              shared_debt_id: created.id,
              user_id: BigInt(split.user_id),
              percentage: split.percentage,
              amount_owed,
              is_paid: false,
              created_at: new Date(),
              updated_at: new Date(),
            }
          });
        }
      }

      const debt = await tx.shared_debts.findUnique({
        where: { id: created.id },
        include: { shared_debt_splits: { include: { users: { select: { id: true, name: true } } } }, users: { select: { id: true, name: true } }, groups: { select: { id: true, name: true } } }
      });

      if (!debt) return debt;

      const { shared_debt_splits, users, groups: g, ...rest } = debt;
      return {
        ...rest,
        splits: shared_debt_splits ? shared_debt_splits.map((s: any) => ({ ...s, user: s.users })) : [],
        creator: users,
        group: g,
      };
    });

    return debt;
  }

  async pay(debtId: string, userId: bigint) {
    const dId = BigInt(debtId);
    const split = await this.prisma.shared_debt_splits.findFirst({
      where: { shared_debt_id: dId, user_id: userId }
    });

    if (!split) throw new NotFoundException('Split not found');

    const updated = await this.prisma.shared_debt_splits.update({
      where: { id: split.id },
      data: { is_paid: true, updated_at: new Date() }
    });

    return { message: 'Debt marked as paid.', split: updated };
  }
}
