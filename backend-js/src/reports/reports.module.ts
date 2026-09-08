import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { DashboardModule } from '../dashboard/dashboard.module';
import { CurrencyModule } from '../currency/currency.module';

@Module({
  // Se importa DashboardModule para reutilizar `DashboardService.getPeriodTotals`: el resumen
  // mensual tiene que dar exactamente los mismos totales que el dashboard para el mismo rango,
  // y con una sola implementación no pueden divergir.
  imports: [DashboardModule, CurrencyModule],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}
