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

/** Los tres momentos del flujo de confirmación que generan un aviso. */
export type SharedDebtPaymentEvent = 'declared' | 'confirmed' | 'rejected';

/** Datos de la deuda que se muestran en el aviso, iguales para los tres eventos. */
export interface SharedDebtPaymentInfo {
  /** Título de la deuda (`shared_debts.title`). */
  title: string;
  /** Nombre del grupo donde se cargó la deuda. */
  group: string;
  /** Monto de la parte que le toca al deudor (`shared_debt_splits.amount_owed`). */
  amount: number;
  /** Nombre de la otra parte: el deudor si el destinatario es el acreedor, y viceversa. */
  counterpart: string;
  /** Motivo opcional del rechazo, tal como lo escribió el acreedor. Solo para `rejected`. */
  reason?: string;
}

/**
 * Contenido de los avisos del flujo de pago de una deuda compartida, para insertarse dentro
 * del layout compartido (`baseEmailTemplate`). Es el canal de respaldo: solo se usa cuando el
 * destinatario no tiene ninguna suscripción push activa.
 *
 * Los tres eventos comparten la misma ficha de la deuda y solo cambian el encabezado, el color
 * del acento y la llamada a la acción, así que se resuelven en una sola función en vez de tres
 * plantillas casi idénticas.
 *
 * @param name nombre del destinatario, para personalizar el saludo
 * @param event momento del flujo que dispara el aviso
 * @param debt datos de la deuda y de la contraparte
 * @returns HTML del cuerpo del correo, listo para pasar como `content` a `baseEmailTemplate`
 */
export function sharedDebtPaymentContent(
  name: string,
  event: SharedDebtPaymentEvent,
  debt: SharedDebtPaymentInfo,
): string {
  const safeName = escapeHtml(name);
  const safeTitle = escapeHtml(debt.title);
  const safeGroup = escapeHtml(debt.group);
  const safeCounterpart = escapeHtml(debt.counterpart);

  const copy = {
    declared: {
      accent: '#b45309',
      headline: `${safeCounterpart} declaró que ya te pagó su parte de <strong>${safeTitle}</strong>.`,
      // El acreedor es quien decide: el correo tiene que dejar claro que la deuda todavía no
      // se saldó sola y que sigue esperando su acción.
      footer:
        'La deuda queda <strong>esperando tu confirmación</strong>: hasta que confirmes que recibiste la plata ' +
        'sigue figurando como impaga. Si no te llegó, podés rechazar la declaración desde el grupo en Pfinance.',
    },
    confirmed: {
      accent: '#15803d',
      headline: `${safeCounterpart} confirmó que recibió tu pago de <strong>${safeTitle}</strong>.`,
      footer: 'Tu parte de esta deuda quedó saldada. No tenés que hacer nada más.',
    },
    rejected: {
      accent: '#b91c1c',
      headline: `${safeCounterpart} no registró el pago que declaraste por <strong>${safeTitle}</strong>.`,
      footer:
        'Tu parte volvió a quedar <strong>pendiente</strong>. Revisá el pago con ' +
        `${safeCounterpart} y, cuando esté resuelto, podés volver a declararlo desde el grupo en Pfinance.`,
    },
  }[event];

  const safeReason = event === 'rejected' && debt.reason ? escapeHtml(debt.reason) : null;

  return `
    <p style="margin:0 0 16px;">Hola ${safeName},</p>
    <p style="margin:0 0 20px;">${copy.headline}</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e2e8f0; border-radius:6px; background-color:#f8fafc;">
      <tr>
        <td style="padding:14px 20px;">
          <p style="margin:0 0 4px; font-size:15px; color:#1e293b;">
            <strong>${safeTitle}</strong>
          </p>
          <p style="margin:0; font-size:13px; color:#64748b;">
            Grupo ${safeGroup}
          </p>
        </td>
        <td align="right" style="padding:14px 20px; white-space:nowrap;">
          <span style="font-size:15px; font-weight:bold; color:${copy.accent};">
            $${debt.amount}
          </span>
        </td>
      </tr>
    </table>
    ${
      safeReason
        ? `<p style="margin:16px 0 0; font-size:13px; color:#64748b;">Motivo indicado: &ldquo;${safeReason}&rdquo;</p>`
        : ''
    }
    <p style="margin:20px 0 0; font-size:13px; color:#64748b;">
      ${copy.footer}
    </p>
  `.trim();
}
