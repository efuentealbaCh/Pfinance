import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';

@Module({
  controllers: [DashboardController],
  providers: [DashboardService],
  // Se exporta para que ReportsModule reutilice la agregación de totales del dashboard
  // en el resumen mensual, en vez de duplicarla.
  exports: [DashboardService],
})
export class DashboardModule {}
