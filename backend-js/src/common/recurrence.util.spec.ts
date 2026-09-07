import {
  calculatePendingOccurrences,
  formatDateOnly,
  occurrenceDate,
  parseDateOnly,
  MAX_PENDING_OCCURRENCES,
} from './recurrence.util';

/** Atajo para leer una serie de ocurrencias como strings `YYYY-MM-DD`. */
function serie(start: string, frequency: string, periods: number): string[] {
  const startDate = parseDateOnly(start);
  return Array.from({ length: periods }, (_, i) => formatDateOnly(occurrenceDate(startDate, frequency, i)));
}

describe('occurrenceDate', () => {
  it('mensual: un 31 se recorta al último día del mes destino y vuelve al 31 cuando el mes lo permite', () => {
    // El caso que rompe las implementaciones que suman un mes a la fecha anterior: si el
    // 28/02 se usara como base, marzo daría 28 y la recurrencia quedaría pegada ahí.
    expect(serie('2026-01-31', 'monthly', 6)).toEqual([
      '2026-01-31',
      '2026-02-28',
      '2026-03-31',
      '2026-04-30',
      '2026-05-31',
      '2026-06-30',
    ]);
  });

  it('mensual: en año bisiesto el 31 de enero cae en 29 de febrero', () => {
    expect(serie('2028-01-31', 'monthly', 3)).toEqual(['2028-01-31', '2028-02-29', '2028-03-31']);
  });

  it('mensual: un 30 se recorta solo en febrero', () => {
    expect(serie('2026-01-30', 'monthly', 4)).toEqual(['2026-01-30', '2026-02-28', '2026-03-30', '2026-04-30']);
  });

  it('mensual: cruza el fin de año sin desfasarse', () => {
    expect(serie('2026-11-15', 'monthly', 4)).toEqual(['2026-11-15', '2026-12-15', '2027-01-15', '2027-02-15']);
  });

  it('semanal y quincenal avanzan 7 y 14 días exactos', () => {
    expect(serie('2026-02-25', 'weekly', 3)).toEqual(['2026-02-25', '2026-03-04', '2026-03-11']);
    expect(serie('2026-02-25', 'biweekly', 3)).toEqual(['2026-02-25', '2026-03-11', '2026-03-25']);
  });

  it('anual: un 29/02 se recorta al 28 en años no bisiestos y no se queda pegado', () => {
    expect(serie('2028-02-29', 'yearly', 5)).toEqual([
      '2028-02-29',
      '2029-02-28',
      '2030-02-28',
      '2031-02-28',
      '2032-02-29',
    ]);
  });
});

describe('calculatePendingOccurrences', () => {
  const base = {
    start_date: parseDateOnly('2026-01-31'),
    frequency: 'monthly',
    next_run_date: parseDateOnly('2026-01-31'),
    installments_generated: 0,
    installments_total: 3 as number | null,
    active: true,
  };

  it('devuelve una cuota por cada período vencido, con su fecha y número', () => {
    const pending = calculatePendingOccurrences(base, parseDateOnly('2026-03-05'));
    expect(pending.map(p => [p.installment_number, p.date_string])).toEqual([
      [1, '2026-01-31'],
      [2, '2026-02-28'],
    ]);
  });

  it('no devuelve nada si la próxima cuota todavía no vence', () => {
    expect(calculatePendingOccurrences(base, parseDateOnly('2026-01-30'))).toEqual([]);
  });

  it('incluye la cuota que vence hoy', () => {
    expect(calculatePendingOccurrences(base, parseDateOnly('2026-01-31'))).toHaveLength(1);
  });

  it('nunca supera el total de cuotas pactado', () => {
    const pending = calculatePendingOccurrences(base, parseDateOnly('2030-01-01'));
    expect(pending).toHaveLength(3);
    expect(pending[2].date_string).toBe('2026-03-31');
  });

  it('respeta el estado ya avanzado: arranca en next_run_date con el número correcto', () => {
    const pending = calculatePendingOccurrences(
      { ...base, installments_generated: 2, next_run_date: parseDateOnly('2026-03-31') },
      parseDateOnly('2026-06-01'),
    );
    expect(pending.map(p => [p.installment_number, p.date_string])).toEqual([[3, '2026-03-31']]);
  });

  it('una recurrencia pausada no acumula pendientes', () => {
    expect(calculatePendingOccurrences({ ...base, active: false }, parseDateOnly('2030-01-01'))).toEqual([]);
  });

  it('una suscripción indefinida se corta en el tope de seguridad', () => {
    const pending = calculatePendingOccurrences(
      { ...base, installments_total: null, frequency: 'weekly' },
      parseDateOnly('2036-01-01'),
    );
    expect(pending).toHaveLength(MAX_PENDING_OCCURRENCES);
  });
});
