/**
 * Cálculo de fechas de las transacciones recurrentes (suscripciones y cuotas de crédito).
 *
 * Vive en `common/` y no dentro del módulo por el mismo motivo que `budget-period.util.ts`:
 * la fecha que se le muestra al usuario como "cuota pendiente", la que se guarda en
 * `next_run_date` y la que termina en la transacción real tienen que salir de una única
 * implementación. Si divergieran, el usuario podría ver una cuota vencida que al confirmarla
 * se registra con otra fecha (y por lo tanto en otro período de presupuesto).
 *
 * Todo el módulo trabaja con fechas "sin hora", representadas como `Date` a medianoche UTC.
 * Es la misma representación que devuelve Prisma para las columnas `@db.Date`, así que los
 * valores leídos de la BD se pueden usar tal cual, sin normalizar ni preocuparse por el huso.
 */

/** Frecuencias soportadas por una recurrencia. */
export const RECURRENCE_FREQUENCIES = ['weekly', 'biweekly', 'monthly', 'yearly'] as const;

export type RecurrenceFrequency = (typeof RECURRENCE_FREQUENCIES)[number];

/**
 * Tope de cuotas vencidas que se derivan de una sola recurrencia.
 *
 * Solo protege el caso patológico: una suscripción indefinida semanal con `start_date` de
 * hace años generaría cientos de pendientes en cada consulta. Con el tope, el usuario ve las
 * más antiguas primero y las siguientes van apareciendo a medida que confirma o descarta.
 */
export const MAX_PENDING_OCCURRENCES = 120;

/** Una cuota vencida derivada de la recurrencia (no existe como fila en la BD). */
export interface PendingOccurrence {
  /** Fecha que le corresponde a la cuota, a medianoche UTC. */
  date: Date;
  /** Misma fecha en formato `YYYY-MM-DD`, que es lo que consume el frontend. */
  date_string: string;
  /** Número de cuota, empezando en 1. */
  installment_number: number;
}

/**
 * Fecha de "hoy" como fecha pura, tomando el día del calendario local del servidor y
 * llevándolo a medianoche UTC.
 *
 * Se usa el día local (y no `new Date()` directo) porque lo que define si una cuota está
 * vencida es el día del calendario del usuario, no el instante exacto.
 *
 * @param reference instante de referencia (default: ahora)
 * @returns la fecha de hoy a medianoche UTC
 */
export function startOfToday(reference: Date = new Date()): Date {
  return new Date(Date.UTC(reference.getFullYear(), reference.getMonth(), reference.getDate()));
}

/**
 * Convierte una fecha pura a `YYYY-MM-DD`.
 * @param date fecha a medianoche UTC (típicamente una columna `@db.Date` leída por Prisma)
 * @returns la fecha en formato ISO corto
 */
export function formatDateOnly(date: Date): string {
  return date.toISOString().slice(0, 10);
}

/**
 * Parsea un `YYYY-MM-DD` a fecha pura (medianoche UTC).
 * @param value fecha en formato ISO corto
 * @returns la fecha equivalente a medianoche UTC
 */
export function parseDateOnly(value: string): Date {
  const [year, month, day] = value.split('-').map(Number);
  return new Date(Date.UTC(year, month - 1, day));
}

/** Último día del mes indicado (28, 29, 30 o 31). */
function lastDayOfMonth(year: number, monthIndex: number): number {
  // El día 0 del mes siguiente es el último día del mes pedido.
  return new Date(Date.UTC(year, monthIndex + 1, 0)).getUTCDate();
}

