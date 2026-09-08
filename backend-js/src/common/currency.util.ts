/**
 * Utilidades de moneda compartidas por todo el backend.
 *
 * El alcance es deliberadamente chico: CLP y USD, que es lo que se usa en cuentas chilenas.
 * Agregar una moneda nueva implica sumarla a `SUPPORTED_CURRENCIES` y a `CURRENCY_DECIMALS`,
 * y asegurarse de que exista una fuente de cotización para el par correspondiente.
 */

/** Monedas que la app sabe manejar. */
export const SUPPORTED_CURRENCIES = ['CLP', 'USD'] as const;

export type Currency = (typeof SUPPORTED_CURRENCIES)[number];

/** Moneda por defecto de cuentas y usuarios nuevos. */
export const DEFAULT_CURRENCY: Currency = 'CLP';

/**
 * Decimales con los que se representa cada moneda.
 *
 * El peso chileno no tiene fracción: mostrar o acumular `$1.234,56 CLP` no solo se ve mal, con
 * el tiempo genera diferencias de redondeo contra lo que informa el banco. El dólar sí usa dos.
 */
export const CURRENCY_DECIMALS: Record<Currency, number> = {
  CLP: 0,
  USD: 2,
};

/** Símbolo usado al formatear cada moneda. */
const CURRENCY_SYMBOLS: Record<Currency, string> = {
  CLP: '$',
  USD: 'US$',
};

/** Locale de formato por moneda (define separador de miles y decimal). */
const CURRENCY_LOCALES: Record<Currency, string> = {
  CLP: 'es-CL',
  USD: 'en-US',
};

/**
 * Verifica si un valor arbitrario es una moneda soportada.
 *
 * @param value valor a validar, normalmente venido del body de un request
 * @returns `true` si es una de las monedas soportadas
 */
export function isSupportedCurrency(value: unknown): value is Currency {
  return typeof value === 'string' && (SUPPORTED_CURRENCIES as readonly string[]).includes(value);
}

/**
 * Normaliza una moneda venida de la base o de un request, cayendo al default si no es válida.
 *
 * Existe porque las columnas `currency` son `VarChar(3)` con default, no un enum de Postgres:
 * una fila vieja o cargada a mano podría traer cualquier cosa, y ningún cálculo debería
 * romperse por eso.
 *
 * @param value moneda a normalizar
 * @returns la moneda si es soportada, o `DEFAULT_CURRENCY`
 */
export function normalizeCurrency(value: unknown): Currency {
  return isSupportedCurrency(value) ? value : DEFAULT_CURRENCY;
}

/**
 * Redondea un monto a los decimales propios de su moneda.
 *
 * @param amount monto a redondear
 * @param currency moneda que define la cantidad de decimales
 * @returns el monto redondeado (0 decimales para CLP, 2 para USD)
 */
export function roundToCurrency(amount: number, currency: Currency): number {
  const factor = 10 ** CURRENCY_DECIMALS[currency];
  return Math.round(amount * factor) / factor;
}

/**
 * Formatea un monto para mostrarlo en correos y reportes generados en el backend.
 *
 * @param amount monto a formatear
 * @param currency moneda del monto
 * @returns el monto con símbolo y separadores, p. ej. `$1.234.567` o `US$1,234.56`
 */
export function formatAmount(amount: number, currency: Currency): string {
  const decimals = CURRENCY_DECIMALS[currency];
  const formatted = new Intl.NumberFormat(CURRENCY_LOCALES[currency], {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(amount);

  return `${CURRENCY_SYMBOLS[currency]}${formatted}`;
}

/**
 * Convierte una fecha a la clave `YYYY-MM-DD` con la que se indexan las cotizaciones.
 *
 * Se usa `toISOString` sobre una fecha ya normalizada a medianoche UTC: las columnas `@db.Date`
 * de Prisma vuelven así, y las fechas de mindicador también caen dentro del mismo día UTC.
 *
 * @param date fecha a convertir
 * @returns la fecha en formato `YYYY-MM-DD`
 */
export function toDateKey(date: Date): string {
  return date.toISOString().split('T')[0];
}
