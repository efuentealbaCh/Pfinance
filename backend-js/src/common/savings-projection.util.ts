/**
 * Proyección de metas de ahorro: "a este ritmo la alcanzás en X meses" y "para llegar a la
 * fecha objetivo deberías aportar $Y por mes".
 *
 * Vive en `common/` por el mismo motivo que `budget-period.util.ts` y `recurrence.util.ts`:
 * es lógica de cálculo pura, sin Prisma ni Nest, para poder testearla sola y para que el
 * número que se muestra en el listado y el que se muestra en el detalle salgan de una única
 * implementación.
 *
 * Los dos números que produce son distintos y no hay que confundirlos:
 * - `monthly_rate` es el ritmo **real** al que el usuario viene ahorrando (dato histórico).
 * - `required_monthly` es el aporte que **debería** hacer para llegar al `deadline` (objetivo).
 * Compararlos es justamente lo que responde "¿voy bien o voy atrasado?" (`meets_deadline`).
 */

/**
 * Ventana de historial que define el ritmo "actual".
 *
 * Se usan los últimos 6 meses y no todo el historial porque lo que le sirve al usuario es el
 * ritmo al que ahorra hoy: aportes grandes de hace dos años inflarían la proyección y le
 * prometerían una fecha que no va a cumplir.
 */
export const PACE_WINDOW_MONTHS = 6;

/**
 * Tope de meses que se proyectan hacia adelante (100 años).
 *
 * Con un ritmo positivo pero minúsculo frente a lo que falta, la división da un número que
 * no significa nada ("la alcanzás en 41.000 meses"). Pasado el tope se trata igual que un
 * ritmo nulo: la meta no se alcanza en la práctica.
 */
export const MAX_PROJECTED_MONTHS = 1200;

const MS_PER_DAY = 24 * 60 * 60 * 1000;

/** Origen del ritmo mensual, para que el frontend sea honesto sobre la precisión del dato. */
export type SavingsRateBasis =
  /** Calculado sobre movimientos reales de la ventana. Es el dato bueno. */
  | 'movements'
  /** Estimación: la meta no tiene historial, se repartió lo ahorrado sobre su antigüedad. */
  | 'estimated'
  /** No hay con qué estimar: ni movimientos ni monto ahorrado. */
  | 'none';

/** Estado general de la proyección. */
export type SavingsProjectionStatus =
  /** `current_amount` ya llegó al objetivo. */
  | 'completed'
  /** La meta no tiene un `target_amount` positivo: no hay nada que proyectar. */
  | 'invalid_target'
  /** Ritmo nulo o negativo (o tan bajo que no llega): al ritmo actual no se alcanza. */
  | 'stalled'
  /** Hay ritmo positivo y una fecha estimada de cumplimiento. */
  | 'projected';

/** Situación de la fecha objetivo de la meta. */
export type SavingsDeadlineStatus =
  /** La meta no tiene `deadline`. */
  | 'none'
  /** El `deadline` todavía no llegó. */
  | 'upcoming'
  /** El `deadline` ya pasó. */
  | 'overdue';

/** Agregados de `savings_goal_movements` de una meta, ya resueltos por el service. */
export interface GoalMovementStats {
  /** Suma de depósitos dentro de la ventana. */
  window_deposits: number;
  /** Suma de retiros dentro de la ventana. */
  window_withdrawals: number;
  /** Fecha del movimiento más antiguo dentro de la ventana, o `null` si no hubo ninguno. */
  window_first_at: Date | null;
  /** Cantidad total de movimientos de la meta, **sin** filtrar por ventana. */
  total_count: number;
}

/** Datos de la meta que necesita el cálculo (subconjunto de `savings_goals`). */
export interface ProjectableGoal {
  target_amount: number;
  current_amount: number;
  deadline: Date | null;
  created_at: Date | null;
}