/**
 * Fecha de la ocurrencia número `periodsElapsed` de una recurrencia, contando desde
 * `startDate` (donde `periodsElapsed = 0` es la primera cuota, o sea la fecha de inicio).
 *
 * **Por qué se calcula siempre desde `start_date` y no sumando un período a la fecha anterior**:
 * en una mensual que arranca un 31, febrero obliga a recortar el día al 28. Si el período
 * siguiente se calculara sumando un mes a ese 28 recortado, la recurrencia quedaría pegada en
 * el 28 para siempre. Anclando al día de `start_date`, el recorte de febrero es local a ese mes
 * y marzo vuelve al 31: 31/01 → 28/02 → 31/03.
 *
 * Para `weekly`/`biweekly` no hay ambigüedad posible (son días fijos), pero se resuelven por el
 * mismo camino para que exista una sola función de avance.
 *
 * @param startDate fecha de la primera cuota (fecha pura, medianoche UTC)
 * @param frequency frecuencia de la recurrencia
 * @param periodsElapsed cantidad de períodos transcurridos desde el inicio (0 = primera cuota)
 * @returns la fecha de esa ocurrencia, a medianoche UTC
 */
export function occurrenceDate(
  startDate: Date,
  frequency: string,
  periodsElapsed: number,
): Date {
  const year = startDate.getUTCFullYear();
  const monthIndex = startDate.getUTCMonth();
  const day = startDate.getUTCDate();

  switch (frequency) {
    case 'weekly':
      return new Date(Date.UTC(year, monthIndex, day + 7 * periodsElapsed));
    case 'biweekly':
      return new Date(Date.UTC(year, monthIndex, day + 14 * periodsElapsed));
    case 'yearly': {
      const targetYear = year + periodsElapsed;
      // Único caso a recortar en anual: un 29/02 en un año no bisiesto pasa al 28/02.
      const clampedDay = Math.min(day, lastDayOfMonth(targetYear, monthIndex));
      return new Date(Date.UTC(targetYear, monthIndex, clampedDay));
    }
    case 'monthly':
    default: {
      // Date.UTC normaliza los meses fuera de rango, así que no hace falta dividir año y mes.
      const target = new Date(Date.UTC(year, monthIndex + periodsElapsed, 1));
      const clampedDay = Math.min(day, lastDayOfMonth(target.getUTCFullYear(), target.getUTCMonth()));
      return new Date(Date.UTC(target.getUTCFullYear(), target.getUTCMonth(), clampedDay));
    }
  }
}

/**
 * Deriva las cuotas vencidas de una recurrencia comparando su `next_run_date` contra hoy.
 *
 * Las cuotas pendientes **no se materializan como filas**: se calculan en el momento. Por eso
 * el sistema se auto-repara — aunque el cron de aviso nunca haya corrido (el servicio en Render
 * gratuito se duerme), apenas el usuario consulta aparecen todas las que se acumularon.
 *
 * @param recurring recurrencia con `start_date`, `frequency`, `next_run_date`,
 *        `installments_generated`, `installments_total` y `active`
 * @param today fecha de corte (default: hoy). Una cuota está vencida si su fecha es <= hoy.
 * @returns las cuotas vencidas ordenadas de la más antigua a la más reciente (máximo
 *          `MAX_PENDING_OCCURRENCES`); vacío si la recurrencia está pausada o terminada
 */
export function calculatePendingOccurrences(
  recurring: {
    start_date: Date;
    frequency: string;
    next_run_date: Date;
    installments_generated: number;
    installments_total: number | null;
    active: boolean;
  },
  today: Date = startOfToday(),
): PendingOccurrence[] {
  if (!recurring.active) return [];

  const pending: PendingOccurrence[] = [];
  const cutoff = today.getTime();

  let periodsElapsed = recurring.installments_generated;
  let date = recurring.next_run_date;

  while (date.getTime() <= cutoff && pending.length < MAX_PENDING_OCCURRENCES) {
    // Una recurrencia con cuotas fijas no genera más allá del total pactado.
    if (recurring.installments_total !== null && periodsElapsed >= recurring.installments_total) break;

    pending.push({
      date,
      date_string: formatDateOnly(date),
      installment_number: periodsElapsed + 1,
    });

    periodsElapsed++;
    date = occurrenceDate(recurring.start_date, recurring.frequency, periodsElapsed);
  }

  return pending;
}
