import { IsOptional, IsString, Matches } from 'class-validator';
import { MONTH_KEY_PATTERN } from '../../common/monthly-period.util';

export class MonthlySummaryQueryDto {
  /**
   * Mes a consultar en formato `YYYY-MM`. Si no viene, el resumen es el del mes anterior
   * (el mismo que manda el job del día 1).
   */
  @IsOptional()
  @IsString()
  @Matches(MONTH_KEY_PATTERN, { message: 'month debe tener el formato YYYY-MM (ej. 2026-08)' })
  month?: string;
}
