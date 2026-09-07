/**
 * Cálculo del período de un presupuesto, compartido entre `BudgetsService` (que muestra el
 * consumo en pantalla) y `TransactionsService` (que dispara las alertas de umbral).
 *
 * Vive acá y no dentro de uno de los dos módulos justamente para que no puedan divergir: si
 * el rango que se usa para calcular el gasto mostrado y el que se usa para decidir si hay que
 * alertar fueran dos implementaciones distintas, el usuario podría ver "85%" en la pantalla y
 * no recibir nunca el aviso del 80% (o al revés).
 */

/** Rango de fechas de un período de presupuesto, más la clave que identifica esa instancia. */
export interface BudgetPeriod {
  /** Inicio del período, inclusive (00:00:00.000 hora local). */
  from: Date;
  /** Fin del período, inclusive (23:59:59.999 hora local). */
  to: Date;
  /**
   * Identificador de la instancia concreta del período: `2026-09` (mensual), `2026-W37`
   * (semanal) o `2026` (anual). Es lo que permite que las alertas se reseteen solas cuando
   * arranca el período siguiente, sin ningún job de limpieza.
   */
  key: string;
}

/** Presupuestos creados apuntando a un mes puntual, ej. `2026-09`. */
const EXPLICIT_MONTH_PATTERN = /^\d{4}-\d{2}$/;

const MS_PER_WEEK = 7 * 24 * 60 * 60 * 1000;

/**
 * Resuelve el rango de fechas y la clave de período de un presupuesto.
 *
 * Soporta los dos formatos que conviven en la columna `budgets.period`: los literales
 * `monthly` / `weekly` / `yearly` (el default del schema) y un mes explícito `YYYY-MM`.
 * Cualquier otro valor cae en el comportamiento mensual, igual que antes.
 *
 * @param period valor crudo de `budgets.period`
 * @param reference fecha desde la que se calculan los períodos relativos (default: ahora).
 *        Solo se usa para `monthly`/`weekly`/`yearly`; un mes explícito ignora la referencia.
 * @returns rango `from`/`to` inclusive y la `key` de la instancia del período
 */
export function resolveBudgetPeriod(period: string, reference: Date = new Date()): BudgetPeriod {
  // Un mes explícito ya es en sí mismo la clave del período: se usa tal cual.
  if (EXPLICIT_MONTH_PATTERN.test(period ?? '')) {
    const [year, month] = period.split('-');
    const from = new Date(Number(year), Number(month) - 1, 1);
    const to = new Date(Number(year), Number(month), 0, 23, 59, 59, 999);
    return { from, to, key: period };
  }

  switch (period) {
    case 'weekly': {
      // La semana arranca el lunes: con getDay() domingo es 0, así que se retrocede 6 días
      // en vez de avanzar 1.
      const day = reference.getDay();
      const diff = reference.getDate() - day + (day === 0 ? -6 : 1);
      const from = new Date(reference.getFullYear(), reference.getMonth(), diff);
      const to = new Date(from);
      to.setDate(to.getDate() + 6);
      to.setHours(23, 59, 59, 999);
      return { from, to, key: formatIsoWeekKey(from) };
    }
    case 'yearly': {
      const year = reference.getFullYear();
      return {
        from: new Date(year, 0, 1),
        to: new Date(year, 11, 31, 23, 59, 59, 999),
        key: String(year),
      };
    }
    default: {
      const from = new Date(reference.getFullYear(), reference.getMonth(), 1);
      const to = new Date(reference.getFullYear(), reference.getMonth() + 1, 0, 23, 59, 59, 999);
      return { from, to, key: formatMonthKey(from) };
    }
  }
}

/**
 * Porcentaje consumido de un presupuesto, redondeado a un decimal.
 * Se comparte por el mismo motivo que el rango: el % que ve el usuario y el que se compara
 * contra los umbrales de alerta tienen que ser exactamente el mismo número.
 *
 * @param spent total gastado en el período
 * @param amount monto del presupuesto
 * @returns porcentaje consumido, o 0 si el presupuesto no tiene monto positivo
 */
export function calculateBudgetPercentage(spent: number, amount: number): number {
  return amount > 0 ? Number(((spent / amount) * 100).toFixed(1)) : 0;
}

/** Formatea una fecha como `YYYY-MM` en hora local. */
function formatMonthKey(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
}

/**
 * Formatea el lunes de una semana como `YYYY-Www` según ISO 8601.
 *
 * Se usa el año ISO y no el calendario porque una semana puede quedar a caballo entre dos
 * años: el 31/12 puede pertenecer a la semana 1 del año siguiente. Sin esto, dos semanas
 * distintas podrían compartir clave y una de ellas se quedaría sin aviso.
 * El cálculo se hace en UTC para que un cambio de horario de verano no corra el resultado
 * en un día.
 */
function formatIsoWeekKey(startOfWeek: Date): string {
  // Jueves de la misma semana ISO: define tanto el año ISO como el número de semana.
  const thursday = new Date(Date.UTC(startOfWeek.getFullYear(), startOfWeek.getMonth(), startOfWeek.getDate() + 3));
  const isoYear = thursday.getUTCFullYear();

  // El 4 de enero siempre cae en la semana 1 por definición de ISO 8601.
  const firstThursday = new Date(Date.UTC(isoYear, 0, 4));
  firstThursday.setUTCDate(firstThursday.getUTCDate() + 3 - ((firstThursday.getUTCDay() + 6) % 7));

  const week = 1 + Math.round((thursday.getTime() - firstThursday.getTime()) / MS_PER_WEEK);
  return `${isoYear}-W${String(week).padStart(2, '0')}`;
}
