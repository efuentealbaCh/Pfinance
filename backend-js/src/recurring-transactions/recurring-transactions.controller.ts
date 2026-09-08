import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Ip,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RecurringTransactionsService } from './recurring-transactions.service';
import { CreateRecurringTransactionDto } from './dto/create-recurring-transaction.dto';
import { UpdateRecurringTransactionDto } from './dto/update-recurring-transaction.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('recurring-transactions')
export class RecurringTransactionsController {
  constructor(private readonly recurringTransactionsService: RecurringTransactionsService) {}

  @Post()
  create(@Request() req: any, @Body() dto: CreateRecurringTransactionDto) {
    return this.recurringTransactionsService.create(req.user.id, dto);
  }

  @Get()
  findAll(@Request() req: any) {
    return this.recurringTransactionsService.findAll(req.user.id);
  }

  /**
   * Va antes que cualquier ruta con parámetro: si se declarara después, `/pending` entraría
   * por el handler de `:id` y respondería 400 por el ParseUUIDPipe.
   */
  @Get('pending')
  findPending(@Request() req: any) {
    return this.recurringTransactionsService.findPending(req.user.id);
  }

  @Put(':id')
  update(
    @Request() req: any,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateRecurringTransactionDto,
  ) {
    return this.recurringTransactionsService.update(id, req.user.id, dto);
  }

  @Delete(':id')
  remove(@Request() req: any, @Param('id', ParseUUIDPipe) id: string) {
    return this.recurringTransactionsService.remove(id, req.user.id);
  }

  @Patch(':id/toggle')
  toggle(@Request() req: any, @Param('id', ParseUUIDPipe) id: string) {
    return this.recurringTransactionsService.toggle(id, req.user.id);
  }

  @Post(':id/confirm')
  confirm(
    @Request() req: any,
    @Param('id', ParseUUIDPipe) id: string,
    @Ip() ip: string,
    @Headers('user-agent') userAgent: string,
  ) {
    return this.recurringTransactionsService.confirm(id, req.user.id, { ip, userAgent });
  }

  @Post(':id/skip')
  skip(@Request() req: any, @Param('id', ParseUUIDPipe) id: string) {
    return this.recurringTransactionsService.skip(id, req.user.id);
  }
}
