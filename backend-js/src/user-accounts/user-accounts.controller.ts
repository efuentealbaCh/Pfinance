import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { UserAccountsService } from './user-accounts.service';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('user-accounts')
export class UserAccountsController {
  constructor(private readonly userAccountsService: UserAccountsService) {}

  @Post()
  create(@Request() req: any, @Body() data: any) {
    return this.userAccountsService.create(req.user.id, data);
  }

  @Get()
  findAll(@Request() req: any) {
    return this.userAccountsService.findAll(req.user.id);
  }

  @Get(':id')
  findOne(@Request() req: any, @Param('id') id: string) {
    return this.userAccountsService.findOne(id, req.user.id);
  }

  @Put(':id')
  update(@Request() req: any, @Param('id') id: string, @Body() data: any) {
    return this.userAccountsService.update(id, req.user.id, data);
  }

  @Delete(':id')
  remove(@Request() req: any, @Param('id') id: string) {
    return this.userAccountsService.remove(id, req.user.id);
  }
}
