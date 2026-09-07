import { Type } from 'class-transformer';
import {
  IsDefined,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  ValidateNested,
} from 'class-validator';

/**
 * Claves de cifrado que el browser entrega dentro del objeto PushSubscription.
 * Los largos máximos acompañan a las columnas `public_key` / `auth_token`
 * (VARCHAR(255)) para rechazar el valor con un 400 antes de que reviente el insert.
 */
export class PushSubscriptionKeysDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  p256dh: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  auth: string;
}

/**
 * Forma exacta del objeto PushSubscription serializado por el browser
 * (`JSON.stringify(subscription)`), que el frontend manda tal cual, sin envolver:
 *
 *   { "endpoint": "https://...", "expirationTime": null, "keys": { "p256dh": "...", "auth": "..." } }
 *
 * Ojo: el ValidationPipe global corre con `forbidNonWhitelisted: true`, así que
 * `expirationTime` tiene que estar declarado aunque no lo usemos — si no, todo
 * request legítimo del browser se rechazaría con 400 por propiedad no permitida.
 */
export class PushSubscribeDto {
  // require_tld: false para no rechazar endpoints de entornos de prueba;
  // el largo máximo acompaña a la columna `endpoint` (VARCHAR(500)).
  @IsUrl({ protocols: ['https'], require_protocol: true, require_tld: false })
  @MaxLength(500)
  endpoint: string;

  // Casi siempre viene `null` (@IsOptional también deja pasar null); Chrome puede
  // mandar un timestamp en ms. No se persiste: no aporta nada al envío.
  @IsOptional()
  @IsInt()
  expirationTime?: number | null;

  @IsDefined()
  @ValidateNested()
  @Type(() => PushSubscriptionKeysDto)
  keys: PushSubscriptionKeysDto;
}
