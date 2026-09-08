import { Module } from '@nestjs/common';
import { ExportController } from './export.controller';
import { ExportService } from './export.service';
import { CurrencyModule } from '../currency/currency.module';

@Module({
  // Los totales del reporte suman cuentas que pueden estar en distinta moneda.
  imports: [CurrencyModule],
  controllers: [ExportController],
  providers: [ExportService]
})
export class ExportModule {}
