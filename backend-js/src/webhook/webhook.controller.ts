import { Controller, Post, Body, Headers, UnauthorizedException, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Controller('webhook')
export class WebhookController {
  private readonly logger = new Logger(WebhookController.name);

  constructor(private readonly prisma: PrismaService) {}

  @Post('sync')
  async handleSync(
    @Headers('x-webhook-secret') secret: string,
    @Body() payload: { model: string; action: string; args: any }
  ) {
    if (secret !== process.env.WEBHOOK_SECRET) {
      throw new UnauthorizedException('Invalid webhook secret');
    }

    try {
      const { model, action, args } = payload;
      
      // Validar que el modelo y acción existan en Prisma
      if (!this.prisma[model as keyof PrismaService] || typeof (this.prisma[model as keyof PrismaService] as any)[action] !== 'function') {
        this.logger.warn(`Modelo o acción no soportada recibida: ${model}.${action}`);
        return { success: false, message: 'Modelo o acción inválida' };
      }

      // Ejecutamos la acción local en la base de datos de producción
      const result = await (this.prisma[model as keyof PrismaService] as any)[action](args);
      
      this.logger.log(`✅ Sync ejecutado en servidor: ${model}.${action}`);
      return { success: true, result };
    } catch (e: any) {
      this.logger.error(`Error procesando webhook de sincronización: ${e.message}`);
      return { success: false, error: e.message };
    }
  }
}
