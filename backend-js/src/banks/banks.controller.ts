import { Controller, Get, UseGuards } from '@nestjs/common';
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
}
