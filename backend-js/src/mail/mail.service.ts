import { Injectable, InternalServerErrorException, Logger, OnModuleInit } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

export interface SendMailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

/**
 * Servicio genérico de envío de correo, desacoplado del proveedor.
 * Se configura 100% por variables de entorno SMTP (MAIL_HOST, MAIL_PORT, MAIL_SECURE,
 * MAIL_USER, MAIL_PASSWORD, MAIL_FROM), para poder cambiar de proveedor (Brevo, SendGrid,
 * Mailgun, etc.) sin tocar código.
 */
@Injectable()
export class MailService implements OnModuleInit {
  private readonly logger = new Logger(MailService.name);
  private transporter: nodemailer.Transporter | null = null;
  private readonly mailFrom = process.env.MAIL_FROM;

  onModuleInit() {
    const { MAIL_HOST, MAIL_PORT, MAIL_USER, MAIL_PASSWORD, MAIL_FROM } = process.env;

    if (!MAIL_HOST || !MAIL_PORT || !MAIL_USER || !MAIL_PASSWORD || !MAIL_FROM) {
      this.logger.warn(
        'MailService: variables de entorno de correo incompletas (MAIL_HOST, MAIL_PORT, MAIL_USER, MAIL_PASSWORD, MAIL_FROM). ' +
          'El envío de correos quedará deshabilitado hasta que se configuren.',
      );
      return;
    }

    this.transporter = nodemailer.createTransport({
      host: MAIL_HOST,
      port: Number(MAIL_PORT),
      secure: process.env.MAIL_SECURE === 'true',
      auth: {
        user: MAIL_USER,
        pass: MAIL_PASSWORD,
      },
    });
  }

  /**
   * Envía un correo genérico.
   * @param options destinatario, asunto y contenido (html requerido, text opcional)
   * @returns el resultado del envío de nodemailer
   * @throws InternalServerErrorException si el transporter no está configurado o el envío falla
   */
  async sendMail({ to, subject, html, text }: SendMailOptions) {
    if (!this.transporter) {
      this.logger.error(`No se pudo enviar el correo a ${to}: MailService no está configurado (faltan variables de entorno).`);
      throw new InternalServerErrorException('El servicio de correo no está configurado');
    }

    try {
      const info = await this.transporter.sendMail({
        from: this.mailFrom,
        to,
        subject,
        html,
        text,
      });
      this.logger.log(`Correo enviado a ${to} (subject: "${subject}")`);
      return info;
    } catch (error) {
      this.logger.error(`Error al enviar correo a ${to}: ${(error as Error).message}`, (error as Error).stack);
      throw new InternalServerErrorException('No se pudo enviar el correo');
    }
  }
}
