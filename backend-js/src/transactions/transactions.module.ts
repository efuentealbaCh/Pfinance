import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';

@Module({
  controllers: [TransactionsController],
  providers: [TransactionsService],
  // Se exporta para que RecurringTransactionsModule confirme las cuotas por el mismo camino
  // que una carga manual, en vez de duplicar el ajuste de saldo, el log y las alertas.
  exports: [TransactionsService],
})
export class TransactionsModule {}
