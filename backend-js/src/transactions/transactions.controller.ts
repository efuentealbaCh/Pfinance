import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, Request, Query, Ip, Headers } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  create(@Request() req: any, @Body() data: any, @Ip() ip: string, @Headers('user-agent') userAgent: string) {
    return this.transactionsService.create(req.user.id, data, { ip, userAgent });
  }

  @Get()
  findAll(@Request() req: any, @Query() filters: any) {
    return this.transactionsService.findAll(req.user.id, filters);
  }

  @Get(':id')
  findOne(@Request() req: any, @Param('id') id: string) {
    return this.transactionsService.findOne(id, req.user.id);
  }

  @Put(':id')
  update(@Request() req: any, @Param('id') id: string, @Body() data: any, @Ip() ip: string, @Headers('user-agent') userAgent: string) {
    return this.transactionsService.update(id, req.user.id, data, { ip, userAgent });
  }

  @Delete(':id')
  remove(@Request() req: any, @Param('id') id: string, @Ip() ip: string, @Headers('user-agent') userAgent: string) {
    return this.transactionsService.remove(id, req.user.id, { ip, userAgent });
  }
}
