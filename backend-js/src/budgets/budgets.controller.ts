import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { BudgetsService } from './budgets.service';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('budgets')
export class BudgetsController {
  constructor(private readonly budgetsService: BudgetsService) {}

  @Post()
  create(@Request() req: any, @Body() data: any) {
    return this.budgetsService.create(req.user.id, data);
  }

  @Get()
  findAll(@Request() req: any) {
    return this.budgetsService.findAll(req.user.id);
  }

  @Get(':id')
  findOne(@Request() req: any, @Param('id') id: string) {
    return this.budgetsService.findOne(id, req.user.id);
  }

  @Put(':id')
  update(@Request() req: any, @Param('id') id: string, @Body() data: any) {
    return this.budgetsService.update(id, req.user.id, data);
  }

  @Delete(':id')
  remove(@Request() req: any, @Param('id') id: string) {
    return this.budgetsService.remove(id, req.user.id);
  }
}
