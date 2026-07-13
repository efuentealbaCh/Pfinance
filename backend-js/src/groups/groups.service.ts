import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class GroupsService {
  constructor(private prisma: PrismaService) {}

  private mapGroup(group: any) {
    if (!group) return group;

    let users = undefined;
    if (group.group_user) {
      users = group.group_user.map((gu: any) => ({
        ...gu.users,
        pivot: {
          role: gu.role,
          status: gu.status,
          created_at: gu.created_at,
        }
      }));
    }

    let shared_debts = undefined;
    if (group.shared_debts) {
      shared_debts = group.shared_debts.map((debt: any) => ({
        ...debt,
        splits: debt.shared_debt_splits ? debt.shared_debt_splits.map((s: any) => ({
          ...s,
          user: s.users
        })) : [],
        creator: debt.users
      }));
    }

    const { group_user, shared_debts: sd, ...rest } = group;

    return {
      ...rest,
      users: users || [],
      shared_debts: shared_debts || [],
    };
  }

  async findAll(userId: bigint) {
    const groups = await this.prisma.groups.findMany({
      where: {
        group_user: { some: { user_id: userId } },
      },
      include: {
        _count: { select: { group_user: true } },
        group_user: { include: { users: { select: { id: true, name: true, email: true } } } },
      }
    });
    return groups.map(g => this.mapGroup(g));
  }

  async findOne(id: string, userId: bigint) {
    const groupId = BigInt(id);
    const group = await this.prisma.groups.findFirst({
      where: {
        id: groupId,
        group_user: { some: { user_id: userId } },
      },
      include: {
        group_user: { include: { users: { select: { id: true, name: true, email: true } } } },
        shared_debts: {
          include: {
            shared_debt_splits: { include: { users: { select: { id: true, name: true } } } },
            users: { select: { id: true, name: true } },
          }
        }
      }
    });

    if (!group) throw new NotFoundException('Group not found');
    return this.mapGroup(group);
  }

  async create(userId: bigint, data: any) {
    const group = await this.prisma.groups.create({
      data: {
        name: data.name,
        description: data.description,
        created_by: userId,
        created_at: new Date(),
        updated_at: new Date(),
        group_user: {
          create: {
            user_id: userId,
            role: 'admin',
            status: 'accepted',
          }
        }
      }
    });
    return group;
  }

  async removeMember(groupId: string, targetUserId: bigint, requesterId: bigint) {
    const gId = BigInt(groupId);
    const requesterMembership = await this.prisma.group_user.findFirst({
      where: { group_id: gId, user_id: requesterId, role: 'admin' },
    });

    if (!requesterMembership) throw new ForbiddenException('No tienes permisos de administrador en este grupo.');

    const group = await this.prisma.groups.findUnique({ where: { id: gId } });
    if (group && group.created_by === targetUserId) {
      throw new ForbiddenException('No puedes eliminar al creador del grupo.');
    }

    await this.prisma.group_user.deleteMany({
      where: { group_id: gId, user_id: targetUserId }
    });

    return { message: 'Miembro eliminado correctamente.' };
  }

  async inviteUser(groupId: string, email: string, requesterId: bigint) {
    const gId = BigInt(groupId);
    
    // Check if requester is admin
    const requesterMembership = await this.prisma.group_user.findFirst({
      where: { group_id: gId, user_id: requesterId, role: 'admin' },
    });
    if (!requesterMembership) throw new ForbiddenException('No tienes permisos para invitar a este grupo.');

    const targetUser = await this.prisma.users.findUnique({ where: { email } });
    if (!targetUser) throw new NotFoundException('Usuario con ese email no encontrado.');

    const existingMembership = await this.prisma.group_user.findFirst({
      where: { group_id: gId, user_id: targetUser.id }
    });

    if (existingMembership) {
      if (existingMembership.status === 'pending') throw new Error('El usuario ya tiene una invitación pendiente.');
      throw new Error('El usuario ya es miembro del grupo.');
    }

    await this.prisma.group_user.create({
      data: {
        group_id: gId,
        user_id: targetUser.id,
        role: 'member',
        status: 'pending',
        created_at: new Date(),
        updated_at: new Date(),
      }
    });

    return { message: 'Invitación enviada.' };
  }

  async acceptInvitation(groupId: string, userId: bigint) {
    const gId = BigInt(groupId);
    const membership = await this.prisma.group_user.findFirst({
      where: { group_id: gId, user_id: userId, status: 'pending' },
    });
    if (!membership) throw new NotFoundException('Invitación no encontrada.');

    await this.prisma.group_user.update({
      where: { id: membership.id },
      data: { status: 'accepted', updated_at: new Date() },
    });

    return { message: 'Invitación aceptada.' };
  }

  async rejectInvitation(groupId: string, userId: bigint) {
    const gId = BigInt(groupId);
    const membership = await this.prisma.group_user.findFirst({
      where: { group_id: gId, user_id: userId, status: 'pending' },
    });
    if (!membership) throw new NotFoundException('Invitación no encontrada.');

    await this.prisma.group_user.delete({
      where: { id: membership.id },
    });

    return { message: 'Invitación rechazada.' };
  }

  async getInvitations(userId: bigint) {
    const invitations = await this.prisma.group_user.findMany({
      where: { user_id: userId, status: 'pending' },
      include: {
        groups: {
          select: {
            id: true,
            name: true,
            description: true,
            created_at: true,
          }
        }
      }
    });
    return invitations.map(inv => ({
      id: inv.groups.id,
      name: inv.groups.name,
      description: inv.groups.description,
      invited_at: inv.created_at,
    }));
  }
}
