import { Controller, Post, Body, Param, UseGuards, Request, Put } from '@nestjs/common';
import { SharedDebtsService } from './shared-debts.service';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller()
export class SharedDebtsController {
  constructor(private readonly sharedDebtsService: SharedDebtsService) {}

  @Post('groups/:groupId/debts')
  create(@Request() req: any, @Param('groupId') groupId: string, @Body() data: any) {
    return this.sharedDebtsService.create(groupId, req.user.id, data);
  }

  @Put('debts/:debtId/pay')
  pay(@Request() req: any, @Param('debtId') debtId: string) {
    return this.sharedDebtsService.pay(debtId, req.user.id);
  }
}
