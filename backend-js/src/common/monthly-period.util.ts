/**
 * Resolución de meses calendario y cálculo de variación mes a mes, usado por el resumen
 * mensual (`ReportsService`): tanto el endpoint bajo demanda como el job del día 1 comparten
 * estas funciones para que el mes que se muestra en pantalla y el que se manda por correo
 * sean exactamente el mismo rango.
 *
 * Los límites del período se devuelven como `YYYY-MM-DD` y no como `Date` a propósito:
 * `transactions.date` es una columna `DATE` (sin hora), y toda la app arma sus filtros con
 * `new Date('YYYY-MM-DD')`, que se interpreta en UTC. Devolver strings mantiene ese mismo
 * criterio y evita que el huso horario del servidor corra el rango en un día — un riesgo real
 * en este proyecto, donde el backend corre en Render (UTC) y los usuarios están en Chile.
 */

/** Un mes calendario, con sus límites listos para filtrar y su etiqueta legible. */
export interface MonthPeriod {
  /** Mes en formato `YYYY-MM`. */
  key: string;
  /** Primer día del mes, inclusive, en `YYYY-MM-DD`. */
  from: string;
  /** Último día del mes, inclusive, en `YYYY-MM-DD`. */
  to: string;
  /** Etiqueta legible para mostrar, ej. `Agosto 2026`. */
  label: string;
}

/** Variación de una métrica respecto del mes anterior. */
export interface MonthlyVariation {
  /** Valor de la métrica en el mes anterior. */
  previous: number;
  /** Diferencia absoluta contra el mes anterior (positiva si creció). */
  difference: number;
  /**
   * Variación porcentual redondeada a un decimal, o `null` cuando **no se puede calcular**
   * porque el mes anterior fue 0. Es `null` y no `0`/`Infinity` a propósito: "pasaste de 0 a
   * $500.000" no es un aumento del infinito por ciento ni una variación nula, simplemente no
   * hay base de comparación y quien consuma esto tiene que decidir cómo mostrarlo.
   */
  percentage: number | null;
  /** Sentido de la variación, para no obligar a comparar signos en el frontend/plantilla. */
  direction: 'up' | 'down' | 'flat';
}

/** Formato aceptado para pedir un mes puntual. */
export const MONTH_KEY_PATTERN = /^\d{4}-(0[1-9]|1[0-2])$/;

const MONTH_NAMES = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
];

/**
 * Devuelve el mes calendario al que pertenece una fecha, en formato `YYYY-MM`.
 *
 * @param reference fecha de referencia (default: ahora), leída en hora local del servidor
 * @returns el mes en `YYYY-MM`
 */
export function currentMonthKey(reference: Date = new Date()): string {
  return `${reference.getFullYear()}-${String(reference.getMonth() + 1).padStart(2, '0')}`;
}

/**
 * Mes anterior al recibido.
 *
 * @param key mes en `YYYY-MM`
 * @returns el mes previo en `YYYY-MM`, retrocediendo de año cuando corresponde
 */
export function previousMonthKey(key: string): string {
  const { year, month } = splitMonthKey(key);
  return month === 1
    ? `${year - 1}-12`
    : `${year}-${String(month - 1).padStart(2, '0')}`;
}

/**
 * Expande un `YYYY-MM` a su rango de fechas y su etiqueta.
 *
 * @param key mes en `YYYY-MM`
 * @returns el período con `from`/`to` inclusive
 * @throws Error si el formato no es `YYYY-MM` con un mes entre 01 y 12
 */
export function resolveMonthPeriod(key: string): MonthPeriod {
  if (!MONTH_KEY_PATTERN.test(key ?? '')) {
    throw new Error(`Mes inválido: "${key}". El formato esperado es YYYY-MM.`);
  }

  const { year, month } = splitMonthKey(key);
  // Día 0 del mes siguiente = último día de este mes, sin tablas de 28/30/31 ni bisiestos.
  const lastDay = new Date(Date.UTC(year, month, 0)).getUTCDate();
  const paddedMonth = String(month).padStart(2, '0');

  return {
    key,
    from: `${year}-${paddedMonth}-01`,
    to: `${year}-${paddedMonth}-${String(lastDay).padStart(2, '0')}`,
    label: `${MONTH_NAMES[month - 1]} ${year}`,
  };
}

/**
 * Calcula la variación de una métrica contra el mes anterior.
 *
 * @param current valor del mes reportado
 * @param previous valor del mes anterior
 * @returns diferencia, porcentaje (o `null` si no hay base) y sentido de la variación
 */
export function calculateVariation(current: number, previous: number): MonthlyVariation {
  // Se redondea antes de comparar para que el ruido de punto flotante no informe una
  // variación de $0,0000001 como si el gasto hubiera subido.
  const difference = round2(current - previous);
  const percentage = previous === 0 ? null : Number(((difference / Math.abs(previous)) * 100).toFixed(1));

  let direction: MonthlyVariation['direction'] = 'flat';
  if (difference > 0) direction = 'up';
  else if (difference < 0) direction = 'down';

  return { previous: round2(previous), difference, percentage, direction };
}

/** Separa un `YYYY-MM` ya validado en año y mes numéricos. */
function splitMonthKey(key: string): { year: number; month: number } {
  const [year, month] = key.split('-');
  return { year: Number(year), month: Number(month) };
}

/** Redondea a 2 decimales, la precisión de `transactions.amount` (`DECIMAL(15,2)`). */
function round2(value: number): number {
  return Number(value.toFixed(2));
}
