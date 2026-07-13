import { Controller, Get, UseGuards } from '@nestjs/common';
import { AccountTypesService } from './account-types.service';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('account-types')
export class AccountTypesController {
  constructor(private readonly accountTypesService: AccountTypesService) {}

  @Get()
  findAll() {
    return this.accountTypesService.findAll();
  }
}
