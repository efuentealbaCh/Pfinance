/**
 * Escapa caracteres especiales de HTML para evitar inyección al interpolar
 * datos provistos por el usuario (ej. su nombre o el nombre de la categoría)
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

/** Datos del presupuesto que se muestran en el aviso. */
export interface BudgetAlertData {
  /** Nombre de la categoría del presupuesto. */
  category: string;
  /** Monto tope del presupuesto. */
  amount: number;
  /** Total gastado en el período. */
  spent: number;
  /** Porcentaje consumido, ya redondeado. */
  percentage: number;
  /** Umbral que se cruzó: 80 o 100. */
  threshold: number;
}

/**
 * Contenido del aviso de presupuesto, para insertarse dentro del layout compartido
 * (`baseEmailTemplate`). Es el canal de respaldo: solo se usa cuando el usuario no tiene
 * ninguna suscripción push activa.
 *
 * @param name nombre del usuario, para personalizar el saludo
 * @param data categoría, monto, gastado, porcentaje y umbral cruzado
 * @returns HTML del cuerpo del correo, listo para pasar como `content` a `baseEmailTemplate`
 */
export function budgetAlertContent(name: string, data: BudgetAlertData): string {
  const safeName = escapeHtml(name);
  const safeCategory = escapeHtml(data.category);
  const isOverBudget = data.threshold >= 100;

  // Rojo al 100% (ya no queda margen) y ámbar al 80% (todavía es un aviso preventivo).
  const accentColor = isOverBudget ? '#b91c1c' : '#b45309';
  const headline = isOverBudget
    ? `Agotaste tu presupuesto de ${safeCategory}`
    : `Vas por el ${data.percentage}% de tu presupuesto de ${safeCategory}`;

  return `
    <p style="margin:0 0 16px;">Hola ${safeName},</p>
    <p style="margin:0 0 20px;">
      ${headline}.
    </p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e2e8f0; border-radius:6px; background-color:#f8fafc;">
      <tr>
        <td style="padding:16px 20px;">
          <p style="margin:0 0 8px; font-size:14px; color:#475569;">
            Categoría: <strong style="color:#1e293b;">${safeCategory}</strong>
          </p>
          <p style="margin:0 0 8px; font-size:14px; color:#475569;">
            Presupuesto: <strong style="color:#1e293b;">$${data.amount}</strong>
          </p>
          <p style="margin:0 0 8px; font-size:14px; color:#475569;">
            Gastado: <strong style="color:#1e293b;">$${data.spent}</strong>
          </p>
          <p style="margin:0; font-size:14px; color:#475569;">
            Consumido: <strong style="color:${accentColor};">${data.percentage}%</strong>
          </p>
        </td>
      </tr>
    </table>
    <p style="margin:20px 0 0; font-size:13px; color:#64748b;">
      ${
        isOverBudget
          ? 'Ya superaste el tope que te habías puesto para este período. Podés revisar tus gastos o ajustar el presupuesto desde la sección Presupuestos de Pfinance.'
          : 'Todavía estás dentro del presupuesto, pero te queda poco margen para lo que resta del período.'
      }
    </p>
  `.trim();
}
