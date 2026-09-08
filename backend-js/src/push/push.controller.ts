import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PushService } from './push.service';
import { PushSubscribeDto } from './dto/push-subscribe.dto';

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
}
