import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);

  async onModuleInit() {
    await this.$connect();

    // Prisma Middleware para interceptar mutaciones (create, update, delete)
    this.$use(async (params, next) => {
      const result = await next(params);
      
      const isMutation = ['create', 'update', 'delete', 'upsert', 'createMany', 'updateMany', 'deleteMany'].includes(params.action);
      
      if (isMutation && process.env.SYNC_TO_REMOTE === 'true') {
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
