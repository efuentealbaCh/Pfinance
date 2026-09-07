/**
 * Escapa caracteres especiales de HTML para evitar inyección al interpolar
 * datos provistos por el usuario (ej. su nombre o la descripción de la recurrencia)
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

/** Una cuota que vence hoy, tal como se muestra en el aviso. */
export interface RecurringDueItem {
  /** Descripción de la recurrencia (o el nombre de la categoría, si no tiene). */
  description: string;
  /** Monto de la cuota. */
  amount: number;
  /** Tipo de movimiento: `income` o `expense`. */
  type: string;
  /** Fecha de la cuota en `YYYY-MM-DD`. */
  date: string;
  /** Número de cuota, empezando en 1. */
  installment_number: number;
  /** Total de cuotas pactadas, o `null` si la recurrencia es indefinida. */
  installments_total: number | null;
}

/**
 * Contenido del aviso de cuotas por confirmar, para insertarse dentro del layout compartido
 * (`baseEmailTemplate`). Es el canal de respaldo: solo se usa cuando el usuario no tiene
 * ninguna suscripción push activa.
 *
 * El correo deja explícito que la cuota **no se registró sola**: el cargo recién impacta el
 * saldo cuando el usuario la confirma en la app. Es la diferencia principal con una
 * recurrencia automática y conviene que quede clara en el aviso.
 *
 * @param name nombre del usuario, para personalizar el saludo
 * @param items cuotas que vencen hoy
 * @returns HTML del cuerpo del correo, listo para pasar como `content` a `baseEmailTemplate`
 */
export function recurringDueContent(name: string, items: RecurringDueItem[]): string {
  const safeName = escapeHtml(name);
  const isSingle = items.length === 1;

  const rows = items
    .map(item => {
      const safeDescription = escapeHtml(item.description);
      const progress =
        item.installments_total !== null
          ? `Cuota ${item.installment_number} de ${item.installments_total}`
          : 'Pago recurrente';
      // Verde para los ingresos y ámbar para los gastos, igual criterio que el resto de la app.
      const accentColor = item.type === 'income' ? '#15803d' : '#b45309';

      return `
      <tr>
        <td style="padding:14px 20px; border-bottom:1px solid #e2e8f0;">
          <p style="margin:0 0 4px; font-size:15px; color:#1e293b;">
            <strong>${safeDescription}</strong>
          </p>
          <p style="margin:0; font-size:13px; color:#64748b;">
            ${progress} &middot; vence el ${item.date}
          </p>
        </td>
        <td align="right" style="padding:14px 20px; border-bottom:1px solid #e2e8f0; white-space:nowrap;">
          <span style="font-size:15px; font-weight:bold; color:${accentColor};">
            ${item.type === 'income' ? '+' : '-'}$${item.amount}
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
          ? 'Tenés una cuota que vence hoy y está esperando tu confirmación.'
          : `Tenés ${items.length} cuotas que vencen hoy y están esperando tu confirmación.`
      }
    </p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e2e8f0; border-radius:6px; background-color:#f8fafc;">
      ${rows}
    </table>
    <p style="margin:20px 0 0; font-size:13px; color:#64748b;">
      ${
        isSingle ? 'Esta cuota todavía no se registró' : 'Estas cuotas todavía no se registraron'
      }: el saldo de tu cuenta no cambia hasta que ${
        isSingle ? 'la confirmes' : 'las confirmes'
      } desde la sección Recurrentes de Pfinance. Si este mes no te ${
        isSingle ? 'la' : 'las'
      } cobraron, podés omitir${isSingle ? 'la' : 'las'} y la recurrencia sigue su curso igual.
    </p>
  `.trim();
}
