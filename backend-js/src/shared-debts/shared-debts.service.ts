import {
  ConflictException,
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PrismaService } from '../prisma/prisma.service';
import { PushService } from '../push/push.service';
import { MailService } from '../mail/mail.service';
import { baseEmailTemplate } from '../mail/templates/base.template';
import {
  SharedDebtPaymentEvent,
  SharedDebtPaymentInfo,
  sharedDebtPaymentContent,
} from '../mail/templates/shared-debt-payment.template';
import {
  SharedDebtReminderItem,
  sharedDebtReminderContent,
} from '../mail/templates/shared-debt-reminder.template';
import { withSplitStatus } from '../common/shared-debt-status.util';
import { RejectDebtPaymentDto } from './dto/reject-debt-payment.dto';

/**
 * Ruta del frontend que abre el service worker al hacer click en la notificación push.
 * El detalle de un grupo vive en `/groups/:id` (ver App.tsx del PWA); el listado `/groups` se
 * usa cuando el aviso agrupa deudas de varios grupos y no hay un destino único.
 */
const GROUPS_FRONTEND_PATH = '/groups';

/**
 * Recordatorio semanal de deudas pendientes: lunes a las 9:00.
 * Se escribe la expresión completa (con segundos) en vez de usar `CronExpression.EVERY_WEEK`
 * porque esa constante dispara el domingo a medianoche, mal horario para un aviso de plata.
 */
const WEEKLY_REMINDER_CRON = '0 0 9 * * 1';

@Injectable()
export class SharedDebtsService {
  private readonly logger = new Logger(SharedDebtsService.name);

  constructor(
    private prisma: PrismaService,
    private pushService: PushService,
    private mailService: MailService,
  ) {}

