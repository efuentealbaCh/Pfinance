import { IsOptional, IsString, MaxLength } from 'class-validator';

/**
 * Body opcional del rechazo de un pago declarado.
 *
 * El motivo no se persiste: solo viaja en la notificación al deudor, para que sepa por qué su
 * declaración volvió a pendiente sin tener que preguntar por fuera de la app. Guardarlo pediría
 * una columna más y un historial de rechazos que hoy nadie consume.
 */
export class RejectDebtPaymentDto {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  reason?: string;
}
