import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PushService } from './push.service';
import { PushSubscribeDto } from './dto/push-subscribe.dto';
import { PushUnsubscribeDto } from './dto/push-unsubscribe.dto';

/**
 * Endpoints de Web Push. Van sin prefijo en el @Controller porque main.ts ya aplica el
 * prefijo global 'api', quedando en /api/vapid-public-key y /api/push-subscribe — las
 * rutas exactas que el PWA ya consume (frontend/src/api/queries.ts).
 */
@Controller()
export class PushController {
  constructor(private readonly pushService: PushService) {}

  /**
   * Clave pública VAPID. Es público a propósito: el browser la necesita para poder
   * suscribirse, o sea antes de que exista una suscripción que proteger.
   */
  @Get('vapid-public-key')
  getVapidPublicKey() {
    return { key: this.pushService.getPublicKey() };
  }

  /** Registra la suscripción del browser para el usuario autenticado. */
  @UseGuards(AuthGuard('jwt'))
  @Post('push-subscribe')
  subscribe(@Request() req: any, @Body() dto: PushSubscribeDto) {
    return this.pushService.subscribe(req.user.id, dto);
  }

  /**
   * Da de baja la suscripción de este browser.
   *
   * Hasta ahora una suscripción solo se borraba cuando el servicio de push respondía 404/410
   * al enviar, o sea nunca por decisión del usuario: sin esta ruta no hay forma de apagar las
   * notificaciones desde la app.
   *
   * Va como POST y no como DELETE porque el dato que identifica la suscripción es el endpoint
   * (una URL larga), que no entra en un parámetro de ruta y obligaría a mandar cuerpo en un
   * DELETE — algo que varios proxies descartan en el camino.
   */
  @UseGuards(AuthGuard('jwt'))
  @Post('push-unsubscribe')
  unsubscribe(@Request() req: any, @Body() dto: PushUnsubscribeDto) {
    return this.pushService.unsubscribe(req.user.id, dto.endpoint);
  }
}
