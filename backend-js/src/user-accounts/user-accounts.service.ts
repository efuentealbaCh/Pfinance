import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { randomUUID } from 'crypto';
import {
  Currency,
  DEFAULT_CURRENCY,
  SUPPORTED_CURRENCIES,
  isSupportedCurrency,
} from '../common/currency.util';

@Injectable()
export class UserAccountsService {
  constructor(private prisma: PrismaService) {}

  /**
   * Valida la moneda pedida para una cuenta.
   *
   * @param value valor recibido en el body, opcional
   * @returns la moneda validada, o la moneda por defecto si no vino ninguna
   * @throws BadRequestException si vino una moneda que la app no soporta
   */
  private resolveCurrency(value: unknown): Currency {
    if (value === undefined || value === null || value === '') return DEFAULT_CURRENCY;
    if (!isSupportedCurrency(value)) {
      throw new BadRequestException(
        `Moneda no soportada. Las disponibles son: ${SUPPORTED_CURRENCIES.join(', ')}.`,
      );
    }
    return value;
  }

  private mapAccount(account: any) {
    const { banks, account_types, ...rest } = account;
    return {
      ...rest,
      bank: banks,
      account_type: account_types,
    };
  }

  async findAll(userId: string) {
    const accounts = await this.prisma.user_accounts.findMany({
      where: { user_id: userId },
      include: { banks: true, account_types: true, cards: true },
      orderBy: { created_at: 'desc' },
    });
    return { accounts: accounts.map(a => this.mapAccount(a)) };
  }

  async findOne(id: string, userId: string) {
    const account = await this.prisma.user_accounts.findFirst({
      where: { id, user_id: userId },
      include: { banks: true, account_types: true, cards: true },
    });
    if (!account) throw new NotFoundException('Account not found');
    return { account: this.mapAccount(account) };
  }

  async create(userId: string, data: any) {
    const account = await this.prisma.user_accounts.create({
      data: {
        id: randomUUID(),
        user_id: userId,
        bank_id: data.bank_id,
        account_type_id: data.account_type_id,
        identifier: data.identifier,
        balance: data.balance || 0,
        currency: this.resolveCurrency(data.currency),
        cards: data.cards && data.cards.length > 0 ? {
          create: data.cards.map((c: any) => ({
            id: randomUUID(),
            name: c.name,
            type: c.type,
            last_four: c.last_four,
            balance: c.balance || 0,
            created_at: new Date(),
            updated_at: new Date(),
          }))
        } : undefined,
        created_at: new Date(),
        updated_at: new Date(),
      },
      include: { banks: true, account_types: true, cards: true },
    });
    return { message: 'Cuenta creada exitosamente.', account: this.mapAccount(account) };
  }

  async update(id: string, userId: string, data: any) {
    const existing = await this.prisma.user_accounts.findFirst({ where: { id, user_id: userId }});
    if (!existing) throw new NotFoundException('Account not found');

    const currency = data.currency === undefined ? undefined : this.resolveCurrency(data.currency);

    // Cambiar la moneda de una cuenta que ya tiene movimientos reinterpretaria en silencio todo
    // su historial: los mismos numeros pasarian de pesos a dolares sin que nadie los convierta,
    // y el saldo dejaria de tener relacion con lo que informa el banco. Se bloquea a proposito;
    // si de verdad hace falta, corresponde crear una cuenta nueva en la otra moneda.
    if (currency && currency !== existing.currency) {
      const movements = await this.prisma.transactions.count({
        where: { OR: [{ user_account_id: id }, { target_account_id: id }] },
      });
      if (movements > 0) {
        throw new ConflictException(
          `No se puede cambiar la moneda de una cuenta con movimientos (tiene ${movements}). ` +
            'Crea una cuenta nueva en la moneda que necesitas.',
        );
      }
    }

    const account = await this.prisma.user_accounts.update({
      where: { id },
      data: {
        bank_id: data.bank_id,
        account_type_id: data.account_type_id,
        identifier: data.identifier,
        balance: data.balance,
        currency,
        cards: {
          deleteMany: {},
          ...(data.cards && data.cards.length > 0 ? {
            create: data.cards.map((c: any) => ({
              id: randomUUID(),
              name: c.name,
              type: c.type,
              last_four: c.last_four,
              balance: c.balance || 0,
              created_at: new Date(),
              updated_at: new Date(),
            }))
          } : {})
        },
        updated_at: new Date(),
      },
      include: { banks: true, account_types: true, cards: true },
    });
    return { message: 'Cuenta actualizada exitosamente.', account: this.mapAccount(account) };
  }

  async remove(id: string, userId: string) {
    const existing = await this.prisma.user_accounts.findFirst({ where: { id, user_id: userId }});
    if (!existing) throw new NotFoundException('Account not found');
    
    await this.prisma.user_accounts.delete({
      where: { id },
    });
    return { message: 'Cuenta eliminada exitosamente.' };
  }
}
