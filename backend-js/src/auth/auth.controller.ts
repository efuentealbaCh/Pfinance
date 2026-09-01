import { Controller, Post, Body, Get, Query, UseGuards, Request, Put } from '@nestjs/common';
import { Throttle, minutes, hours } from '@nestjs/throttler';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // 5 registros por hora por IP — evita spam de registros masivos.
  @Throttle({ default: { limit: 5, ttl: hours(1) } })
  @Post('register')
  register(@Body() body: RegisterDto) {
    return this.authService.register(body);
  }

  // 5 intentos por minuto por IP — protección contra fuerza bruta.
  @Throttle({ default: { limit: 5, ttl: minutes(1) } })
  @Post('login')
  login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }

  @Get('verify-email')
  verifyEmail(@Query() query: VerifyEmailDto) {
    return this.authService.verifyEmail(query.token);
  }

  // 5 por hora por IP, además del cooldown de 60s por usuario que ya aplica el servicio.
  @Throttle({ default: { limit: 5, ttl: hours(1) } })
  @UseGuards(AuthGuard('jwt'))
  @Post('resend-verification')
  resendVerification(@Request() req: any) {
    return this.authService.resendVerification(req.user.id);
  }

  // 3 por hora por IP — capa adicional al mensaje genérico que ya evita filtrar emails registrados.
  @Throttle({ default: { limit: 3, ttl: hours(1) } })
  @Post('forgot-password')
  forgotPassword(@Body() body: ForgotPasswordDto) {
    return this.authService.forgotPassword(body);
  }

  @Post('reset-password')
  resetPassword(@Body() body: ResetPasswordDto) {
    return this.authService.resetPassword(body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getProfile(@Request() req: any) {
    const user = req.user;
    return {
      user: {
        ...user,
        id: user.id,
        email_verified: !!user.email_verified_at,
      }
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('profile')
  updateProfile(@Request() req: any, @Body() body: UpdateProfileDto) {
    return this.authService.updateProfile(req.user.id, body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('profile/password')
  updatePassword(@Request() req: any, @Body() body: UpdatePasswordDto) {
    return this.authService.updatePassword(req.user.id, body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('logout')
  logout() {
    return { message: 'Sesión cerrada correctamente' };
  }
}
