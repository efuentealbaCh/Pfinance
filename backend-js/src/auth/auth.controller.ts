import { Controller, Post, Body, Get, UseGuards, Request, Put } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() body: any) {
    return this.authService.register(body);
  }

  @Post('login')
  login(@Body() body: any) {
    return this.authService.login(body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getProfile(@Request() req: any) {
    const user = req.user;
    return {
      user: {
        ...user,
        id: user.id.toString(),
      }
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('profile')
  updateProfile(@Request() req: any, @Body() body: any) {
    return this.authService.updateProfile(req.user.id, body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('profile/password')
  updatePassword(@Request() req: any, @Body() body: any) {
    return this.authService.updatePassword(req.user.id, body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('logout')
  logout() {
    return { message: 'Sesión cerrada correctamente' };
  }
}