  async create(groupId: string, userId: string, data: any) {
    const sum = data.splits.reduce((acc: number, split: any) => acc + Number(split.percentage), 0);
    if (Math.round(sum * 100) / 100 !== 100.00) {
      throw new UnprocessableEntityException('Percentages must sum to 100.');
    }

    const gId = groupId;

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
              user_id: split.user_id,
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
        splits: shared_debt_splits
          ? shared_debt_splits.map((s: any) => withSplitStatus({ ...s, user: s.users }))
          : [],
        creator: users,
        group: g,
      };
    });

    return debt;
  }

  /**
   * Primer paso del flujo: el deudor **declara** que pagó su parte.
   *
   * No salda la deuda — solo deja la marca temporal y le avisa al acreedor, que es quien tiene
   * que confirmar la recepción. Antes este mismo endpoint ponía `is_paid = true` directamente,
   * con lo cual el deudor se daba por pagado por su cuenta.
   *
   * @param debtId deuda compartida sobre la que se declara el pago
   * @param userId usuario autenticado; tiene que tener un split en esa deuda
   * @returns mensaje y el split actualizado con su estado derivado
   * @throws NotFoundException si el usuario no participa de esa deuda
   * @throws ConflictException si la parte ya está saldada o ya se declaró el pago
   */
  async declarePayment(debtId: string, userId: string) {
    const split = await this.prisma.shared_debt_splits.findFirst({
      where: { shared_debt_id: debtId, user_id: userId },
      include: {
        users: { select: { id: true, name: true } },
        shared_debts: {
          include: {
            users: { select: { id: true, name: true } },
            groups: { select: { id: true, name: true } },
          },
        },
      },
    });

    if (!split) throw new NotFoundException('Split not found');
    if (split.is_paid) throw new ConflictException('Esta parte de la deuda ya está saldada.');
    if (split.payment_declared_at) {
      throw new ConflictException('Ya declaraste el pago de esta deuda; está esperando la confirmación.');
    }

    const updated = await this.prisma.shared_debt_splits.update({
      where: { id: split.id },
      data: { payment_declared_at: new Date(), updated_at: new Date() },
    });

    // El acreedor es quien creó la deuda: es el que puso la plata y el único que puede confirmar.
    await this.notifyPaymentEvent(
      split.shared_debts.created_by,
      'declared',
      {
        title: split.shared_debts.title,
        group: split.shared_debts.groups.name,
        amount: Number(split.amount_owed),
        counterpart: split.users.name,
      },
      split.shared_debts.group_id,
    );

    return {
      message: 'Pago declarado. Queda a la espera de que quien puso la plata confirme la recepción.',
      split: withSplitStatus(updated),
    };
  }

  /**
   * Segundo paso del flujo: el acreedor confirma que recibió el pago y la parte queda saldada.
   *
   * @param debtId deuda compartida a la que pertenece el split
   * @param splitId parte concreta que se confirma
   * @param userId usuario autenticado; tiene que ser `shared_debts.created_by`
   * @returns mensaje y el split actualizado con su estado derivado
   * @throws NotFoundException si el split no existe dentro de esa deuda
   * @throws ForbiddenException si quien pide la confirmación no es el acreedor
   * @throws ConflictException si la parte ya está saldada o no hay un pago declarado
   */
  async confirmPayment(debtId: string, splitId: string, userId: string) {
    const split = await this.loadSplitForCreditor(debtId, splitId, userId);

    if (split.is_paid) throw new ConflictException('Esta parte de la deuda ya está saldada.');
    if (!split.payment_declared_at) {
      throw new ConflictException('Esta parte no tiene un pago declarado para confirmar.');
    }

    const now = new Date();
    const updated = await this.prisma.shared_debt_splits.update({
      where: { id: split.id },
      data: { is_paid: true, payment_confirmed_at: now, updated_at: now },
    });

    await this.notifyPaymentEvent(
      split.user_id,
      'confirmed',
      {
        title: split.shared_debts.title,
        group: split.shared_debts.groups.name,
        amount: Number(split.amount_owed),
        counterpart: split.shared_debts.users.name,
      },
      split.shared_debts.group_id,
    );

    return { message: 'Pago confirmado. La deuda quedó saldada.', split: withSplitStatus(updated) };
  }

  /**
   * Contrapartida de `confirmPayment`: el acreedor rechaza la declaración ("a mí no me llegó").
   *
   * Limpia `payment_declared_at` para que la parte vuelva a pendiente y el deudor pueda volver
   * a declarar el pago cuando el problema esté resuelto. Sin este camino, una declaración
   * equivocada dejaba la deuda trabada en "esperando confirmación" para siempre.
   *
   * @param debtId deuda compartida a la que pertenece el split
   * @param splitId parte concreta cuya declaración se rechaza
   * @param userId usuario autenticado; tiene que ser `shared_debts.created_by`
   * @param dto motivo opcional del rechazo, que viaja solo en la notificación
   * @returns mensaje y el split actualizado con su estado derivado
   * @throws NotFoundException si el split no existe dentro de esa deuda
   * @throws ForbiddenException si quien rechaza no es el acreedor
   * @throws ConflictException si la parte ya está saldada o no hay un pago declarado
   */
  async rejectPayment(debtId: string, splitId: string, userId: string, dto: RejectDebtPaymentDto = {}) {
    const split = await this.loadSplitForCreditor(debtId, splitId, userId);

    if (split.is_paid) {
      throw new ConflictException('Esta parte ya está saldada; no se puede rechazar el pago.');
    }
    if (!split.payment_declared_at) {
      throw new ConflictException('Esta parte no tiene un pago declarado para rechazar.');
    }

    const updated = await this.prisma.shared_debt_splits.update({
      where: { id: split.id },
      data: { payment_declared_at: null, updated_at: new Date() },
    });

    await this.notifyPaymentEvent(
      split.user_id,
      'rejected',
      {
        title: split.shared_debts.title,
        group: split.shared_debts.groups.name,
        amount: Number(split.amount_owed),
        counterpart: split.shared_debts.users.name,
        reason: dto.reason,
      },
      split.shared_debts.group_id,
    );

    return {
      message: 'Pago rechazado. La deuda volvió a quedar pendiente.',
      split: withSplitStatus(updated),
    };
  }

  /**
   * Carga un split validando que exista dentro de la deuda indicada y que el usuario sea el
   * acreedor. Centraliza el chequeo de autorización que comparten `confirmPayment` y
   * `rejectPayment`: solo quien creó la deuda decide sobre los pagos, así que un deudor no
   * puede confirmarse ni rechazarse el pago a sí mismo.
   *
   * @param debtId deuda compartida
   * @param splitId parte concreta
   * @param userId usuario autenticado
   * @returns el split con la deuda, el grupo y el acreedor incluidos
   * @throws NotFoundException si el split no pertenece a esa deuda
   * @throws ForbiddenException si el usuario no es el acreedor
   */
  private async loadSplitForCreditor(debtId: string, splitId: string, userId: string) {
    const split = await this.prisma.shared_debt_splits.findFirst({
      where: { id: splitId, shared_debt_id: debtId },
      include: {
        shared_debts: {
          include: {
            users: { select: { id: true, name: true } },
            groups: { select: { id: true, name: true } },
          },
        },
      },
    });

    if (!split) throw new NotFoundException('Split not found');

    if (split.shared_debts.created_by !== userId) {
      throw new ForbiddenException('Solo quien registró la deuda puede confirmar o rechazar el pago.');
    }

    return split;
  }

  /**
   * Job semanal que le recuerda a cada deudor las partes que todavía no declaró como pagadas.
   *
   * Solo le llega a quien debe: el acreedor no recibe nada por acá (ya se entera cuando hay un
   * pago para confirmar). No hace falta deduplicar — al ser semanal y sin estado, cada corrida
   * es un recordatorio nuevo — pero sí se excluyen las partes ya declaradas o saldadas para no
   * reclamar plata que el deudor ya dio por pagada.
   *
   * Es defensivo a propósito: un error con un usuario no puede cortar el procesamiento del resto.
   */
  @Cron(WEEKLY_REMINDER_CRON, { name: 'shared-debts-weekly-reminder' })
  async remindPendingDebts() {
    let splits: any[];
    try {
      splits = await this.prisma.shared_debt_splits.findMany({
        where: { is_paid: false, payment_declared_at: null },
        include: {
          shared_debts: {
            include: {
              users: { select: { id: true, name: true } },
              groups: { select: { id: true, name: true } },
            },
          },
        },
        orderBy: { created_at: 'asc' },
      });
    } catch (error) {
      this.logger.error(
        `No se pudieron consultar las deudas compartidas pendientes: ${(error as Error).message}`,
        (error as Error).stack,
      );
      return;
    }

    // Se agrupa por deudor para mandar un solo aviso con todo lo que debe, en vez de uno por
    // deuda. Se descartan los splits donde el deudor es el propio acreedor: nadie se debe plata
    // a sí mismo, y el creador puede quedar incluido en el reparto de su propia deuda.
    const byUser = new Map<string, SharedDebtReminderItem[]>();
    for (const split of splits) {
      if (split.user_id === split.shared_debts.created_by) continue;

      const items = byUser.get(split.user_id) ?? [];
      items.push({
        title: split.shared_debts.title,
        group: split.shared_debts.groups.name,
        creditor: split.shared_debts.users.name,
        amount: Number(split.amount_owed),
        date: split.shared_debts.date.toISOString().slice(0, 10),
      });
      byUser.set(split.user_id, items);
    }

    if (byUser.size === 0) {
      this.logger.log('No hay deudas compartidas pendientes que recordar.');
      return;
    }

    let notified = 0;
    let failed = 0;

    for (const [userId, items] of byUser) {
      try {
        await this.notifyPendingDebts(userId, items);
        notified++;
      } catch (error) {
        failed++;
        this.logger.error(
          `No se pudo recordar al usuario ${userId} sus ${items.length} deuda(s) pendiente(s): ${(error as Error).message}`,
          (error as Error).stack,
        );
      }
    }

    this.logger.log(
      `Recordatorio de deudas compartidas: ${byUser.size} usuario(s) con deudas pendientes; ` +
        `${notified} avisado(s), ${failed} con error.`,
    );
  }

  /**
   * Envía a un deudor el recordatorio de todas sus deudas pendientes por un único canal: push
   * si tiene alguna suscripción activa, y correo solo como respaldo cuando no tiene ninguna.
   * Es el mismo criterio que usan las alertas de presupuesto.
   *
   * @param userId id del deudor
   * @param items deudas pendientes de declarar
   */
  private async notifyPendingDebts(userId: string, items: SharedDebtReminderItem[]) {
    const total = Number(items.reduce((sum, item) => sum + item.amount, 0).toFixed(2));
    const body =
      items.length === 1
        ? `Tenés una deuda pendiente de $${items[0].amount} con ${items[0].creditor}: ${items[0].title}.`
        : `Tenés ${items.length} deudas compartidas pendientes, por un total de $${total}.`;

    const subscriptions = await this.prisma.push_subscriptions.count({ where: { user_id: userId } });

    if (subscriptions > 0) {
      await this.pushService.sendToUser(userId, {
        title: 'Pfinance — Deudas pendientes',
        body,
        url: GROUPS_FRONTEND_PATH,
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
      subject:
        items.length === 1
          ? 'Pfinance — Tenés una deuda compartida pendiente'
          : `Pfinance — Tenés ${items.length} deudas compartidas pendientes`,
      html: baseEmailTemplate(sharedDebtReminderContent(user.name, items), body),
    });
  }

  /**
   * Avisa a la contraparte de un movimiento del flujo de pago (declaración, confirmación o
   * rechazo), por push si el destinatario tiene alguna suscripción activa y por correo si no.
   *
   * Ninguna notificación puede tumbar la operación: la deuda ya se actualizó cuando se llama a
   * este método, así que cualquier error se loguea y se sigue.
   *
   * @param recipientId usuario que recibe el aviso
   * @param event momento del flujo que lo dispara
   * @param debt datos de la deuda y de la contraparte para armar el mensaje
   * @param groupId grupo de la deuda, para que el click en la push abra su detalle
   */
  private async notifyPaymentEvent(
    recipientId: string,
    event: SharedDebtPaymentEvent,
    debt: SharedDebtPaymentInfo,
    groupId: string,
  ) {
    try {
      const copy = {
        declared: {
          title: 'Pfinance — Pago por confirmar',
          body: `${debt.counterpart} declaró que te pagó $${debt.amount} por "${debt.title}". Confirmá si lo recibiste.`,
          subject: `Pfinance — ${debt.counterpart} declaró un pago por confirmar`,
        },
        confirmed: {
          title: 'Pfinance — Pago confirmado',
          body: `${debt.counterpart} confirmó tu pago de $${debt.amount} por "${debt.title}". La deuda quedó saldada.`,
          subject: 'Pfinance — Tu pago fue confirmado',
        },
        rejected: {
          title: 'Pfinance — Pago no confirmado',
          body: `${debt.counterpart} no registró tu pago de $${debt.amount} por "${debt.title}". La deuda volvió a quedar pendiente.`,
          subject: 'Pfinance — Tu pago no fue confirmado',
        },
      }[event];

      // Un solo canal por aviso: push si el usuario tiene algún dispositivo suscripto, y
      // correo únicamente como respaldo cuando no tiene ninguno.
      const subscriptions = await this.prisma.push_subscriptions.count({
        where: { user_id: recipientId },
      });

      if (subscriptions > 0) {
        await this.pushService.sendToUser(recipientId, {
          title: copy.title,
          body: copy.body,
          url: `${GROUPS_FRONTEND_PATH}/${groupId}`,
        });
        return;
      }

      const user = await this.prisma.users.findUnique({
        where: { id: recipientId },
        select: { email: true, name: true },
      });
      if (!user) return;

      await this.mailService.sendMail({
        to: user.email,
        subject: copy.subject,
        html: baseEmailTemplate(sharedDebtPaymentContent(user.name, event, debt), copy.body),
      });
    } catch (error) {
      this.logger.error(
        `No se pudo notificar al usuario ${recipientId} el evento "${event}" de la deuda "${debt.title}": ${(error as Error).message}`,
        (error as Error).stack,
      );
    }
  }
}
