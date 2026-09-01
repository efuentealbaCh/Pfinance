import { Injectable, UnauthorizedException, BadRequestException, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { EncryptionService } from './encryption.service';
import { MailService } from '../mail/mail.service';
import { baseEmailTemplate } from '../mail/templates/base.template';
import { verifyEmailContent } from '../mail/templates/verify-email.template';
import { resetPasswordContent } from '../mail/templates/reset-password.template';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

/** Vigencia del token de verificación de email, en milisegundos (24 horas). */
const EMAIL_VERIFICATION_TOKEN_TTL_MS = 24 * 60 * 60 * 1000;
/** Tiempo mínimo entre reenvíos de verificación, en milisegundos (protección anti-spam básica). */
const RESEND_VERIFICATION_COOLDOWN_MS = 60 * 1000;
/** Vigencia del token de recuperación de contraseña, en milisegundos (30 minutos). */
const PASSWORD_RESET_TOKEN_TTL_MS = 30 * 60 * 1000;
/** Mensaje genérico de respuesta de `forgot-password`, igual exista o no el email (evita enumeración). */
const FORGOT_PASSWORD_GENERIC_MESSAGE = 'Si el correo existe, vas a recibir un enlace para restablecer tu contraseña';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private encryptionService: EncryptionService,
    private mailService: MailService,
  ) {}

  async register(data: RegisterDto) {
    const existingUser = await this.prisma.users.findUnique({
      where: { email: data.email },
    });
    if (existingUser) {
      throw new BadRequestException('El correo ya está en uso');
    }

    let encryptedRut: string | undefined = undefined;
    if (data.rut) {
      encryptedRut = this.encryptionService.encrypt(data.rut) as string;
      const existingRut = await this.prisma.users.findUnique({
        where: { rut: encryptedRut },
      });
      if (existingRut) {
        throw new BadRequestException('El RUT ya está registrado');
      }
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await this.prisma.users.create({
      data: {
        name: data.name,
        email: data.email,
        rut: encryptedRut,
        password: hashedPassword,
        created_at: new Date(),
        updated_at: new Date(),
      },
    });

    // El envío del correo de bienvenida no debe tumbar el registro si falla
    // (ej. credenciales SMTP no configuradas) — el usuario puede pedir un reenvío después.
    await this.createAndSendVerificationToken(user.id, user.email, user.name);

    const payload = { email: user.email, sub: user.id };
    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        rut: data.rut || null,
        email_verified: !!user.email_verified_at,
      },
      token: this.jwtService.sign(payload),
    };
  }

  async login(data: LoginDto) {
    const user = await this.prisma.users.findUnique({
      where: { email: data.email },
    });
    if (!user) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    const payload = { email: user.email, sub: user.id };
    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        rut: this.encryptionService.decrypt(user.rut),
        email_verified: !!user.email_verified_at,
      },
      token: this.jwtService.sign(payload),
    };
  }

  /**
   * Valida un token de verificación de email (recibido en texto plano desde el link del
   * frontend), y si es válido y no expiró, marca `users.email_verified_at` y consume el token.
   * @throws BadRequestException si el token no existe o ya expiró
   */
  async verifyEmail(rawToken: string) {
    const tokenHash = this.hashToken(rawToken);
    const record = await this.prisma.email_verification_tokens.findFirst({
      where: { token_hash: tokenHash },
    });

    if (!record || record.expires_at < new Date()) {
      throw new BadRequestException('El enlace de verificación es inválido o expiró');
    }

    await this.prisma.$transaction([
      this.prisma.users.update({
        where: { id: record.user_id },
        data: { email_verified_at: new Date() },
      }),
      this.prisma.email_verification_tokens.delete({
        where: { id: record.id },
      }),
    ]);

    return { message: 'Correo verificado correctamente' };
  }

  /**
   * Reenvía el correo de verificación al usuario autenticado. Rechaza si ya está verificado,
   * o si el último token se generó hace menos de `RESEND_VERIFICATION_COOLDOWN_MS` (anti-spam).
   * No recibe el email por parámetro (usa el del usuario autenticado) para evitar enumeración.
   */
  async resendVerification(userId: string) {
    const user = await this.prisma.users.findUnique({ where: { id: userId } });
    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado');
    }
    if (user.email_verified_at) {
      throw new BadRequestException('El correo ya está verificado');
    }

    const existingToken = await this.prisma.email_verification_tokens.findUnique({
      where: { user_id: userId },
    });
    if (existingToken) {
      const elapsedMs = Date.now() - existingToken.created_at.getTime();
      if (elapsedMs < RESEND_VERIFICATION_COOLDOWN_MS) {
        throw new BadRequestException('Esperá un minuto antes de solicitar otro reenvío');
      }
    }

    await this.createAndSendVerificationToken(user.id, user.email, user.name);
    return { message: 'Correo de verificación reenviado' };
  }

  /**
   * Genera un token de verificación nuevo (sobrescribe el anterior del mismo usuario vía
   * upsert, ya que `user_id` es único), guarda su hash y envía el correo con el link.
   * El envío de correo se envuelve en su propio try/catch: si falla, solo se loguea —
   * nunca debe interrumpir el flujo que la llama (registro o reenvío).
   */
  private async createAndSendVerificationToken(userId: string, email: string, name: string) {
    const rawToken = crypto.randomBytes(32).toString('hex');
    const tokenHash = this.hashToken(rawToken);
    const expiresAt = new Date(Date.now() + EMAIL_VERIFICATION_TOKEN_TTL_MS);
    const now = new Date();

    await this.prisma.email_verification_tokens.upsert({
      where: { user_id: userId },
      update: { token_hash: tokenHash, expires_at: expiresAt, created_at: now },
      create: { user_id: userId, token_hash: tokenHash, expires_at: expiresAt, created_at: now },
    });

    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    const verificationUrl = `${frontendUrl}/verify-email?token=${rawToken}`;

    try {
      await this.mailService.sendMail({
        to: email,
        subject: 'Verificá tu correo en Pfinance',
        html: baseEmailTemplate(verifyEmailContent(name, verificationUrl), 'Confirmá tu correo para activar tu cuenta'),
      });
    } catch (error) {
      this.logger.error(
        `No se pudo enviar el correo de verificación a ${email}: ${(error as Error).message}`,
        (error as Error).stack,
      );
    }
  }

  private hashToken(rawToken: string): string {
    return crypto.createHash('sha256').update(rawToken).digest('hex');
  }

  /**
   * Inicia el flujo de recuperación de contraseña. Responde siempre el mismo mensaje
   * genérico, exista o no el email, y también si el envío de correo falla — así el
   * llamador no puede usar la respuesta para enumerar qué correos están registrados.
   */
  async forgotPassword(data: ForgotPasswordDto) {
    const user = await this.prisma.users.findUnique({ where: { email: data.email } });
    if (!user) {
      return { message: FORGOT_PASSWORD_GENERIC_MESSAGE };
    }

    const rawToken = crypto.randomBytes(32).toString('hex');
    const tokenHash = this.hashToken(rawToken);
    const expiresAt = new Date(Date.now() + PASSWORD_RESET_TOKEN_TTL_MS);

    await this.prisma.password_reset_tokens.upsert({
      where: { email: user.email },
      update: { token_hash: tokenHash, expires_at: expiresAt },
      create: { email: user.email, token_hash: tokenHash, expires_at: expiresAt },
    });

    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    const resetUrl = `${frontendUrl}/reset-password?token=${rawToken}`;

    try {
      await this.mailService.sendMail({
        to: user.email,
        subject: 'Pfinance — Restablecé tu contraseña',
        html: baseEmailTemplate(resetPasswordContent(user.name, resetUrl), 'Restablecé tu contraseña en Pfinance'),
      });
    } catch (error) {
      this.logger.error(
        `No se pudo enviar el correo de recuperación de contraseña a ${user.email}: ${(error as Error).message}`,
        (error as Error).stack,
      );
    }

    return { message: FORGOT_PASSWORD_GENERIC_MESSAGE };
  }

  /**
   * Valida un token de recuperación de contraseña (recibido en texto plano desde el link
   * del frontend) y, si es válido y no expiró, actualiza la contraseña del usuario dueño
   * del token y lo consume.
   * @throws BadRequestException si el token no existe o ya expiró
   */
  async resetPassword(data: ResetPasswordDto) {
    const tokenHash = this.hashToken(data.token);
    const record = await this.prisma.password_reset_tokens.findFirst({
      where: { token_hash: tokenHash },
    });

    if (!record || record.expires_at < new Date()) {
      throw new BadRequestException('El enlace para restablecer la contraseña es inválido o expiró');
    }

    const user = await this.prisma.users.findUnique({ where: { email: record.email } });
    if (!user) {
      throw new BadRequestException('El enlace para restablecer la contraseña es inválido o expiró');
    }

    const newHashedPassword = await bcrypt.hash(data.password, 10);
    await this.prisma.$transaction([
      this.prisma.users.update({
        where: { id: user.id },
        data: { password: newHashedPassword, updated_at: new Date() },
      }),
      this.prisma.password_reset_tokens.delete({
        where: { email: record.email },
      }),
    ]);

    return { message: 'Contraseña actualizada correctamente' };
  }

  async updateProfile(userId: string, data: UpdateProfileDto) {
    let encryptedRut: string | null | undefined = undefined;
    if (data.rut !== undefined) {
      encryptedRut = data.rut ? this.encryptionService.encrypt(data.rut) : null;
    }

    const updatedUser = await this.prisma.users.update({
      where: { id: userId },
      data: {
        name: data.name,
        email: data.email,
        ...(encryptedRut !== undefined && { rut: encryptedRut }),
        updated_at: new Date(),
      },
    });
    return { id: updatedUser.id, name: updatedUser.name, email: updatedUser.email, rut: this.encryptionService.decrypt(updatedUser.rut) };
  }

  async updatePassword(userId: string, data: UpdatePasswordDto) {
    const user = await this.prisma.users.findUnique({ where: { id: userId } });
    if (!user) throw new UnauthorizedException('Usuario no encontrado');

    const isValid = await bcrypt.compare(data.current_password, user.password);
    if (!isValid) throw new BadRequestException('La contraseña actual es incorrecta');

    const newHashedPassword = await bcrypt.hash(data.password, 10);
    await this.prisma.users.update({
      where: { id: userId },
      data: { password: newHashedPassword, updated_at: new Date() },
    });
    return { message: 'Contraseña actualizada correctamente' };
  }
}
