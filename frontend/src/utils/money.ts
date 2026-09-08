/**
 * money.ts — Formateador de moneda unificado para Pfinance
 *
 * Reglas:
 *  - CLP → sin decimales, símbolo $  (ej: $85.000)
 *  - USD → 2 decimales, símbolo US$  (ej: US$1.068,01)
 *  - compact → versión corta para ejes de gráficos (ej: $85k, US$1,1k)
 *
 * Se usa siempre locale 'es-CL' para que los separadores queden
 * como en Chile: punto de miles, coma decimal.
 */

export type SupportedCurrency = 'CLP' | 'USD' | 'EUR';

export interface FormatMoneyOptions {
  /** Si es true, formatea en versión compacta (k, M) */
  compact?: boolean;
}

const LOCALE = 'es-CL';

/**
 * Formatea un número como moneda según las reglas de Pfinance.
 *
 * @param amount   - Monto numérico
 * @param currency - Código de moneda ISO 4217 ('CLP' | 'USD' | 'EUR')
 * @param opts     - Opciones adicionales (compact)
 */
export function formatMoney(
  amount: number,
  currency: SupportedCurrency = 'CLP',
  opts: FormatMoneyOptions = {}
): string {
  const { compact = false } = opts;

  const isCLP = currency === 'CLP';

  if (compact) {
    // Versión compacta: 1000 → $1k, 1500000 → $1,5M
    const absAmount = Math.abs(amount);
    const sign = amount < 0 ? '-' : '';

    let compactValue: string;
    if (absAmount >= 1_000_000) {
      compactValue = (absAmount / 1_000_000).toLocaleString(LOCALE, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 1,
      }) + 'M';
    } else if (absAmount >= 1_000) {
      compactValue = (absAmount / 1_000).toLocaleString(LOCALE, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 1,
      }) + 'k';
    } else {
      compactValue = absAmount.toLocaleString(LOCALE, {
        minimumFractionDigits: 0,
        maximumFractionDigits: isCLP ? 0 : 2,
      });
    }

    const symbol = isCLP ? '$' : currency === 'USD' ? 'US$' : '€';
    return `${sign}${symbol}${compactValue}`;
  }

  // Versión completa con Intl.NumberFormat
  return new Intl.NumberFormat(LOCALE, {
    style: 'currency',
    currency,
    currencyDisplay: 'narrowSymbol',
    minimumFractionDigits: isCLP ? 0 : 2,
    maximumFractionDigits: isCLP ? 0 : 2,
  }).format(amount);
}
