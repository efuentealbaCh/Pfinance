import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { CurrencyModule } from '../currency/currency.module';

@Module({
  // Una transferencia entre cuentas de distinta moneda se convierte con la cotizacion de su
  // fecha antes de acreditarse en la cuenta destino.
  imports: [CurrencyModule],
  controllers: [TransactionsController],
  providers: [TransactionsService],
  // Se exporta para que RecurringTransactionsModule confirme las cuotas por el mismo camino
  // que una carga manual, en vez de duplicar el ajuste de saldo, el log y las alertas.
  exports: [TransactionsService],
})
export class TransactionsModule {}
