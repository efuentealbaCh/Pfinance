/**
 * Escapa caracteres especiales de HTML para evitar inyección al interpolar
 * datos provistos por el usuario (ej. su nombre o el título de la deuda)
 * dentro de una plantilla de correo.
 */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Una deuda pendiente del usuario, tal como se muestra en el recordatorio semanal. */
export interface SharedDebtReminderItem {
  /** Título de la deuda (`shared_debts.title`). */
  title: string;
  /** Nombre del grupo donde se cargó. */
  group: string;
  /** Nombre de quien puso la plata y espera el pago. */
  creditor: string;
  /** Monto que le toca pagar al usuario. */
  amount: number;
  /** Fecha de la deuda en `YYYY-MM-DD`. */
  date: string;
}

/**
 * Contenido del recordatorio semanal de deudas pendientes, para insertarse dentro del layout
 * compartido (`baseEmailTemplate`). Es el canal de respaldo: solo se usa cuando el usuario no
 * tiene ninguna suscripción push activa.
 *
 * Solo le llega a quien debe (nunca al acreedor) y agrupa todas sus deudas sin declarar en un
 * único correo con el total, para que el recordatorio no se vuelva spam en grupos con muchas
 * deudas chicas.
 *
 * @param name nombre del usuario, para personalizar el saludo
 * @param items deudas pendientes de declarar
 * @returns HTML del cuerpo del correo, listo para pasar como `content` a `baseEmailTemplate`
 */
export function sharedDebtReminderContent(name: string, items: SharedDebtReminderItem[]): string {
  const safeName = escapeHtml(name);
  const isSingle = items.length === 1;
  const total = Number(items.reduce((sum, item) => sum + item.amount, 0).toFixed(2));

  const rows = items
    .map(item => {
      const safeTitle = escapeHtml(item.title);
      const safeGroup = escapeHtml(item.group);
      const safeCreditor = escapeHtml(item.creditor);

      return `
      <tr>
        <td style="padding:14px 20px; border-bottom:1px solid #e2e8f0;">
          <p style="margin:0 0 4px; font-size:15px; color:#1e293b;">
            <strong>${safeTitle}</strong>
          </p>
          <p style="margin:0; font-size:13px; color:#64748b;">
            Grupo ${safeGroup} &middot; le debés a ${safeCreditor} &middot; ${item.date}
          </p>
        </td>
        <td align="right" style="padding:14px 20px; border-bottom:1px solid #e2e8f0; white-space:nowrap;">
          <span style="font-size:15px; font-weight:bold; color:#b45309;">
            $${item.amount}
          </span>
        </td>
      </tr>`;
    })
    .join('');

  return `
    <p style="margin:0 0 16px;">Hola ${safeName},</p>
    <p style="margin:0 0 20px;">
      ${
        isSingle
          ? 'Tenés una deuda compartida pendiente de pago.'
          : `Tenés ${items.length} deudas compartidas pendientes de pago, por un total de <strong>$${total}</strong>.`
      }
    </p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e2e8f0; border-radius:6px; background-color:#f8fafc;">
      ${rows}
    </table>
    <p style="margin:20px 0 0; font-size:13px; color:#64748b;">
      Cuando ${isSingle ? 'la pagues' : 'las pagues'}, marcá el pago desde el grupo en Pfinance:
      ${isSingle ? 'quien puso la plata' : 'quienes pusieron la plata'} recibe un aviso para confirmar que
      ${isSingle ? 'lo' : 'los'} recibió, y recién ahí ${isSingle ? 'la deuda queda saldada' : 'las deudas quedan saldadas'}.
    </p>
  `.trim();
}
