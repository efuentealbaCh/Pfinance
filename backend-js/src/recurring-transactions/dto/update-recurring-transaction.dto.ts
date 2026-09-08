import { PartialType } from '@nestjs/mapped-types';
import { CreateRecurringTransactionDto } from './create-recurring-transaction.dto';

/**
 * Todos los campos son opcionales: el PUT actualiza solo lo que venga en el body.
 * `installments_generated`, `next_run_date` y `active` no se editan por acá a propósito —
 * son estado derivado del avance de las cuotas (`confirm` / `skip` / `toggle`).
 */
export class UpdateRecurringTransactionDto extends PartialType(CreateRecurringTransactionDto) {}
