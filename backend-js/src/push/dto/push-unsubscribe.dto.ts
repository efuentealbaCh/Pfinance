import { IsUrl, MaxLength } from 'class-validator';

/**
 * Baja de una suscripción push.
 *
 * Solo lleva el endpoint porque es la clave única de `push_subscriptions`: identifica al
 * browser concreto que se está dando de baja, sin tocar las suscripciones que el mismo
 * usuario tenga en otros dispositivos.
 */
export class PushUnsubscribeDto {
  @IsUrl({ protocols: ['https'], require_protocol: true, require_tld: false })
  @MaxLength(500)
  endpoint: string;
}
