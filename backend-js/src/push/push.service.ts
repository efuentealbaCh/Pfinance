import { Injectable, InternalServerErrorException, Logger, OnModuleInit } from '@nestjs/common';
import * as webpush from 'web-push';
import { randomUUID } from 'crypto';
import { PrismaService } from '../prisma/prisma.service';
import { PushSubscribeDto } from './dto/push-subscribe.dto';

export interface PushPayload {
  title: string;
  body: string;
  /** URL que abre el service worker al hacer click en la notificación. Default: '/'. */
  url?: string;
}

export interface PushSendSummary {
  /** Notificaciones aceptadas por el push service. */
  sent: number;
  /** Envíos fallidos por un error recuperable (red, 5xx del push service). */
  failed: number;
  /** Suscripciones expiradas/revocadas (404/410) que se borraron de la BD. */
  removed: number;
}

/** Icono por defecto de la notificación; tiene que existir en el `public/` del PWA. */
const DEFAULT_ICON = '/pwa-192x192.png';

/**
 * El browser no manda el content encoding dentro del objeto PushSubscription, así que se
 * persiste el que usa web-push por defecto (RFC 8188) para dejar constancia de con cuál
 * se cifró el envío.
 */
const CONTENT_ENCODING = 'aes128gcm';

/**
 * Servicio genérico de envío de notificaciones Web Push, equivalente al MailService.
 * Se configura 100% por variables de entorno (VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY,
 * VAPID_SUBJECT), para poder rotar el par de claves sin tocar código.
 */
@Injectable()
export class PushService implements OnModuleInit {
  private readonly logger = new Logger(PushService.name);
  private publicKey: string | null = null;
  private configured = false;

  constructor(private prisma: PrismaService) {}

  onModuleInit() {
    const { VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY, VAPID_SUBJECT } = process.env;

    if (!VAPID_PUBLIC_KEY || !VAPID_PRIVATE_KEY || !VAPID_SUBJECT) {
      this.logger.warn(
        'PushService: variables de entorno de Web Push incompletas (VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY, VAPID_SUBJECT). ' +
          'El envío de notificaciones push quedará deshabilitado hasta que se configuren.',
      );
      return;
    }

    try {
      // setVapidDetails valida el formato del subject y de ambas claves, y tira si algo no
      // cuadra. Se atrapa acá para no voltear el arranque de la app por una mala configuración.
      webpush.setVapidDetails(VAPID_SUBJECT, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY);
      this.publicKey = VAPID_PUBLIC_KEY;
      this.configured = true;
      this.logger.log('PushService: claves VAPID cargadas, envío de notificaciones push habilitado.');
    } catch (error) {
      this.logger.error(
        `PushService: las claves VAPID configuradas son inválidas (${(error as Error).message}). ` +
          'El envío de notificaciones push queda deshabilitado.',
        (error as Error).stack,
      );
    }
  }

  /**
   * Devuelve la clave pública VAPID que el PWA necesita para suscribirse.
   * @returns la clave pública en base64 URL-safe
   * @throws InternalServerErrorException si el servicio no está configurado
   */
  getPublicKey(): string {
    if (!this.configured || !this.publicKey) {
      this.logger.error('Se pidió la clave pública VAPID pero PushService no está configurado (faltan variables de entorno).');
      throw new InternalServerErrorException('El servicio de notificaciones push no está configurado');
    }
    return this.publicKey;
  }

  /**
   * Registra (o actualiza) la suscripción push de un browser para un usuario.
   * El upsert va por `endpoint`, que es único: si el mismo browser se vuelve a suscribir
   * no se duplica la fila, y si ese endpoint estaba asociado a otro usuario (dos cuentas
   * en el mismo browser) queda reasignado al usuario actual.
   * @param userId id del usuario autenticado
   * @param dto objeto PushSubscription serializado por el browser
   * @returns mensaje de confirmación
   */
  async subscribe(userId: string, dto: PushSubscribeDto) {
    const now = new Date();

    await this.prisma.push_subscriptions.upsert({
      where: { endpoint: dto.endpoint },
      update: {
        user_id: userId,
        public_key: dto.keys.p256dh,
        auth_token: dto.keys.auth,
        content_encoding: CONTENT_ENCODING,
        updated_at: now,
      },
      create: {
        id: randomUUID(),
        user_id: userId,
        endpoint: dto.endpoint,
        public_key: dto.keys.p256dh,
        auth_token: dto.keys.auth,
        content_encoding: CONTENT_ENCODING,
        created_at: now,
        updated_at: now,
      },
    });

    return { message: 'Suscripción push registrada exitosamente.' };
  }

