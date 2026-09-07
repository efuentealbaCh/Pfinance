/**
 * Estado de un split de deuda compartida, compartido entre `SharedDebtsService` (que lo
 * devuelve al crear/declarar/confirmar) y `GroupsService` (que lo expone en el detalle del
 * grupo).
 *
 * Vive acá y no dentro de uno de los dos módulos para que no puedan divergir: el estado no se
 * persiste en una columna, se deriva de `is_paid` + las dos fechas del flujo de confirmación,
 * y si cada módulo lo derivara por su cuenta el frontend podría ver "esperando confirmación"
 * en una pantalla y "pendiente" en otra para el mismo split.
 */

/** Nadie declaró todavía haber pagado esta parte. */
export const SPLIT_STATUS_PENDING = 'pending';
/** El deudor declaró el pago y falta que el acreedor lo confirme. */
export const SPLIT_STATUS_AWAITING_CONFIRMATION = 'awaiting_confirmation';
/** El acreedor confirmó la recepción: la parte está saldada. */
export const SPLIT_STATUS_PAID = 'paid';

export type SharedDebtSplitStatus =
  | typeof SPLIT_STATUS_PENDING
  | typeof SPLIT_STATUS_AWAITING_CONFIRMATION
  | typeof SPLIT_STATUS_PAID;

/** Campos del split que intervienen en la derivación del estado. */
export interface SharedDebtSplitStateFields {
  is_paid: boolean;
  payment_declared_at?: Date | null;
}

/**
 * Deriva el estado visible de un split a partir de sus columnas.
 *
 * `is_paid` se evalúa primero a propósito: los splits saldados antes de que existiera el flujo
 * de dos pasos tienen `is_paid = true` con ambas fechas en `null`, y deben seguir viéndose
 * como saldados.
 *
 * @param split split con al menos `is_paid` y `payment_declared_at`
 * @returns `paid`, `awaiting_confirmation` o `pending`
 */
export function resolveSplitStatus(split: SharedDebtSplitStateFields): SharedDebtSplitStatus {
  if (split.is_paid) return SPLIT_STATUS_PAID;
  if (split.payment_declared_at) return SPLIT_STATUS_AWAITING_CONFIRMATION;
  return SPLIT_STATUS_PENDING;
}

/**
 * Agrega el estado derivado a un split ya mapeado, sin tocar el resto de sus campos.
 * Se usa en los `map` de las respuestas para no repetir el spread en cada lugar.
 *
 * @param split split tal como sale de Prisma (o ya mapeado con su `user`)
 * @returns el mismo objeto más la propiedad `status`
 */
export function withSplitStatus<T extends SharedDebtSplitStateFields>(
  split: T,
): T & { status: SharedDebtSplitStatus } {
  return { ...split, status: resolveSplitStatus(split) };
}
