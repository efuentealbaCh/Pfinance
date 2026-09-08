import {
  DEFAULT_CURRENCY,
  formatAmount,
  isSupportedCurrency,
  normalizeCurrency,
  roundToCurrency,
  toDateKey,
} from './currency.util';

describe('isSupportedCurrency', () => {
  it('acepta las monedas soportadas', () => {
    expect(isSupportedCurrency('CLP')).toBe(true);
    expect(isSupportedCurrency('USD')).toBe(true);
  });

  it('rechaza monedas fuera de alcance y valores que no son string', () => {
    expect(isSupportedCurrency('EUR')).toBe(false);
    expect(isSupportedCurrency('clp')).toBe(false);
    expect(isSupportedCurrency(null)).toBe(false);
    expect(isSupportedCurrency(undefined)).toBe(false);
    expect(isSupportedCurrency(123)).toBe(false);
  });
});

describe('normalizeCurrency', () => {
  it('devuelve la moneda cuando es válida', () => {
    expect(normalizeCurrency('USD')).toBe('USD');
  });

  it('cae al default ante cualquier valor inesperado de la base', () => {
    expect(normalizeCurrency('EUR')).toBe(DEFAULT_CURRENCY);
    expect(normalizeCurrency(null)).toBe(DEFAULT_CURRENCY);
    expect(normalizeCurrency('')).toBe(DEFAULT_CURRENCY);
  });
});

describe('roundToCurrency', () => {
  it('deja el peso chileno sin decimales', () => {
    expect(roundToCurrency(93631.6, 'CLP')).toBe(93632);
    expect(roundToCurrency(93631.4, 'CLP')).toBe(93631);
  });

  it('deja el dólar con dos decimales', () => {
    expect(roundToCurrency(1068.0109, 'USD')).toBe(1068.01);
    expect(roundToCurrency(1068.0159, 'USD')).toBe(1068.02);
  });

  it('conserva el signo de los montos negativos', () => {
    expect(roundToCurrency(-1200.7, 'CLP')).toBe(-1201);
    expect(roundToCurrency(-0.005, 'USD')).toBe(-0);
  });

  it('no altera un monto que ya está en la precisión de su moneda', () => {
    expect(roundToCurrency(1000000, 'CLP')).toBe(1000000);
    expect(roundToCurrency(100, 'USD')).toBe(100);
  });
});

describe('formatAmount', () => {
  it('usa el formato chileno y sin decimales para CLP', () => {
    //   es el espacio duro que inserta Intl como separador de miles en es-CL.
    expect(formatAmount(1234567, 'CLP').replace(/ /g, ' ')).toBe('$1.234.567');
  });

  it('usa el formato en inglés y dos decimales para USD', () => {
    expect(formatAmount(1234.5, 'USD')).toBe('US$1,234.50');
  });

  it('muestra el cero de cada moneda con su propia precisión', () => {
    expect(formatAmount(0, 'CLP')).toBe('$0');
    expect(formatAmount(0, 'USD')).toBe('US$0.00');
  });
});

describe('toDateKey', () => {
  it('recorta la fecha del ISO', () => {
    expect(toDateKey(new Date('2026-09-07T00:00:00.000Z'))).toBe('2026-09-07');
  });

  it('mantiene el día para las fechas de mindicador, que llegan como medianoche de Chile en UTC', () => {
    // Chile está en UTC-3/UTC-4, así que su medianoche cae a las 03:00/04:00 UTC del MISMO día.
    expect(toDateKey(new Date('2026-09-07T03:00:00.000Z'))).toBe('2026-09-07');
    expect(toDateKey(new Date('2026-09-04T04:00:00.000Z'))).toBe('2026-09-04');
  });
});