/** Resultado de la proyección, tal como se expone en la API. */
export interface SavingsProjection {
  status: SavingsProjectionStatus;
  /** Aporte neto mensual (depósitos menos retiros). Puede ser 0 o negativo. */
  monthly_rate: number;
  rate_basis: SavingsRateBasis;
  /** Meses estimados hasta completar la meta, o `null` si no se puede proyectar. */
  months_to_goal: number | null;
  /** Fecha estimada de cumplimiento (`YYYY-MM-DD`), o `null` si no se puede proyectar. */
  projected_date: string | null;
  deadline_status: SavingsDeadlineStatus;
  /** Meses que faltan hasta el `deadline`, o `null` si no hay o ya venció. */
  months_to_deadline: number | null;
  /** Aporte mensual necesario para llegar al `deadline`, o `null` si no aplica. */
  required_monthly: number | null;
  /** `true`/`false` si hay `deadline` vigente; `null` cuando no hay con qué comparar. */
  meets_deadline: boolean | null;
  /** Texto listo para mostrar, en español. */
  message: string;
}

/**
 * Suma meses a una fecha recortando al último día del mes destino.
 *
 * Mismo criterio que `recurrence.util.ts`: sumar un mes al 31/01 da 28/02, no el 03/03 que
 * daría `setMonth` sin control.
 *
 * @param date fecha base
 * @param months meses a sumar (puede ser negativo)
 * @returns nueva fecha, sin mutar la original
 */
export function addMonths(date: Date, months: number): Date {
  const result = new Date(date.getTime());
  const day = result.getDate();
  result.setDate(1);
  result.setMonth(result.getMonth() + months);
  const lastDay = new Date(result.getFullYear(), result.getMonth() + 1, 0).getDate();
  result.setDate(Math.min(day, lastDay));
  return result;
}

/**
 * Inicio de la ventana de ritmo: `PACE_WINDOW_MONTHS` meses antes de la referencia.
 * @param reference instante de referencia (default: ahora)
 */
export function startOfPaceWindow(reference: Date = new Date()): Date {
  return addMonths(reference, -PACE_WINDOW_MONTHS);
}

/**
 * Meses transcurridos entre dos fechas, con parte fraccional.
 *
 * No se usa "días / 30" porque la fracción se calcula contra el largo real del mes en curso:
 * medio mes de febrero y medio de julio valen ambos 0.5, que es lo que espera el usuario.
 *
 * @param from fecha inicial
 * @param to fecha final
 * @returns meses transcurridos, o 0 si `to` no es posterior a `from`
 */
export function monthsBetween(from: Date, to: Date): number {
  if (to.getTime() <= from.getTime()) return 0;

  let whole = (to.getFullYear() - from.getFullYear()) * 12 + (to.getMonth() - from.getMonth());
  if (addMonths(from, whole).getTime() > to.getTime()) whole -= 1;

  const anchor = addMonths(from, whole);
  const nextAnchor = addMonths(from, whole + 1);
  const span = nextAnchor.getTime() - anchor.getTime();
  const fraction = span > 0 ? (to.getTime() - anchor.getTime()) / span : 0;

  return whole + fraction;
}

/**
 * Estima el ritmo de ahorro mensual de una meta.
 *
 * Con historial usa el neto (depósitos menos retiros) de la ventana. Sin historial cae a una
 * estimación sobre `current_amount` y la antigüedad de la meta: **todas las metas creadas
 * antes de esta feature tienen historial vacío**, así que sin ese fallback la proyección no
 * le serviría a nadie hasta dentro de meses. El origen queda marcado en `basis` para que el
 * frontend pueda advertir que es una estimación y no un dato medido.
 *
 * @param goal datos de la meta
 * @param stats agregados de movimientos, o `null` si la meta no tiene ninguno
 * @param reference instante de referencia
 * @returns ritmo mensual (2 decimales) y de dónde salió
 */
