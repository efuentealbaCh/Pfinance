import { Injectable, UnauthorizedException, BadRequestException, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { authenticator } from 'otplib';
import * as QRCode from 'qrcode';
import { EncryptionService } from './encryption.service';
import { MailService } from '../mail/mail.service';
import { baseEmailTemplate } from '../mail/templates/base.template';
import { verifyEmailContent } from '../mail/templates/verify-email.template';
import { resetPasswordContent } from '../mail/templates/reset-password.template';
import { securityNoticeContent } from '../mail/templates/security-notice.template';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { Confirm2faDto } from './dto/confirm-2fa.dto';
import { Disable2faDto } from './dto/disable-2fa.dto';

/** Vigencia del token de verificación de email, en milisegundos (24 horas). */
const EMAIL_VERIFICATION_TOKEN_TTL_MS = 24 * 60 * 60 * 1000;
/** Tiempo mínimo entre reenvíos de verificación, en milisegundos (protección anti-spam básica). */
const RESEND_VERIFICATION_COOLDOWN_MS = 60 * 1000;
/** Vigencia del token de recuperación de contraseña, en milisegundos (30 minutos). */
const PASSWORD_RESET_TOKEN_TTL_MS = 30 * 60 * 1000;
/** Mensaje genérico de respuesta de `forgot-password`, igual exista o no el email (evita enumeración). */
const FORGOT_PASSWORD_GENERIC_MESSAGE = 'Si el correo existe, vas a recibir un enlace para restablecer tu contraseña';
/** Cantidad de eventos que devuelve el historial de seguridad del usuario. */
const SECURITY_LOG_PAGE_SIZE = 50;
/** Largo máximo de `security_logs.ip` — espeja el VarChar(45) de la columna (máximo de una IPv6). */
const SECURITY_LOG_IP_MAX_LENGTH = 45;
/** Largo máximo de `security_logs.user_agent` — espeja el VarChar(500) de la columna. */
const SECURITY_LOG_USER_AGENT_MAX_LENGTH = 500;

/**
 * Eventos sensibles que se registran en `security_logs`. Los valores se guardan tal cual en la
 * columna `event`, así que no conviene renombrarlos una vez en producción: el historial ya
 * escrito quedaría con el nombre viejo y las consultas por evento dejarían de cuadrar.
 */
export const SECURITY_EVENTS = {
  LOGIN: 'login',
  PASSWORD_CHANGED: 'password_changed',
  PASSWORD_RESET: 'password_reset',
  TWO_FACTOR_ENABLED: '2fa_enabled',
  TWO_FACTOR_DISABLED: '2fa_disabled',
  PROFILE_UPDATED: 'profile_updated',
} as const;

export type SecurityEvent = (typeof SECURITY_EVENTS)[keyof typeof SECURITY_EVENTS];

/**
 * Datos del request que acompañan a un evento de seguridad. Los arma el controller a partir
 * de `@Ip()` y del header `user-agent`; ambos pueden faltar (cliente que no los manda), por
 * eso son opcionales y se normalizan antes de guardarlos.
 */
export interface SecurityContext {
  ip?: string;
  userAgent?: string;
}

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
        // Un usuario recién registrado nunca puede tener 2FA activado todavía.
        totp_enabled: false,
      },
      token: this.jwtService.sign(payload),
    };
  }

  /**
   * Valida credenciales (y el segundo factor si corresponde) y devuelve el JWT de sesión.
   * Además registra el evento `login` en `security_logs` y, si el login viene de un contexto
   * que el usuario nunca usó antes, le avisa por correo.
   * @param data credenciales (email, password y `code` TOTP si tiene 2FA activo)
   * @param context IP y user agent del request, para el registro de auditoría
   * @throws UnauthorizedException si las credenciales o el código 2FA son inválidos
   */
  async login(data: LoginDto, context: SecurityContext = {}) {
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

    // Recién acá, con email+password ya validados, entra en juego el segundo factor.
    if (user.totp_enabled) {
      if (!data.code) {
        throw new UnauthorizedException({
          message: 'Se requiere código de autenticación de dos factores',
          requires2fa: true,
        });
      }

      const secret = this.encryptionService.decrypt(user.totp_secret) as string;
      const isCodeValid = authenticator.verify({ token: data.code, secret });
      if (!isCodeValid) {
        throw new UnauthorizedException('Código de autenticación inválido');
      }
    }

    // El orden importa: el aviso de contexto nuevo se evalúa ANTES de registrar el login
    // actual. Al revés, el propio registro recién insertado haría que todo contexto parezca
    // ya conocido y el aviso no saldría nunca.
    await this.notifyIfNewLoginContext(user, context);
    await this.recordSecurityEvent(user.id, SECURITY_EVENTS.LOGIN, context);

    const payload = { email: user.email, sub: user.id };
    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        rut: this.encryptionService.decrypt(user.rut),
        email_verified: !!user.email_verified_at,
        totp_enabled: user.totp_enabled,
      },
      token: this.jwtService.sign(payload),
    };
  }

  /**
   * Arma el perfil que se le devuelve al cliente a partir de la fila de `users`.
   *
   * El `rut` sale desencriptado, igual que en la respuesta del login: `JwtStrategy` devuelve la
   * fila cruda de la base, así que sin este paso `GET /auth/me` entregaba el valor cifrado. Como
   * el frontend recarga el usuario desde ese endpoint en cada arranque, el botón de copiar datos
   * de transferencia terminaba pegando el blob hexadecimal en lugar del RUT.
   *
   * `totp_secret` no se expone nunca, aunque esté encriptado: es el secreto que permite generar
   * códigos TOTP válidos, y no hay motivo para que salga del servidor.
   *
   * @param user fila de `users` sin la contraseña, tal como la deja `JwtStrategy.validate`
   * @returns el usuario listo para serializar, con los indicadores de estado que espera el PWA
   */
  buildProfile(user: any) {
    const { totp_secret, password, ...rest } = user;

    return {
      ...rest,
      rut: this.encryptionService.decrypt(user.rut),
      email_verified: !!user.email_verified_at,
      totp_enabled: !!user.totp_enabled,
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
  async resetPassword(data: ResetPasswordDto, context: SecurityContext = {}) {
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

    await this.sendSecurityNotice(
      user.email,
      user.name,
      'Se restableció la contraseña de tu cuenta de Pfinance usando el enlace de recuperación. Si no fuiste vos, cambiá tu contraseña de inmediato.',
    );
    await this.recordSecurityEvent(user.id, SECURITY_EVENTS.PASSWORD_RESET, context);

    return { message: 'Contraseña actualizada correctamente' };
  }

  async updateProfile(userId: string, data: UpdateProfileDto, context: SecurityContext = {}) {
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
    await this.recordSecurityEvent(userId, SECURITY_EVENTS.PROFILE_UPDATED, context);

    return { id: updatedUser.id, name: updatedUser.name, email: updatedUser.email, rut: this.encryptionService.decrypt(updatedUser.rut) };
  }

  async updatePassword(userId: string, data: UpdatePasswordDto, context: SecurityContext = {}) {
    const user = await this.prisma.users.findUnique({ where: { id: userId } });
    if (!user) throw new UnauthorizedException('Usuario no encontrado');

    const isValid = await bcrypt.compare(data.current_password, user.password);
    if (!isValid) throw new BadRequestException('La contraseña actual es incorrecta');

    const newHashedPassword = await bcrypt.hash(data.password, 10);
    await this.prisma.users.update({
      where: { id: userId },
      data: { password: newHashedPassword, updated_at: new Date() },
    });

    await this.sendSecurityNotice(
      user.email,
      user.name,
      'Se cambió la contraseña de tu cuenta de Pfinance desde tu perfil. Si no fuiste vos, contactanos de inmediato.',
    );
    await this.recordSecurityEvent(userId, SECURITY_EVENTS.PASSWORD_CHANGED, context);

    return { message: 'Contraseña actualizada correctamente' };
  }

  /**
   * Inicia la configuración de 2FA: genera un secret TOTP nuevo, lo guarda encriptado
   * (todavía sin activar — `totp_enabled` queda en `false` hasta confirmar el primer
   * código con `confirm2fa`) y devuelve el QR para escanear con una app autenticadora.
   * @throws BadRequestException si el usuario ya tiene 2FA activado
   */
  async setup2fa(userId: string) {
    const user = await this.prisma.users.findUnique({ where: { id: userId } });
    if (!user) throw new UnauthorizedException('Usuario no encontrado');

    if (user.totp_enabled) {
      throw new BadRequestException('Ya tenés 2FA activado, desactivalo antes de configurarlo de nuevo');
    }

    const secret = authenticator.generateSecret();
    const encryptedSecret = this.encryptionService.encrypt(secret) as string;

    await this.prisma.users.update({
      where: { id: userId },
      data: { totp_secret: encryptedSecret },
    });

    const otpauthUri = authenticator.keyuri(user.email, 'Pfinance', secret);
    const qrCode = await QRCode.toDataURL(otpauthUri);

    return { qrCode, secret };
  }

  /**
   * Confirma la configuración de 2FA validando el primer código generado por el usuario
   * contra el secret guardado en `setup2fa`. Si es válido, activa `totp_enabled`.
   * @throws BadRequestException si no se inició la configuración previamente, o si el código es inválido
   */
  async confirm2fa(userId: string, data: Confirm2faDto, context: SecurityContext = {}) {
    const user = await this.prisma.users.findUnique({ where: { id: userId } });
    if (!user) throw new UnauthorizedException('Usuario no encontrado');

    if (!user.totp_secret) {
      throw new BadRequestException('Primero tenés que iniciar la configuración de 2FA');
    }

    const secret = this.encryptionService.decrypt(user.totp_secret) as string;
    const isCodeValid = authenticator.verify({ token: data.code, secret });
    if (!isCodeValid) {
      throw new BadRequestException('Código inválido');
    }

    await this.prisma.users.update({
      where: { id: userId },
      data: { totp_enabled: true },
    });

    await this.sendSecurityNotice(user.email, user.name, 'Se activó la verificación en dos pasos (2FA) en tu cuenta de Pfinance.');
    await this.recordSecurityEvent(userId, SECURITY_EVENTS.TWO_FACTOR_ENABLED, context);

    return { message: '2FA activado correctamente' };
  }

  /**
   * Desactiva 2FA, previa validación de la contraseña actual. Limpia el secret guardado
   * (no lo deja dando vueltas encriptado en la BD sin uso).
   * @throws BadRequestException si la contraseña no coincide
   */
  async disable2fa(userId: string, data: Disable2faDto, context: SecurityContext = {}) {
    const user = await this.prisma.users.findUnique({ where: { id: userId } });
    if (!user) throw new UnauthorizedException('Usuario no encontrado');

    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
      throw new BadRequestException('Contraseña incorrecta');
    }

    await this.prisma.users.update({
      where: { id: userId },
      data: { totp_enabled: false, totp_secret: null },
    });

    await this.sendSecurityNotice(user.email, user.name, 'Se desactivó la verificación en dos pasos (2FA) en tu cuenta de Pfinance.');
    await this.recordSecurityEvent(userId, SECURITY_EVENTS.TWO_FACTOR_DISABLED, context);

    return { message: '2FA desactivado correctamente' };
  }

  /**
   * Envía un aviso corto por correo ante un evento sensible de la cuenta
   * (activación/desactivación de 2FA, cambio o restablecimiento de contraseña).
   * Igual que el resto de los envíos de correo del módulo: nunca debe tumbar la respuesta
   * si el envío falla, solo se loguea.
   */
  private async sendSecurityNotice(email: string, name: string, message: string) {
    try {
      await this.mailService.sendMail({
        to: email,
        subject: 'Pfinance — Aviso de seguridad de tu cuenta',
        html: baseEmailTemplate(securityNoticeContent(name, message), 'Aviso de seguridad de tu cuenta'),
      });
    } catch (error) {
      this.logger.error(
        `No se pudo enviar el aviso de seguridad a ${email}: ${(error as Error).message}`,
        (error as Error).stack,
      );
    }
  }

  /**
   * Devuelve los últimos eventos de seguridad del usuario, del más reciente al más antiguo.
   * Filtra siempre por el `userId` que viene del JWT, así que un usuario nunca puede ver el
   * historial de otro. No devuelve `user_id` porque es redundante: siempre es el propio.
   * @param userId id del usuario dueño del historial
   * @returns `{ events }` con hasta `SECURITY_LOG_PAGE_SIZE` eventos
   */
  async getSecurityLog(userId: string) {
    const events = await this.prisma.security_logs.findMany({
      where: { user_id: userId },
      orderBy: { created_at: 'desc' },
      take: SECURITY_LOG_PAGE_SIZE,
      select: { id: true, event: true, ip: true, user_agent: true, created_at: true },
    });

    return { events };
  }

  /**
   * Registra un evento sensible en `security_logs` (auditoría).
   * Nunca debe tumbar la operación que lo llama: si el insert falla, solo se loguea el error
   * — mismo criterio que ya se usa con los envíos de correo de este módulo.
   * @param userId id del usuario al que pertenece el evento
   * @param event nombre del evento, tomado de `SECURITY_EVENTS`
   * @param context IP y user agent del request, si el controller pudo obtenerlos
   */
  private async recordSecurityEvent(userId: string, event: SecurityEvent, context: SecurityContext = {}) {
    try {
      await this.prisma.security_logs.create({
        data: {
          user_id: userId,
          event,
          ip: this.normalizeContextValue(context.ip, SECURITY_LOG_IP_MAX_LENGTH),
          user_agent: this.normalizeContextValue(context.userAgent, SECURITY_LOG_USER_AGENT_MAX_LENGTH),
        },
      });
    } catch (error) {
      this.logger.error(
        `No se pudo registrar el evento de seguridad "${event}" del usuario ${userId}: ${(error as Error).message}`,
        (error as Error).stack,
      );
    }
  }

  /**
   * Avisa por correo si el login viene de un contexto (IP + user agent) que el usuario nunca
   * usó antes.
   *
   * Tiene que llamarse ANTES de registrar el evento `login` actual: si se llamara después, el
   * registro recién insertado haría que cualquier contexto parezca ya conocido.
   *
   * Si el usuario no tiene ningún `login` previo es su primer inicio de sesión (típicamente
   * recién después de registrarse): ahí no se avisa nada, sería ruido en pleno onboarding.
   *
   * Igual que el resto del módulo, no puede tumbar el login: cualquier error se loguea y sigue.
   * @param user usuario que acaba de autenticarse (destinatario del aviso)
   * @param context IP y user agent del request actual
   */
  private async notifyIfNewLoginContext(user: { id: string; email: string; name: string }, context: SecurityContext) {
    const ip = this.normalizeContextValue(context.ip, SECURITY_LOG_IP_MAX_LENGTH);
    const userAgent = this.normalizeContextValue(context.userAgent, SECURITY_LOG_USER_AGENT_MAX_LENGTH);

    try {
      const [previousLogins, knownContext] = await Promise.all([
        this.prisma.security_logs.count({
          where: { user_id: user.id, event: SECURITY_EVENTS.LOGIN },
        }),
        this.prisma.security_logs.findFirst({
          where: { user_id: user.id, event: SECURITY_EVENTS.LOGIN, ip, user_agent: userAgent },
          select: { id: true },
        }),
      ]);

      if (previousLogins === 0 || knownContext) {
        return;
      }

      await this.sendSecurityNotice(
        user.email,
        user.name,
        `Detectamos un inicio de sesión en tu cuenta de Pfinance desde un contexto que no habíamos visto antes (IP: ${ip ?? 'desconocida'}, dispositivo: ${this.describeUserAgent(userAgent)}). Si fuiste vos, podés ignorar este aviso. Si no lo reconocés, cambiá tu contraseña cuanto antes y activá la verificación en dos pasos desde tu perfil.`,
      );
    } catch (error) {
      this.logger.error(
        `No se pudo evaluar el contexto de login del usuario ${user.id}: ${(error as Error).message}`,
        (error as Error).stack,
      );
    }
  }

  /**
   * Normaliza un dato de contexto antes de guardarlo o compararlo: descarta valores vacíos y
   * recorta al largo de la columna destino. El user agent lo controla el cliente, así que sin
   * este recorte un valor largo haría fallar el insert.
   *
   * Devuelve `null` (no `undefined`) a propósito: en un `where` de Prisma, `undefined` significa
   * "no filtres por esta columna", con lo cual un login sin IP o sin user agent haría match
   * contra cualquier registro previo y el aviso de contexto nuevo no saldría nunca.
   * @param value valor crudo tomado del request
   * @param maxLength largo máximo de la columna destino
   * @returns el valor recortado, o `null` si no había dato utilizable
   */
  private normalizeContextValue(value: string | undefined | null, maxLength: number): string | null {
    if (!value) {
      return null;
    }
    const trimmed = value.trim();
    return trimmed ? trimmed.slice(0, maxLength) : null;
  }

  /**
   * Describe de forma aproximada el dispositivo detrás de un user agent, para el texto del
   * correo de aviso. No busca ser exhaustivo — no vale la pena sumar una dependencia de
   * parsing para una línea de texto —: si no reconoce nada, devuelve el user agent recortado.
   * @param userAgent user agent ya normalizado, o `null` si el cliente no lo mandó
   * @returns descripción corta tipo "Chrome en Windows"
   */
  private describeUserAgent(userAgent: string | null): string {
    if (!userAgent) {
      return 'desconocido';
    }

    // El orden importa: Edge y Opera también incluyen "Chrome/", y Chrome incluye "Safari/".
    const browsers: [string, string][] = [
      ['Edg/', 'Edge'],
      ['OPR/', 'Opera'],
      ['Firefox/', 'Firefox'],
      ['Chrome/', 'Chrome'],
      ['Safari/', 'Safari'],
    ];
    // Mismo criterio: Android también dice "Linux", y los de iOS dicen "like Mac OS X".
    const systems: [string, string][] = [
      ['Windows', 'Windows'],
      ['Android', 'Android'],
      ['iPhone', 'iOS'],
      ['iPad', 'iPadOS'],
      ['Mac OS X', 'macOS'],
      ['Linux', 'Linux'],
    ];

    const browser = browsers.find(([token]) => userAgent.includes(token))?.[1];
    const system = systems.find(([token]) => userAgent.includes(token))?.[1];

    if (browser && system) {
      return `${browser} en ${system}`;
    }
    return browser ?? system ?? userAgent.slice(0, 80);
  }
}
