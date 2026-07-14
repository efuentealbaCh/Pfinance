import { PartialType } from '@nestjs/mapped-types';
import { CreateSharedDebtDto } from './create-shared-debt.dto';

export class UpdateSharedDebtDto extends PartialType(CreateSharedDebtDto) {}
