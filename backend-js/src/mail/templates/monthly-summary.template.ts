import { MonthlyVariation } from '../../common/monthly-period.util';
import { Currency, formatAmount as formatCurrencyAmount } from '../../common/currency.util';

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

/** Una categoría del desglose de gastos del mes. */
export interface MonthlySummaryCategory {
  /** Nombre de la categoría (o el fallback para gastos sin categoría). */
  name: string;
  /** Total gastado en la categoría durante el mes. */
  total: number;
  /** Porcentaje que representa sobre el gasto total del mes, ya redondeado. */
  percentage: number;
  /** Color de la categoría, para la marca lateral de la fila. */
  color: string;
}

/** Datos del resumen mensual que se muestran en el correo. */
export interface MonthlySummaryEmailData {
  /** Mes reportado, ej. `Agosto 2026`. */
  month_label: string;
  /** Mes contra el que se compara, ej. `Julio 2026`. */
  previous_month_label: string;
  /** Ingresos totales del mes. */
  income: number;
  /** Gastos totales del mes. */
  expense: number;
  /** Balance del mes (ingresos - gastos). */
  balance: number;
  /** Cantidad de movimientos registrados en el mes. */
  transactions_count: number;
  /** Variación de los ingresos contra el mes anterior. */
  income_variation: MonthlyVariation;
  /** Variación de los gastos contra el mes anterior. */
  expense_variation: MonthlyVariation;
  /** Principales categorías de gasto, de mayor a menor. */
  top_categories: MonthlySummaryCategory[];
  /** Gasto acumulado del resto de las categorías que no entraron en el top. */
  other_categories_total: number;
  /** Moneda base en la que están expresados todos los montos del resumen. */
  currency: Currency;
}

const POSITIVE_COLOR = '#15803d';
const NEGATIVE_COLOR = '#b91c1c';
const NEUTRAL_COLOR = '#475569';

/**
 * Formatea un monto con el símbolo, los separadores y los decimales de su moneda.
 *
 * El signo se antepone al símbolo (`-$1.200`, no `$-1.200`) porque es como se lee un saldo
 * negativo en un estado de cuenta.
 *
 * @param value monto a formatear
 * @param currency moneda base del resumen
 * @returns el monto listo para insertar en el HTML
 */
function formatAmount(value: number, currency: Currency): string {
  return `${value < 0 ? '-' : ''}${formatCurrencyAmount(Math.abs(value), currency)}`;
}

/**
 * Frase de comparación contra el mes anterior.
 *
 * Cuando el mes anterior fue 0 no se inventa un porcentaje (sería una división por cero): se
 * dice explícitamente que no hay con qué comparar, que es la información honesta.
 *
 * @param variation variación calculada de la métrica
 * @param metric arranque de la frase, ej. `Gastaste un`
 * @param previousLabel etiqueta del mes anterior
 * @returns la frase lista para insertar en el HTML
 */
function variationPhrase(
  variation: MonthlyVariation,
  metric: string,
  previousLabel: string,
  currency: Currency,
): string {
  if (variation.percentage === null) {
    return `No hay movimientos de ${previousLabel} con qué comparar.`;
  }
  if (variation.direction === 'flat') {
    return `Sin cambios respecto de ${previousLabel}.`;
  }
  const verb = variation.direction === 'up' ? 'más' : 'menos';
  const difference = formatAmount(Math.abs(variation.difference), currency);
  return `${metric} ${Math.abs(variation.percentage)}% ${verb} que en ${previousLabel} (${difference}).`;
}

/**
 * Bloque de una métrica (ingresos o gastos): monto grande arriba y la comparación con el mes
 * anterior debajo, que es lo que le da sentido al número.
 *
 * @param title título del bloque
 * @param amount monto del mes reportado
 * @param variation variación contra el mes anterior
 * @param metric arranque de la frase de comparación
 * @param previousLabel etiqueta del mes anterior
 * @param upIsGood si subir es buena noticia (ingresos) o mala (gastos), para elegir el color
 * @param currency moneda base del resumen
 * @returns el `<tr>` del bloque
 */
function metricBlock(
  title: string,
  amount: number,
  variation: MonthlyVariation,
  metric: string,
  previousLabel: string,
  upIsGood: boolean,
  currency: Currency,
): string {
  let color = NEUTRAL_COLOR;
  let arrow = '';

  if (variation.percentage !== null && variation.direction !== 'flat') {
    const isGood = variation.direction === 'up' ? upIsGood : !upIsGood;
    color = isGood ? POSITIVE_COLOR : NEGATIVE_COLOR;
    // Entidades HTML en vez de emojis: los clientes de correo de escritorio los renderizan
    // de forma despareja y algunos los muestran como cuadrado vacío.
    arrow = variation.direction === 'up' ? '&#9650; ' : '&#9660; ';
  }

  return `
      <tr>
        <td style="padding:16px 20px; border-bottom:1px solid #e2e8f0;">
          <p style="margin:0 0 4px; font-size:13px; color:#64748b; text-transform:uppercase; letter-spacing:0.5px;">
            ${title}
          </p>
          <p style="margin:0 0 6px; font-size:26px; font-weight:bold; color:#0f172a; line-height:1.2;">
            ${formatAmount(amount, currency)}
          </p>
          <p style="margin:0; font-size:14px; color:${color};">
            ${arrow}${variationPhrase(variation, metric, previousLabel, currency)}
          </p>
        </td>
      </tr>`;
}

