import { Controller, Get, Query, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ReportsService } from './reports.service';
import { MonthlySummaryQueryDto } from './dto/monthly-summary-query.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  /**
   * Resumen mensual del usuario autenticado: totales, comparación con el mes anterior y
   * gastos por categoría.
   *
   * Es el disparador de respaldo del resumen por correo: en Render gratuito el servicio se
   * duerme y el cron del día 1 puede no ejecutarse nunca, así que el usuario tiene que poder
   * pedir el resumen igual desde la app.
   *
   * El id sale siempre del token (`req.user.id`), nunca de la query: un usuario no puede pedir
   * el resumen de otro.
   *
   * @param query `month` opcional en formato `YYYY-MM`; por defecto, el mes anterior
   */
  @Get('monthly-summary')
  monthlySummary(@Request() req: any, @Query() query: MonthlySummaryQueryDto) {
    return this.reportsService.getMonthlySummary(req.user.id, query.month);
  }
}
