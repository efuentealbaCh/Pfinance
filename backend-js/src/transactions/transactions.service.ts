import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { MailService } from '../mail/mail.service';
import { CurrencyService } from '../currency/currency.service';
import { PushService } from '../push/push.service';
import { baseEmailTemplate } from '../mail/templates/base.template';
import { budgetAlertContent } from '../mail/templates/budget-alert.template';
import { calculateBudgetPercentage, resolveBudgetPeriod } from '../common/budget-period.util';
import { normalizeCurrency } from '../common/currency.util';
import { randomUUID } from 'crypto';

/**
 * Umbrales de consumo (en %) que disparan una alerta de presupuesto, de mayor a menor.
 * El orden importa: solo se avisa del umbral más alto que se haya cruzado, para que una
 * transacción que salta de 0% a 120% no mande dos avisos seguidos.
 */
const BUDGET_ALERT_THRESHOLDS = [100, 80];

/** Ruta del frontend que abre el service worker al hacer click en la notificación push. */
const BUDGETS_FRONTEND_PATH = '/budgets';

/**
 * Movimientos por página en el listado.
 *
 * Se mantiene el valor que ya usaba el `take` fijo anterior, para no cambiarle el tamaño de
 * página al frontend que acumula resultados a medida que el usuario pide más.
 */
const TRANSACTIONS_PAGE_SIZE = 15;

@Injectable()
export class TransactionsService {
  private readonly logger = new Logger(TransactionsService.name);

  constructor(
    private prisma: PrismaService,
    private pushService: PushService,
    private mailService: MailService,
    private currencyService: CurrencyService,
  ) {}

  private mapTransaction(t: any) {
    if (!t) return t;
    const { categories, user_accounts, target_accounts, ...rest } = t;
    let mappedUserAccount = undefined;
    if (user_accounts) {
      const { banks, ...uaRest } = user_accounts;
      mappedUserAccount = {
        ...uaRest,
        bank: banks,
      };
    }
    
    let mappedTargetAccount = undefined;
    if (target_accounts) {
      const { banks, ...taRest } = target_accounts;
      mappedTargetAccount = {
        ...taRest,
        bank: banks,
      };
    }

    return {
      ...rest,
      category: categories || null,
      user_account: mappedUserAccount,
      target_account: mappedTargetAccount,
    };
  }

  async findAll(userId: string, filters: any) {
    const where: any = { user_id: userId };

    if (filters.type) where.type = filters.type;
    if (filters.user_account_id) {
      where.OR = [
        { user_account_id: filters.user_account_id },
        { target_account_id: filters.user_account_id },
      ];
    }
    if (filters.date_from || filters.date_to) {
      where.date = {};
      if (filters.date_from) where.date.gte = new Date(filters.date_from);
      if (filters.date_to) where.date.lte = new Date(filters.date_to);
    }
    if (filters.amount_min || filters.amount_max) {
      where.amount = {};
      if (filters.amount_min) where.amount.gte = Number(filters.amount_min);
      if (filters.amount_max) where.amount.lte = Number(filters.amount_max);
    }

    const page = Math.max(1, Math.trunc(Number(filters.page)) || 1);

    const [total, transactions] = await this.prisma.$transaction([
      this.prisma.transactions.count({ where }),
      this.prisma.transactions.findMany({
        where,
        include: {
          categories: true,
          user_accounts: { include: { banks: true } },
          target_accounts: { include: { banks: true } },
        },
        orderBy: [{ date: 'desc' }, { created_at: 'desc' }, { id: 'desc' }],
        skip: (page - 1) * TRANSACTIONS_PAGE_SIZE,
        take: TRANSACTIONS_PAGE_SIZE,
      }),
    ]);

    return {
      data: transactions.map(t => this.mapTransaction(t)),
      current_page: page,
      last_page: Math.max(1, Math.ceil(total / TRANSACTIONS_PAGE_SIZE)),
      total,
    };
  }

  async findOne(id: string, userId: string) {
    const transaction = await this.prisma.transactions.findFirst({
      where: { id, user_id: userId },
      include: {
        categories: true,
        user_accounts: { include: { banks: true } },
        target_accounts: { include: { banks: true } },
        transaction_logs: true,
      },
    });

    if (!transaction) throw new NotFoundException('Transaction not found');
    return { transaction: this.mapTransaction(transaction) };
  }

