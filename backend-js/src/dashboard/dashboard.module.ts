import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { CurrencyModule } from '../currency/currency.module';

@Module({
  // Los totales del dashboard suman cuentas que pueden estar en distinta moneda, asi que
  // necesitan el servicio de cotizaciones para convertirlas a la moneda base del usuario.
  imports: [CurrencyModule],
  controllers: [DashboardController],
  providers: [DashboardService],
  // Se exporta para que ReportsModule reutilice la agregación de totales del dashboard
  // en el resumen mensual, en vez de duplicarla.
  exports: [DashboardService],
})
export class DashboardModule {}
