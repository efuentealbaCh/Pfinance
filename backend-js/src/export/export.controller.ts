import { Controller, Get, UseGuards, Request, Query, Res } from '@nestjs/common';
import { ExportService } from './export.service';
import { AuthGuard } from '@nestjs/passport';
import type { Response } from 'express';

@UseGuards(AuthGuard('jwt'))
@Controller('export')
export class ExportController {
  constructor(private readonly exportService: ExportService) {}

  @Get('transactions')
  exportTransactions(@Request() req: any, @Query() filters: any, @Res() res: Response) {
    return this.exportService.exportTransactions(req.user.id, filters, res);
  }
}