  async create(userId: string, data: any, reqMetadata: any) {
    const account = await this.prisma.user_accounts.findFirst({
      where: { id: data.user_account_id, user_id: userId },
    });
    if (!account) throw new NotFoundException('Account not found');

    if (data.type === 'transfer' && !data.target_account_id) {
      throw new Error('Target account is required for transfers.');
    }

    const transaction = await this.prisma.transactions.create({
      data: {
        id: randomUUID(),
        user_id: userId,
        user_account_id: data.user_account_id,
        target_account_id: data.type === 'transfer' ? data.target_account_id : null,
        category_id: data.type === 'transfer' ? null : data.category_id,
        amount: data.amount,
        description: data.description,
        date: new Date(data.date),
        type: data.type,
        is_shared: data.is_shared ?? true,
        card_id: data.card_id || null,
        created_at: new Date(),
        updated_at: new Date(),
      },
      include: { 
        categories: true, 
        user_accounts: { include: { banks: true } },
        target_accounts: { include: { banks: true } }
      },
    });

    if (data.is_shared && data.group_id && data.type === 'expense') {
      const groupMembers = await this.prisma.group_user.findMany({
        where: { group_id: data.group_id }
      });
      if (groupMembers.length > 0) {
        const splitAmount = Number(data.amount) / groupMembers.length;
        const percentage = 100 / groupMembers.length;
        
        await this.prisma.shared_debts.create({
          data: {
            group_id: data.group_id,
            created_by: userId,
            title: data.description || 'Gasto compartido',
            amount: data.amount,
            date: new Date(data.date),
            transaction_id: transaction.id,
            shared_debt_splits: {
              create: groupMembers.map(member => ({
                user_id: member.user_id,
                percentage: percentage,
                amount_owed: splitAmount,
                is_paid: member.user_id === userId,
              }))
            }
          }
        });
      }
    }

    await this.adjustAccountBalance(userId, transaction, false);
    await this.logAction(transaction.id, userId, 'CREATE', null, transaction, reqMetadata);

    const warnings = await this.checkBudgetWarning(userId, transaction);

    return {
      message: 'Transacción creada exitosamente.',
      transaction: this.mapTransaction(transaction),
      warnings,
    };
  }

  async update(id: string, userId: string, data: any, reqMetadata: any) {
    const transaction = await this.prisma.transactions.findFirst({
      where: { id, user_id: userId },
    });
    if (!transaction) throw new NotFoundException('Transaction not found');

    if (data.user_account_id && data.user_account_id !== transaction.user_account_id) {
      const account = await this.prisma.user_accounts.findFirst({
        where: { id: data.user_account_id, user_id: userId },
      });
      if (!account) throw new NotFoundException('Account not found');
    }

    if (data.type === 'transfer' && !data.target_account_id) {
      throw new Error('Target account is required for transfers.');
    }

    const before = transaction;
    await this.adjustAccountBalance(userId, before, true);

    const updatedTransaction = await this.prisma.transactions.update({
      where: { id },
      data: {
        user_account_id: data.user_account_id,
        target_account_id: data.type === 'transfer' ? data.target_account_id : null,
        category_id: data.type === 'transfer' ? null : data.category_id,
        amount: data.amount,
        description: data.description,
        date: data.date ? new Date(data.date) : undefined,
        type: data.type,
        is_shared: data.is_shared,
        card_id: data.card_id || null,
        updated_at: new Date(),
      },
      include: { 
        categories: true, 
        user_accounts: { include: { banks: true } },
        target_accounts: { include: { banks: true } }
      },
    });

    // Update shared debt if it exists
    if (updatedTransaction.is_shared && updatedTransaction.type === 'expense') {
      const existingDebt = await this.prisma.shared_debts.findFirst({
        where: { transaction_id: updatedTransaction.id }
      });
      if (existingDebt && (Number(existingDebt.amount) !== Number(updatedTransaction.amount) || data.date)) {
        const groupMembers = await this.prisma.group_user.findMany({
          where: { group_id: existingDebt.group_id }
        });
        if (groupMembers.length > 0) {
          const splitAmount = Number(updatedTransaction.amount) / groupMembers.length;
          
          await this.prisma.shared_debts.update({
            where: { id: existingDebt.id },
            data: { amount: updatedTransaction.amount, date: data.date ? new Date(data.date) : undefined },
          });

          for (const member of groupMembers) {
            await this.prisma.shared_debt_splits.updateMany({
              where: { shared_debt_id: existingDebt.id, user_id: member.user_id },
              data: { amount_owed: splitAmount },
            });
          }
        }
      }
    }

    await this.adjustAccountBalance(userId, updatedTransaction, false);
    await this.logAction(transaction.id, userId, 'UPDATE', before, updatedTransaction, reqMetadata);

    const warnings = await this.checkBudgetWarning(userId, updatedTransaction);

    return {
      message: 'Transacción actualizada exitosamente.',
      transaction: this.mapTransaction(updatedTransaction),
      warnings,
    };
  }