function estimateMonthlyRate(
  goal: ProjectableGoal,
  stats: GoalMovementStats | null,
  reference: Date,
): { rate: number; basis: SavingsRateBasis } {
  if (stats && stats.total_count > 0) {
    const net = stats.window_deposits - stats.window_withdrawals;

    // El divisor arranca en el primer movimiento de la ventana y no en la ventana completa:
    // una meta que empezó a recibir aportes hace 2 meses ahorra a ese ritmo, no a un sexto.
    // El piso de 1 mes evita que un depósito de ayer proyecte un ritmo mensual disparatado.
    const from = stats.window_first_at ?? startOfPaceWindow(reference);
    const months = Math.max(monthsBetween(from, reference), 1);

    return { rate: round2(net / months), basis: 'movements' };
  }

  if (goal.current_amount > 0) {
    // `created_at` es nullable en el esquema; sin fecha se asume la meta como recién creada,
    // que con el piso de 1 mes equivale a "todo lo ahorrado entró este mes".
    const since = goal.created_at ?? reference;
    const months = Math.max(monthsBetween(since, reference), 1);
    return { rate: round2(goal.current_amount / months), basis: 'estimated' };
  }

  return { rate: 0, basis: 'none' };
}

/**
 * Arma la proyección completa de una meta de ahorro.
 *
 * @param goal datos de la meta (montos ya convertidos a `number`)
 * @param stats agregados de movimientos de la meta, o `null` si no tiene
 * @param reference instante de referencia (default: ahora)
 * @returns la proyección lista para exponer en la API
 */
export function buildSavingsProjection(
  goal: ProjectableGoal,
  stats: GoalMovementStats | null,
  reference: Date = new Date(),
): SavingsProjection {
  const target = Number(goal.target_amount) || 0;
  const current = Number(goal.current_amount) || 0;
  const remaining = Math.max(0, target - current);

  const { rate, basis } = estimateMonthlyRate(goal, stats, reference);
  const deadlineStatus = resolveDeadlineStatus(goal.deadline, reference);
  const monthsToDeadline =
    deadlineStatus === 'upcoming' ? round1(monthsBetween(reference, goal.deadline as Date)) : null;

  const base = {
    monthly_rate: rate,
    rate_basis: basis,
    deadline_status: deadlineStatus,
    months_to_deadline: monthsToDeadline,
  };

  // Una meta sin monto objetivo positivo no tiene proyección posible: dividir por ella daría
  // infinito y el porcentaje de avance tampoco significa nada.
  if (target <= 0) {
    return {
      ...base,
      status: 'invalid_target',
      months_to_goal: null,
      projected_date: null,
      required_monthly: null,
      meets_deadline: null,
      message: 'La meta no tiene un monto objetivo válido, no se puede proyectar.',
    };
  }

  if (current >= target) {
    return {
      ...base,
      status: 'completed',
      months_to_goal: 0,
      projected_date: null,
      required_monthly: 0,
      meets_deadline: true,
      message: '¡Meta alcanzada! No necesitás seguir aportando.',
    };
  }

  // Aporte mensual sugerido para llegar a la fecha objetivo. Con menos de un mes por delante
  // se sugiere el total que falta en vez de dividir por una fracción: dividir por 0,2 meses
  // devolvería un "aporte mensual" 5 veces mayor a lo que realmente hay que poner.
  const requiredMonthly =
    deadlineStatus === 'upcoming' ? round2(remaining / Math.max(monthsToDeadline as number, 1)) : null;

  const rawMonthsToGoal = rate > 0 ? remaining / rate : null;
  const reachesGoal = rawMonthsToGoal !== null && rawMonthsToGoal <= MAX_PROJECTED_MONTHS;

  if (!reachesGoal) {
    return {
      ...base,
      status: 'stalled',
      months_to_goal: null,
      projected_date: null,
      required_monthly: requiredMonthly,
      meets_deadline: deadlineStatus === 'upcoming' ? false : null,
      message: stalledMessage(rate, basis, deadlineStatus, requiredMonthly),
    };
  }

  const monthsToGoal = round1(rawMonthsToGoal as number);
  const meetsDeadline = deadlineStatus === 'upcoming' ? monthsToGoal <= (monthsToDeadline as number) : null;

  return {
    ...base,
    status: 'projected',
    months_to_goal: monthsToGoal,
    // Se redondea hacia arriba a mes entero: prometer una fecha antes de la que da el cálculo
    // es peor que quedarse corto, y una proyección al día exacto sería precisión falsa.
    projected_date: formatDate(addMonths(reference, Math.ceil(monthsToGoal))),
    required_monthly: requiredMonthly,
    meets_deadline: meetsDeadline,
    message: projectedMessage(monthsToGoal, basis, deadlineStatus, requiredMonthly, meetsDeadline),
  };
}