/**
 * Contenido del resumen mensual, para insertarse dentro del layout compartido
 * (`baseEmailTemplate`). Lo manda el job del día 1 de cada mes, solo a los usuarios que
 * tuvieron al menos un movimiento en el mes reportado.
 *
 * Está armado en una sola columna y con montos grandes porque estos correos se leen sobre todo
 * en el celular: nada de tablas de varias columnas que obliguen a hacer zoom.
 *
 * @param name nombre del usuario, para personalizar el saludo
 * @param data totales del mes, comparación con el mes anterior y categorías principales
 * @returns HTML del cuerpo del correo, listo para pasar como `content` a `baseEmailTemplate`
 */
export function monthlySummaryContent(name: string, data: MonthlySummaryEmailData): string {
  const safeName = escapeHtml(name);
  const balanceColor = data.balance >= 0 ? POSITIVE_COLOR : NEGATIVE_COLOR;

  const categoryRows = data.top_categories
    .map(category => {
      const safeCategory = escapeHtml(category.name);
      return `
      <tr>
        <td style="padding:12px 20px; border-bottom:1px solid #e2e8f0;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td width="4" style="width:4px; background-color:${category.color}; border-radius:2px; font-size:0; line-height:0;">&nbsp;</td>
              <td style="padding-left:12px; font-size:15px; color:#1e293b;">
                ${safeCategory}
                <span style="color:#64748b; font-size:13px;">&nbsp;&middot;&nbsp;${category.percentage}%</span>
              </td>
              <td align="right" style="font-size:15px; font-weight:bold; color:#1e293b; white-space:nowrap;">
                ${formatAmount(category.total, data.currency)}
              </td>
            </tr>
          </table>
        </td>
      </tr>`;
    })
    .join('');

  const otherCategoriesRow =
    data.other_categories_total > 0
      ? `
      <tr>
        <td style="padding:12px 20px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="font-size:14px; color:#64748b;">Resto de las categorías</td>
              <td align="right" style="font-size:14px; font-weight:bold; color:#475569; white-space:nowrap;">
                ${formatAmount(data.other_categories_total, data.currency)}
              </td>
            </tr>
          </table>
        </td>
      </tr>`
      : '';

  const categoriesSection =
    data.top_categories.length > 0
      ? `
    <p style="margin:24px 0 12px; font-size:16px; font-weight:bold; color:#0f172a;">
      Tus mayores gastos del mes
    </p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e2e8f0; border-radius:6px; background-color:#f8fafc;">
      ${categoryRows}${otherCategoriesRow}
    </table>`
      : `
    <p style="margin:24px 0 0; font-size:14px; color:#64748b;">
      No registraste gastos durante el mes.
    </p>`;

  return `
    <p style="margin:0 0 16px;">Hola ${safeName},</p>
    <p style="margin:0 0 20px;">
      Este es tu resumen de <strong>${escapeHtml(data.month_label)}</strong>: registraste
      ${data.transactions_count} ${data.transactions_count === 1 ? 'movimiento' : 'movimientos'}.
    </p>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e2e8f0; border-radius:6px; background-color:#f8fafc;">
      ${metricBlock('Ingresos', data.income, data.income_variation, 'Ingresaste un', data.previous_month_label, true, data.currency)}
      ${metricBlock('Gastos', data.expense, data.expense_variation, 'Gastaste un', data.previous_month_label, false, data.currency)}
      <tr>
        <td style="padding:16px 20px;">
          <p style="margin:0 0 4px; font-size:13px; color:#64748b; text-transform:uppercase; letter-spacing:0.5px;">
            Balance del mes
          </p>
          <p style="margin:0; font-size:26px; font-weight:bold; color:${balanceColor}; line-height:1.2;">
            ${formatAmount(data.balance, data.currency)}
          </p>
          <p style="margin:6px 0 0; font-size:14px; color:#64748b;">
            ${
              data.balance >= 0
                ? 'Cerraste el mes en verde: gastaste menos de lo que ingresó.'
                : 'Cerraste el mes en rojo: gastaste más de lo que ingresó.'
            }
          </p>
        </td>
      </tr>
    </table>

    ${categoriesSection}

    <p style="margin:24px 0 0; font-size:13px; color:#64748b;">
      Podés ver el detalle completo, filtrar por cuenta y exportar tus movimientos desde Pfinance.
    </p>
  `.trim();
}