  async remove(id: string, userId: string, reqMetadata: any) {
    const transaction = await this.prisma.transactions.findFirst({
      where: { id, user_id: userId },
    });
    if (!transaction) throw new NotFoundException('Transaction not found');

    await this.logAction(transaction.id, userId, 'DELETE', transaction, null, reqMetadata);
    await this.adjustAccountBalance(userId, transaction, true);

    await this.prisma.transactions.delete({ where: { id } });

    return { message: 'Transacción eliminada exitosamente.' };
  }

  private async logAction(transactionId: string, userId: string, action: string, before: any, after: any, reqMetadata: any) {
    await this.prisma.transaction_logs.create({
      data: {
        id: randomUUID(),
        transaction_id: transactionId,
        user_id: userId,
        action,
        payload_before: before,
        payload_after: after,
        ip_address: reqMetadata.ip,
        user_agent: reqMetadata.userAgent,
        created_at: new Date(),
      }
    });
  }

  /**
   * Aplica (o revierte) el efecto de una transacción sobre el saldo de la cuenta, la cuenta
   * destino si es transferencia, y la tarjeta asociada.
   *
   * Recibe la transacción entera en vez de sus campos sueltos porque los cuatro puntos que la
   * llaman le pasan siempre el mismo objeto, y con siete parámetros posicionales era fácil
   * cruzar dos por error.
   *
   * En una transferencia entre cuentas de distinta moneda, el monto sale de la cuenta origen en
   * SU moneda y se acredita en la destino convertido con la cotización de la fecha de la
   * transacción. Como las cotizaciones ya cargadas son inmutables, revertir la misma transacción
   * más tarde recalcula exactamente el mismo monto convertido y el saldo vuelve a cuadrar.
   *
   * @param userId dueño de las cuentas involucradas
   * @param transaction transacción a aplicar o revertir
   * @param revert `true` para deshacer el efecto (edición o borrado)
   */
  private async adjustAccountBalance(
    userId: string,
    transaction: {
      user_account_id: string;
      target_account_id: string | null;
      type: string;
      amount: Prisma.Decimal | number;
      card_id: string | null;
      date: Date;
    },
    revert = false,
  ) {
    const { user_account_id: accountId, target_account_id: targetAccountId, type, card_id: cardId, date } = transaction;
    const amount = Number(transaction.amount);

    const account = await this.prisma.user_accounts.findFirst({ where: { id: accountId, user_id: userId } });
    if (!account) return;

    let balance = Number(account.balance);
    const factor = revert ? -1 : 1;

    if (type === 'income') {
      balance += (amount * factor);
    } else if (type === 'expense') {
      balance -= (amount * factor);
    } else if (type === 'transfer') {
      // Source account loses money
      balance -= (amount * factor);

      // Target account gains money
      if (targetAccountId) {
        const targetAccount = await this.prisma.user_accounts.findFirst({ where: { id: targetAccountId, user_id: userId } });
        if (targetAccount) {
          const credited = await this.currencyService.convert(
            amount,
            normalizeCurrency(account.currency),
            normalizeCurrency(targetAccount.currency),
            date,
          );
          let targetBalance = Number(targetAccount.balance);
          targetBalance += (credited * factor);
          await this.prisma.user_accounts.update({
            where: { id: targetAccountId },
            data: { balance: targetBalance },
          });
        }
      }
    }

    await this.prisma.user_accounts.update({
      where: { id: accountId },
      data: { balance },
    });

    if (cardId) {
      // La tarjeta pertenece a la cuenta origen, así que comparte su moneda: acá nunca hay
      // conversión, ni siquiera en una transferencia a una cuenta en otra moneda.
      const card = await this.prisma.cards.findFirst({ where: { id: cardId, user_account_id: accountId } });
      if (card) {
        let cardBalance = Number(card.balance);
        if (type === 'income') cardBalance += (amount * factor);
        else if (type === 'expense' || type === 'transfer') cardBalance -= (amount * factor);

        await this.prisma.cards.update({
          where: { id: cardId },
          data: { balance: cardBalance },
        });
      }
    }
  }

