import { Controller, Get, Post, Body, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Post()
  create(@Request() req: any, @Body() data: any) {
    return this.groupsService.create(req.user.id, data);
  }

  @Get('invitations')
  getInvitations(@Request() req: any) {
    return this.groupsService.getInvitations(req.user.id);
  }

  @Get()
  findAll(@Request() req: any) {
    return this.groupsService.findAll(req.user.id);
  }

  @Get(':id')
  findOne(@Request() req: any, @Param('id') id: string) {
    return this.groupsService.findOne(id, req.user.id);
  }

  @Post(':id/invite')
  invite(@Request() req: any, @Param('id') id: string, @Body('email') email: string) {
    return this.groupsService.inviteUser(id, email, req.user.id);
  }

  @Post(':id/accept')
  accept(@Request() req: any, @Param('id') id: string) {
    return this.groupsService.acceptInvitation(id, req.user.id);
  }

  @Post(':id/reject')
  reject(@Request() req: any, @Param('id') id: string) {
    return this.groupsService.rejectInvitation(id, req.user.id);
  }

  @Delete(':id/members/:userId')
  removeMember(@Request() req: any, @Param('id') id: string, @Param('userId') userId: string) {
    return this.groupsService.removeMember(id, BigInt(userId), req.user.id);
  }
}
