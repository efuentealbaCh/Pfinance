import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { SavingsGoalsService } from './savings-goals.service';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('savings-goals')
export class SavingsGoalsController {
  constructor(private readonly savingsGoalsService: SavingsGoalsService) {}

  @Post()
  create(@Request() req: any, @Body() data: any) {
    return this.savingsGoalsService.create(req.user.id, data);
  }

  @Get()
  findAll(@Request() req: any) {
    return this.savingsGoalsService.findAll(req.user.id);
  }

  @Get(':id')
  findOne(@Request() req: any, @Param('id') id: string) {
    return this.savingsGoalsService.findOne(id, req.user.id);
  }

  @Put(':id')
  update(@Request() req: any, @Param('id') id: string, @Body() data: any) {
    return this.savingsGoalsService.update(id, req.user.id, data);
  }

  @Delete(':id')
  remove(@Request() req: any, @Param('id') id: string) {
    return this.savingsGoalsService.remove(id, req.user.id);
  }

  @Post(':id/deposit')
  deposit(@Request() req: any, @Param('id') id: string, @Body('amount') amount: number) {
    return this.savingsGoalsService.deposit(id, req.user.id, amount);
  }

  @Post(':id/withdraw')
  withdraw(@Request() req: any, @Param('id') id: string, @Body('amount') amount: number) {
    return this.savingsGoalsService.withdraw(id, req.user.id, amount);
  }
}
