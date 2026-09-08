import { Module } from '@nestjs/common';
import { RecurringTransactionsService } from './recurring-transactions.service';
import { RecurringTransactionsController } from './recurring-transactions.controller';
import { TransactionsModule } from '../transactions/transactions.module';

@Module({
  // Se importa TransactionsModule para reutilizar `TransactionsService.create` al confirmar
  // una cuota: es el mismo camino que una carga manual, así que ajusta el saldo de la cuenta,
  // deja el registro en `transaction_logs` y dispara las alertas de presupuesto sin duplicar
  // nada de esa lógica acá.
  imports: [TransactionsModule],
  controllers: [RecurringTransactionsController],
  providers: [RecurringTransactionsService],
})
export class RecurringTransactionsModule {}
