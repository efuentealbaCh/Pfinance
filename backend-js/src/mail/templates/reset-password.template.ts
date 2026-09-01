/**
 * Escapa caracteres especiales de HTML para evitar inyección al interpolar
 * datos provistos por el usuario (ej. su nombre) dentro de una plantilla de correo.
 */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Contenido específico del correo de recuperación de contraseña, pensado para insertarse
 * dentro del layout compartido (`baseEmailTemplate`).
 *
 * @param name nombre del usuario, para personalizar el saludo
 * @param resetUrl link al FRONTEND (no al backend) que permite definir una nueva contraseña
 * @returns HTML del cuerpo del correo, listo para pasar como `content` a `baseEmailTemplate`
 */
export function resetPasswordContent(name: string, resetUrl: string): string {
  const safeName = escapeHtml(name);
  return `
    <p style="margin:0 0 16px;">Hola ${safeName},</p>
    <p style="margin:0 0 16px;">
      Recibimos una solicitud para restablecer tu contraseña en Pfinance. Hacé clic en el siguiente botón para definir una nueva:
    </p>
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin:24px 0;">
      <tr>
        <td style="border-radius:6px; background-color:#0f766e;">
          <a href="${resetUrl}" target="_blank" style="display:inline-block; padding:12px 24px; font-size:15px; font-weight:bold; color:#ffffff; text-decoration:none; border-radius:6px;">
            Restablecer mi contraseña
          </a>
        </td>
      </tr>
    </table>
    <p style="margin:0 0 8px; font-size:13px; color:#64748b;">
      Si el botón no funciona, copiá y pegá este enlace en tu navegador:
    </p>
    <p style="margin:0 0 16px; font-size:13px; word-break:break-all;">
      <a href="${resetUrl}" style="color:#0f766e;">${resetUrl}</a>
    </p>
    <p style="margin:0; font-size:13px; color:#64748b;">
      Este enlace vence en 30 minutos. Si no solicitaste este cambio, podés ignorar este correo — tu contraseña actual seguirá siendo válida.
    </p>
  `.trim();
}
