import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { BanksService } from './banks.service';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('banks')
export class BanksController {
  constructor(private readonly banksService: BanksService) {}

  @Get()
  findAll() {
    return this.banksService.findAll();
  }

  @Get(':id/account-types')
  findAccountTypes(@Param('id') id: string) {
    return this.banksService.findAccountTypesByBankId(id);
  }
}
