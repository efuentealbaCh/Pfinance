import {
  calculateVariation,
  currentMonthKey,
  previousMonthKey,
  resolveMonthPeriod,
} from './monthly-period.util';

describe('currentMonthKey', () => {
  it('devuelve el mes de la fecha de referencia en YYYY-MM', () => {
    expect(currentMonthKey(new Date(2026, 8, 7, 12, 0, 0))).toBe('2026-09');
  });

  it('rellena con cero los meses de un dígito', () => {
    expect(currentMonthKey(new Date(2026, 0, 31))).toBe('2026-01');
  });
});

describe('previousMonthKey', () => {
  it('retrocede un mes dentro del mismo año', () => {
    expect(previousMonthKey('2026-09')).toBe('2026-08');
  });

  it('retrocede de año en enero', () => {
    expect(previousMonthKey('2026-01')).toBe('2025-12');
  });
});

describe('resolveMonthPeriod', () => {
  it('resuelve el rango completo de un mes de 31 días', () => {
    expect(resolveMonthPeriod('2026-08')).toEqual({
      key: '2026-08',
      from: '2026-08-01',
      to: '2026-08-31',
      label: 'Agosto 2026',
    });
  });

  it('resuelve el rango de un mes de 30 días', () => {
    expect(resolveMonthPeriod('2026-04').to).toBe('2026-04-30');
  });

  it('resuelve febrero en un año bisiesto', () => {
    expect(resolveMonthPeriod('2028-02').to).toBe('2028-02-29');
  });

  it('resuelve febrero en un año no bisiesto', () => {
    expect(resolveMonthPeriod('2026-02').to).toBe('2026-02-28');
  });

  it('rechaza formatos inválidos', () => {
    expect(() => resolveMonthPeriod('2026-13')).toThrow();
    expect(() => resolveMonthPeriod('2026-00')).toThrow();
    expect(() => resolveMonthPeriod('agosto')).toThrow();
    expect(() => resolveMonthPeriod('2026-8')).toThrow();
    expect(() => resolveMonthPeriod(undefined as unknown as string)).toThrow();
  });
});

describe('calculateVariation', () => {
  it('informa un aumento con su porcentaje', () => {
    expect(calculateVariation(115_000, 100_000)).toEqual({
      previous: 100_000,
      difference: 15_000,
      percentage: 15,
      direction: 'up',
    });
  });

  it('informa una baja con porcentaje negativo', () => {
    const variation = calculateVariation(80_000, 100_000);
    expect(variation.difference).toBe(-20_000);
    expect(variation.percentage).toBe(-20);
    expect(variation.direction).toBe('down');
  });

  it('informa que no hubo cambio', () => {
    const variation = calculateVariation(100_000, 100_000);
    expect(variation.difference).toBe(0);
    expect(variation.percentage).toBe(0);
    expect(variation.direction).toBe('flat');
  });

  // El caso que rompe una división ingenua: sin mes anterior no hay base de comparación.
  it('devuelve percentage null cuando el mes anterior fue 0, sin Infinity ni NaN', () => {
    const variation = calculateVariation(500_000, 0);
    expect(variation.percentage).toBeNull();
    expect(variation.difference).toBe(500_000);
    expect(variation.direction).toBe('up');
  });

  it('devuelve percentage null cuando ambos meses fueron 0', () => {
    const variation = calculateVariation(0, 0);
    expect(variation.percentage).toBeNull();
    expect(variation.difference).toBe(0);
    expect(variation.direction).toBe('flat');
  });

  it('no arrastra ruido de punto flotante', () => {
    const variation = calculateVariation(0.1 + 0.2, 0.3);
    expect(variation.difference).toBe(0);
    expect(variation.direction).toBe('flat');
  });
});