/**
 * Resuelve si el `deadline` ya venció.
 *
 * La columna es `DATE`, así que la meta vence al **final** de ese día: un `deadline` de hoy
 * todavía cuenta como vigente. Por eso se compara contra el día siguiente.
 */
function resolveDeadlineStatus(deadline: Date | null, reference: Date): SavingsDeadlineStatus {
  if (!deadline) return 'none';
  return reference.getTime() >= deadline.getTime() + MS_PER_DAY ? 'overdue' : 'upcoming';
}

/** Mensaje para una meta que al ritmo actual no llega. */
function stalledMessage(
  rate: number,
  basis: SavingsRateBasis,
  deadlineStatus: SavingsDeadlineStatus,
  requiredMonthly: number | null,
): string {
  const head =
    basis === 'none'
      ? 'Todavía no registraste aportes, así que no hay ritmo para proyectar.'
      : rate < 0
        ? 'Estás retirando más de lo que aportás: al ritmo actual no vas a alcanzar la meta.'
        : 'Al ritmo actual no vas a alcanzar la meta.';

  if (deadlineStatus === 'overdue') {
    return `${head} Además, la fecha objetivo ya pasó y la meta sigue incompleta.`;
  }
  if (requiredMonthly !== null) {
    return `${head} Para llegar a la fecha objetivo deberías aportar $${requiredMonthly.toFixed(2)} por mes.`;
  }
  return head;
}

/** Mensaje para una meta con ritmo positivo. */
function projectedMessage(
  monthsToGoal: number,
  basis: SavingsRateBasis,
  deadlineStatus: SavingsDeadlineStatus,
  requiredMonthly: number | null,
  meetsDeadline: boolean | null,
): string {
  const pace = `A este ritmo alcanzás la meta en ${formatMonths(monthsToGoal)}`;
  const head = basis === 'estimated' ? `${pace} (estimado, todavía sin historial de aportes)` : pace;

  if (deadlineStatus === 'overdue') {
    return `${head}, pero la fecha objetivo ya pasó y la meta sigue incompleta.`;
  }
  if (requiredMonthly !== null) {
    return meetsDeadline
      ? `${head}, a tiempo para la fecha objetivo. Con $${requiredMonthly.toFixed(2)} por mes te alcanza.`
      : `${head}, pero llegás tarde a la fecha objetivo: deberías aportar $${requiredMonthly.toFixed(2)} por mes.`;
  }
  return `${head}.`;
}

/** Formatea una cantidad de meses en texto natural ("1 mes", "3,5 meses"). */
function formatMonths(months: number): string {
  if (months < 1) return 'menos de un mes';
  const label = Number.isInteger(months) ? String(months) : months.toFixed(1).replace('.', ',');
  return months === 1 ? '1 mes' : `${label} meses`;
}

/** Formatea una fecha como `YYYY-MM-DD` en hora local. */
function formatDate(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${date.getFullYear()}-${month}-${day}`;
}

/** Redondea a 2 decimales (montos). */
function round2(value: number): number {
  return Number(value.toFixed(2));
}

/** Redondea a 1 decimal (meses), igual que el porcentaje de presupuestos. */
function round1(value: number): number {
  return Number(value.toFixed(1));
}
