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
 * Contenido genérico para avisos cortos de eventos sensibles de la cuenta (ej. activación/
 * desactivación de 2FA, cambio de contraseña), pensado para insertarse dentro del layout
 * compartido (`baseEmailTemplate`). No incluye acción/link — es solo un aviso informativo.
 *
 * @param name nombre del usuario, para personalizar el saludo
 * @param message texto del aviso, específico del evento (ej. "Se activó la verificación en dos pasos...")
 * @returns HTML del cuerpo del correo, listo para pasar como `content` a `baseEmailTemplate`
 */
export function securityNoticeContent(name: string, message: string): string {
  const safeName = escapeHtml(name);
  const safeMessage = escapeHtml(message);
  return `
    <p style="margin:0 0 16px;">Hola ${safeName},</p>
    <p style="margin:0 0 16px;">
      ${safeMessage}
    </p>
    <p style="margin:0; font-size:13px; color:#64748b;">
      Si no fuiste vos quien hizo este cambio, te recomendamos revisar la seguridad de tu cuenta y cambiar tu contraseña lo antes posible.
    </p>
  `.trim();
}
