import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { randomUUID } from 'crypto';

@Injectable()
export class UserAccountsService {
  constructor(private prisma: PrismaService) {}

  private mapAccount(account: any) {
    const { banks, account_types, ...rest } = account;
    return {
      ...rest,
      bank: banks,
      account_type: account_types,
    };
  }

  async findAll(userId: bigint) {
    const accounts = await this.prisma.user_accounts.findMany({
      where: { user_id: userId },
      include: { banks: true, account_types: true },
      orderBy: { created_at: 'desc' },
    });
    return { accounts: accounts.map(a => this.mapAccount(a)) };
  }

  async findOne(id: string, userId: bigint) {
    const account = await this.prisma.user_accounts.findFirst({
      where: { id, user_id: userId },
      include: { banks: true, account_types: true },
    });
    if (!account) throw new NotFoundException('Account not found');
    return { account: this.mapAccount(account) };
  }

  async create(userId: bigint, data: any) {
    const account = await this.prisma.user_accounts.create({
      data: {
        id: randomUUID(),
        user_id: userId,
        bank_id: data.bank_id,
        account_type_id: data.account_type_id,
        identifier: data.identifier,
        balance: data.balance || 0,
        created_at: new Date(),
        updated_at: new Date(),
      },
      include: { banks: true, account_types: true },
    });
    return { message: 'Cuenta creada exitosamente.', account: this.mapAccount(account) };
  }

  async update(id: string, userId: bigint, data: any) {
    const existing = await this.prisma.user_accounts.findFirst({ where: { id, user_id: userId }});
    if (!existing) throw new NotFoundException('Account not found');

    const account = await this.prisma.user_accounts.update({
      where: { id },
      data: {
        bank_id: data.bank_id,
        account_type_id: data.account_type_id,
        identifier: data.identifier,
        balance: data.balance,
        updated_at: new Date(),
      },
      include: { banks: true, account_types: true },
    });
    return { message: 'Cuenta actualizada exitosamente.', account: this.mapAccount(account) };
  }

  async remove(id: string, userId: bigint) {
    const existing = await this.prisma.user_accounts.findFirst({ where: { id, user_id: userId }});
    if (!existing) throw new NotFoundException('Account not found');
    
    await this.prisma.user_accounts.delete({
      where: { id },
    });
    return { message: 'Cuenta eliminada exitosamente.' };
  }
}
