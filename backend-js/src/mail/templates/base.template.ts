/**
 * Layout base reutilizable para todos los correos transaccionales de Pfinance.
 *
 * Usa una tabla como contenedor principal (no CSS externo/moderno) para maximizar
 * compatibilidad con clientes de correo como Gmail y Outlook, que ignoran gran parte
 * del CSS moderno y a veces todo el <style> externo.
 *
 * Las features que envían correos (verificación de email, reset de password, alertas,
 * resumen mensual, etc.) solo deben generar el HTML del `content` interno y pasarlo acá,
 * sin reescribir header/footer.
 *
 * @param content HTML del cuerpo específico del correo (ya con sus propios inline styles)
 * @param preheaderText texto corto opcional, oculto, que algunos clientes muestran como preview junto al asunto
 * @returns documento HTML completo listo para enviar como `html` en MailService.sendMail
 */
export function baseEmailTemplate(content: string, preheaderText?: string): string {
  return `
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title>Pfinance</title>
  </head>
  <body style="margin:0; padding:0; background-color:#f1f5f9; font-family: Arial, Helvetica, sans-serif;">
    ${
      preheaderText
        ? `<div style="display:none; max-height:0; overflow:hidden; opacity:0; mso-hide:all;">${preheaderText}</div>`
        : ''
    }
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f1f5f9; padding:24px 0;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px; background-color:#ffffff; border-radius:8px; overflow:hidden; border:1px solid #e2e8f0;">
            <!-- Header -->
            <tr>
              <td style="background-color:#0f172a; padding:24px 32px;">
                <span style="font-size:20px; font-weight:bold; color:#ffffff; letter-spacing:0.5px;">
                  Pfinance
                </span>
              </td>
            </tr>
            <!-- Accent bar -->
            <tr>
              <td style="background-color:#0f766e; height:4px; line-height:4px; font-size:0;">&nbsp;</td>
            </tr>
            <!-- Body -->
            <tr>
              <td style="padding:32px; color:#1e293b; font-size:15px; line-height:1.6;">
                ${content}
              </td>
            </tr>
            <!-- Footer -->
            <tr>
              <td style="padding:20px 32px; background-color:#f8fafc; border-top:1px solid #e2e8f0;">
                <p style="margin:0; font-size:12px; color:#64748b; line-height:1.5;">
                  Este es un correo automático de Pfinance, tu gestor de finanzas personales. Si no esperabas este mensaje, podés ignorarlo.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`.trim();
}