  /**
   * Evalúa los presupuestos de la categoría de la transacción y devuelve los avisos de texto
   * que la API ya venía exponiendo en `warnings`, además de disparar la notificación (push o
   * correo) la primera vez que se cruza cada umbral en cada período.
   *
   * Se consultan TODOS los presupuestos de la categoría en vez de filtrar por período, porque
   * `budgets.period` convive en dos formatos: los literales `monthly`/`weekly`/`yearly` (el
   * default del schema) y un mes explícito `YYYY-MM`. El rango efectivo lo resuelve
   * `resolveBudgetPeriod`, el mismo helper que usa `BudgetsService` para mostrar el consumo.
   *
   * @param userId id del usuario dueño de la transacción
   * @param transaction transacción recién creada o actualizada
   * @returns lista de mensajes para el frontend (vacía si no se cruzó ningún umbral)
   */
  private async checkBudgetWarning(userId: string, transaction: any): Promise<string[]> {
    if (transaction.type !== 'expense' || !transaction.category_id) return [];

    const budgets = await this.prisma.budgets.findMany({
      where: { user_id: userId, category_id: transaction.category_id },
      include: { categories: true },
    });

    const warnings: string[] = [];

    for (const budget of budgets) {
      const period = resolveBudgetPeriod(budget.period);

      const spentAgg = await this.prisma.transactions.aggregate({
        _sum: { amount: true },
        where: {
          user_id: userId,
          category_id: budget.category_id,
          type: 'expense',
          date: { gte: period.from, lte: period.to },
        },
      });

      const spent = Number(spentAgg._sum.amount || 0);
      const amount = Number(budget.amount);
      const percentage = calculateBudgetPercentage(spent, amount);

      const threshold = BUDGET_ALERT_THRESHOLDS.find(t => percentage >= t);
      if (!threshold) continue;

      const category = budget.categories ? budget.categories.name : 'la categoría';
      const alert = { category, amount, spent: Number(spent.toFixed(2)), percentage, threshold };

      warnings.push(
        threshold >= 100
          ? `¡Atención! Alcanzaste o superaste el 100% de tu presupuesto de $${amount} para ${category}. Llevás gastados $${alert.spent} (${percentage}%).`
          : `¡Atención! Alcanzaste el 80% de tu presupuesto de $${amount} para ${category}. Llevás gastados $${alert.spent} (${percentage}%).`,
      );

      await this.notifyBudgetThreshold(userId, budget.id, period.key, alert);
    }

    return warnings;
  }

  /**
   * Notifica al usuario que cruzó un umbral de su presupuesto, una sola vez por período.
   *
   * El registro en `budget_alerts` se hace ANTES de enviar y se apoya en el índice único
   * `(budget_id, period_key, threshold)`: si dos transacciones cruzan el umbral al mismo
   * tiempo, el segundo insert falla con P2002 y ese camino no manda nada. Un `findFirst`
   * previo no daría esa garantía (dos requests podrían leer "no existe" a la vez).
   *
   * Nada de esto puede tumbar la creación/actualización de la transacción: todo error se
   * loguea y se sigue.
   *
   * @param userId id del usuario destinatario
   * @param budgetId presupuesto que cruzó el umbral
   * @param periodKey instancia del período (`2026-09`, `2026-W37`, `2026`)
   * @param alert datos del presupuesto para armar el mensaje
   */
  private async notifyBudgetThreshold(
    userId: string,
    budgetId: string,
    periodKey: string,
    alert: { category: string; amount: number; spent: number; percentage: number; threshold: number },
  ) {
    try {
      await this.prisma.budget_alerts.create({
        data: { budget_id: budgetId, period_key: periodKey, threshold: alert.threshold },
      });
    } catch (error) {
      // P2002 = violación de unique: este umbral ya se avisó en este período, no es un error.
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') return;

      this.logger.error(
        `No se pudo registrar la alerta del ${alert.threshold}% del presupuesto ${budgetId} (período ${periodKey}): ${(error as Error).message}`,
        (error as Error).stack,
      );
      return;
    }

    try {
      const body =
        alert.threshold >= 100
          ? `Agotaste tu presupuesto de ${alert.category}: llevás gastados $${alert.spent} de $${alert.amount} (${alert.percentage}%).`
          : `Vas por el ${alert.percentage}% de tu presupuesto de ${alert.category}: $${alert.spent} de $${alert.amount}.`;

      // Un solo canal por aviso: push si el usuario tiene algún dispositivo suscripto, y
      // correo únicamente como respaldo cuando no tiene ninguno.
      const subscriptions = await this.prisma.push_subscriptions.count({ where: { user_id: userId } });

      if (subscriptions > 0) {
        await this.pushService.sendToUser(userId, {
          title: 'Pfinance — Alerta de presupuesto',
          body,
          url: BUDGETS_FRONTEND_PATH,
        });
        return;
      }

      const user = await this.prisma.users.findUnique({
        where: { id: userId },
        select: { email: true, name: true },
      });
      if (!user) return;

      await this.mailService.sendMail({
        to: user.email,
        subject: `Pfinance — Alerta de presupuesto: ${alert.category}`,
        html: baseEmailTemplate(budgetAlertContent(user.name, alert), body),
      });
    } catch (error) {
      this.logger.error(
        `No se pudo notificar la alerta del ${alert.threshold}% del presupuesto ${budgetId} al usuario ${userId}: ${(error as Error).message}`,
        (error as Error).stack,
      );
    }
  }
}
