import { Controller, Post, Body, Get, Query, UseGuards, Request, Put, Ip, Headers } from '@nestjs/common';
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
import { Confirm2faDto } from './dto/confirm-2fa.dto';
import { Disable2faDto } from './dto/disable-2fa.dto';

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
  login(@Body() body: LoginDto, @Ip() ip: string, @Headers('user-agent') userAgent?: string) {
    return this.authService.login(body, { ip, userAgent });
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
  resetPassword(@Body() body: ResetPasswordDto, @Ip() ip: string, @Headers('user-agent') userAgent?: string) {
    return this.authService.resetPassword(body, { ip, userAgent });
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getProfile(@Request() req: any) {
    // totp_secret no se expone nunca, aunque esté encriptado: es el secreto que permite
    // generar códigos TOTP válidos, no hay motivo para devolverlo al cliente.
    const { totp_secret, ...user } = req.user;
    return {
      user: {
        ...user,
        id: user.id,
        email_verified: !!user.email_verified_at,
        totp_enabled: !!user.totp_enabled,
      }
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('profile')
  updateProfile(@Request() req: any, @Body() body: UpdateProfileDto, @Ip() ip: string, @Headers('user-agent') userAgent?: string) {
    return this.authService.updateProfile(req.user.id, body, { ip, userAgent });
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('profile/password')
  updatePassword(@Request() req: any, @Body() body: UpdatePasswordDto, @Ip() ip: string, @Headers('user-agent') userAgent?: string) {
    return this.authService.updatePassword(req.user.id, body, { ip, userAgent });
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('logout')
  logout() {
    return { message: 'Sesión cerrada correctamente' };
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('2fa/setup')
  setup2fa(@Request() req: any) {
    return this.authService.setup2fa(req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('2fa/confirm')
  confirm2fa(@Request() req: any, @Body() body: Confirm2faDto, @Ip() ip: string, @Headers('user-agent') userAgent?: string) {
    return this.authService.confirm2fa(req.user.id, body, { ip, userAgent });
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('2fa/disable')
  disable2fa(@Request() req: any, @Body() body: Disable2faDto, @Ip() ip: string, @Headers('user-agent') userAgent?: string) {
    return this.authService.disable2fa(req.user.id, body, { ip, userAgent });
  }

  // Historial de eventos sensibles del propio usuario. El id sale siempre del JWT, nunca de
  // la request, así que no hay forma de pedir el historial de otra cuenta.
  @UseGuards(AuthGuard('jwt'))
  @Get('security-log')
  getSecurityLog(@Request() req: any) {
    return this.authService.getSecurityLog(req.user.id);
  }
}
