import { Module } from '@nestjs/common';
import { SharedDebtsService } from './shared-debts.service';
import { SharedDebtsController } from './shared-debts.controller';

@Module({
  controllers: [SharedDebtsController],
  providers: [SharedDebtsService],
})
export class SharedDebtsModule {}
