import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

/**
 * Modelos que NUNCA se replican al entorno remoto, aunque `SYNC_TO_REMOTE` esté activo.
 *
 * Son tablas cuyo contenido solo tiene sentido dentro del entorno donde se generó. Replicarlas
 * no solo es inútil: en varios casos es activamente dañino.
 *
 * - `security_logs`: es el historial de auditoría del entorno. Replicarlo ensucia el historial
 *   real de producción y, peor, hace que la IP/dispositivo de desarrollo cuente como "contexto
 *   conocido" allá — con lo cual un acceso indebido desde ese mismo contexto ya no dispararía
 *   el aviso de login nuevo. Debilita justamente la protección que la tabla habilita.
 * - `email_verification_tokens` / `password_reset_tokens`: los tokens apuntan al `FRONTEND_URL`
 *   del entorno que los generó (en desarrollo, `localhost`), así que en producción no sirven
 *   para nada, y solo esparcen hashes de tokens de un entorno a otro.
 * - `push_subscriptions`: cada suscripción está atada al par de claves VAPID del entorno que la
 *   registró. Una suscripción creada en local es inservible en producción, que tiene otras claves.
 */
const MODELS_EXCLUDED_FROM_SYNC = new Set([
  'security_logs',
  'email_verification_tokens',
  'password_reset_tokens',
  'push_subscriptions',
]);

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);

  async onModuleInit() {
    await this.$connect();

    // Prisma Middleware para interceptar mutaciones (create, update, delete)
    this.$use(async (params, next) => {
      const result = await next(params);

      const isMutation = ['create', 'update', 'delete', 'upsert', 'createMany', 'updateMany', 'deleteMany'].includes(params.action);
      const isSyncable = !!params.model && !MODELS_EXCLUDED_FROM_SYNC.has(params.model);

      if (isMutation && isSyncable && process.env.SYNC_TO_REMOTE === 'true') {
         // Disparamos la sincronización en background sin bloquear la respuesta
         this.sendWebhook(params).catch(err => {
           this.logger.error(`Error de sincronización webhook: ${err.message}`);
         });
      }

      return result;
    });
  }

  private async sendWebhook(params: any) {
    const url = process.env.PROD_API_URL + '/webhook/sync';
    const secret = process.env.WEBHOOK_SECRET;
    
    if (!process.env.PROD_API_URL || !secret) {
      this.logger.warn('Faltan variables PROD_API_URL o WEBHOOK_SECRET para sincronizar');
      return;
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-webhook-secret': secret
        },
        body: JSON.stringify({
          model: params.model,
          action: params.action,
          args: params.args
        })
      });

      if (!response.ok) {
        this.logger.error(`Webhook falló con estado ${response.status}: ${await response.text()}`);
      } else {
        this.logger.log(`🔄 Webhook de sincronización enviado exitosamente para ${params.model}.${params.action}`);
      }
    } catch (e: any) {
      this.logger.error(`Error enviando webhook: ${e.message}`);
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