  /**
   * Da de baja la suscripción de un browser.
   *
   * El borrado se filtra por `user_id` además del endpoint: aunque el endpoint sea único y
   * difícil de adivinar, sin ese filtro cualquier usuario autenticado podría desactivarle las
   * notificaciones a otro con solo conocerlo.
   *
   * Es idempotente a propósito: si no había fila que borrar (el browser ya se había dado de
   * baja, o la suscripción venció y se limpió sola en un envío anterior) responde igual, sin
   * error. Para el usuario el resultado es el mismo — no le llegan notificaciones —, y un 404
   * acá solo lograría mostrar un error por algo que ya está como se pidió.
   *
   * @param userId id del usuario autenticado
   * @param endpoint endpoint del PushSubscription que se da de baja
   * @returns mensaje de confirmación
   */
  async unsubscribe(userId: string, endpoint: string) {
    const { count } = await this.prisma.push_subscriptions.deleteMany({
      where: { endpoint, user_id: userId },
    });

    this.logger.log(
      count > 0
        ? `Suscripción push dada de baja por el usuario ${userId}: ${endpoint}`
        : `El usuario ${userId} pidió dar de baja un endpoint que ya no estaba registrado: ${endpoint}`,
    );

    return { message: 'Suscripción push dada de baja.' };
  }

  /**
   * Envía una notificación a todas las suscripciones activas de un usuario.
   * Las suscripciones que el browser dio de baja (404/410) se borran de la BD en el
   * momento, para no acumular endpoints muertos ni reintentar contra ellos para siempre.
   * @param userId id del usuario destinatario
   * @param payload título, cuerpo y URL opcional de la notificación
   * @returns resumen de enviadas / fallidas / eliminadas
   * @throws InternalServerErrorException si el servicio no está configurado, o si ningún
   *         envío prosperó habiendo fallas recuperables
   */
  async sendToUser(userId: string, payload: PushPayload): Promise<PushSendSummary> {
    if (!this.configured) {
      this.logger.error(
        `No se pudo notificar al usuario ${userId}: PushService no está configurado (faltan las claves VAPID).`,
      );
      throw new InternalServerErrorException('El servicio de notificaciones push no está configurado');
    }

    const subscriptions = await this.prisma.push_subscriptions.findMany({
      where: { user_id: userId },
    });

    if (subscriptions.length === 0) {
      this.logger.log(`El usuario ${userId} no tiene suscripciones push registradas; no hay nada que enviar.`);
      return { sent: 0, failed: 0, removed: 0 };
    }

    // La forma del payload la fija el service worker (frontend/public/push-sw.js):
    // lee data.title, data.body, data.icon y data.data.url. No cambiar sin tocarlo.
    const notification = JSON.stringify({
      title: payload.title,
      body: payload.body,
      icon: DEFAULT_ICON,
      data: { url: payload.url ?? '/' },
    });

    const summary: PushSendSummary = { sent: 0, failed: 0, removed: 0 };

    for (const subscription of subscriptions) {
      try {
        await webpush.sendNotification(
          {
            endpoint: subscription.endpoint,
            keys: {
              p256dh: subscription.public_key ?? '',
              auth: subscription.auth_token ?? '',
            },
          },
          notification,
        );
        summary.sent++;
      } catch (error) {
        const statusCode = error instanceof webpush.WebPushError ? error.statusCode : null;

        // 404 (Not Found) y 410 (Gone) significan que el browser revocó o dejó expirar la
        // suscripción: nunca va a volver a funcionar, así que se borra la fila. Es el
        // manejo estándar recomendado por la spec de Web Push.
        if (statusCode === 404 || statusCode === 410) {
          await this.deleteSubscription(subscription.id, subscription.endpoint);
          summary.removed++;
          continue;
        }

        summary.failed++;
        this.logger.error(
          `Error al enviar notificación push al endpoint ${subscription.endpoint} (usuario ${userId}` +
            (statusCode ? `, status ${statusCode}` : '') +
            `): ${(error as Error).message}`,
          (error as Error).stack,
        );
      }
    }

    // Si hubo fallas recuperables y ninguna notificación salió, se propaga el error en vez de
    // tragarlo. Un envío parcialmente exitoso (o suscripciones vencidas ya limpiadas) no se
    // considera falla: es el estado esperable de un pool de suscripciones de varios dispositivos.
    if (summary.sent === 0 && summary.failed > 0) {
      throw new InternalServerErrorException('No se pudo enviar la notificación push');
    }

    this.logger.log(
      `Notificación push para el usuario ${userId}: ${summary.sent} enviada(s), ` +
        `${summary.failed} fallida(s), ${summary.removed} suscripción(es) expirada(s) eliminada(s).`,
    );
    return summary;
  }

  /**
   * Borra una suscripción muerta. Se aísla el error para que un problema al limpiar no
   * interrumpa el envío al resto de los dispositivos del usuario.
   * @param id id de la fila en push_subscriptions
   * @param endpoint endpoint asociado, solo para el log
   */
  private async deleteSubscription(id: string, endpoint: string) {
    try {
      await this.prisma.push_subscriptions.delete({ where: { id } });
      this.logger.warn(`Suscripción push expirada o revocada, eliminada de la BD: ${endpoint}`);
    } catch (error) {
      this.logger.error(
        `No se pudo eliminar la suscripción push expirada ${endpoint}: ${(error as Error).message}`,
        (error as Error).stack,
      );
    }
  }
}
