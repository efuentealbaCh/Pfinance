import { Module } from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { CurrencyController } from './currency.controller';

/**
 * Cotizaciones y conversión entre monedas. Se exporta el servicio porque lo consumen todos los
 * módulos que agregan montos de cuentas en distinta moneda (dashboard, reportes, transacciones).
 */
@Module({
  controllers: [CurrencyController],
  providers: [CurrencyService],
  exports: [CurrencyService],
})
export class CurrencyModule {}
