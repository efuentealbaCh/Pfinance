import {
  IsIn,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
  Matches,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import { RECURRENCE_FREQUENCIES } from '../../common/recurrence.util';

/** Tipos de movimiento que puede generar una recurrencia. Las transferencias quedan afuera:
 *  necesitarían una cuenta destino, que el modelo no guarda. */
export const RECURRENCE_TYPES = ['income', 'expense'] as const;

/** Tope de cuotas de un crédito de consumo. 600 = 50 años; sirve para descartar tipeos. */
const MAX_INSTALLMENTS = 600;

/** Tope del monto, alineado con `Decimal(15, 2)` de la columna. */
const MAX_AMOUNT = 9999999999999.99;

export class CreateRecurringTransactionDto {
  @IsUUID()
  user_account_id: string;

  @IsOptional()
  @IsUUID()
  category_id?: string;

  @IsIn(RECURRENCE_TYPES as unknown as string[])
  type: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  @Max(MAX_AMOUNT)
  amount: number;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  description?: string;

  @IsIn(RECURRENCE_FREQUENCIES as unknown as string[])
  frequency: string;

  /** Fecha de la primera cuota, en `YYYY-MM-DD`. Se valida el formato exacto y no con
   *  `IsDateString` porque este campo es una fecha pura: aceptar un ISO con hora y huso
   *  abriría la puerta a que la cuota termine corrida un día. */
  @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'start_date debe tener el formato YYYY-MM-DD' })
  start_date: string;

  /** Cantidad total de cuotas. `null` / ausente = recurrencia indefinida (una suscripción). */
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(MAX_INSTALLMENTS)
  installments_total?: number;
}
