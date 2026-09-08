import { parseStatementAmount, parseStatementDate } from './statement-format.util';

describe('parseStatementAmount', () => {
  it('lee el formato chileno donde el punto agrupa miles', () => {
    // El caso que motiva toda esta función: parseFloat('1.234.567') daría 1.234.
    expect(parseStatementAmount('1.234.567')).toBe(1234567);
    expect(parseStatementAmount('1.500')).toBe(1500);
    expect(parseStatementAmount('850')).toBe(850);
  });

  it('lee el formato chileno con decimales', () => {
    expect(parseStatementAmount('1.234.567,89')).toBe(1234567.89);
    expect(parseStatementAmount('12,50')).toBe(12.5);
  });

  it('lee el formato inglés que usan algunas exportaciones', () => {
    expect(parseStatementAmount('1,234,567.89')).toBe(1234567.89);
    expect(parseStatementAmount('12.50')).toBe(12.5);
  });

  it('acepta números tal cual vienen de una celda de planilla', () => {
    expect(parseStatementAmount(1234567)).toBe(1234567);
    expect(parseStatementAmount(-850.25)).toBe(-850.25);
    expect(parseStatementAmount(0)).toBe(0);
  });

  it('saca el símbolo de moneda y los espacios, incluido el espacio duro', () => {
    expect(parseStatementAmount('$1.234.567')).toBe(1234567);
    expect(parseStatementAmount(' 1.234.567 ')).toBe(1234567);
    expect(parseStatementAmount('1.234.567 CLP')).toBe(1234567);
    expect(parseStatementAmount('$ 1.234.567')).toBe(1234567);
  });

  it('interpreta los negativos en sus distintas escrituras', () => {
    expect(parseStatementAmount('-1.234.567')).toBe(-1234567);
    expect(parseStatementAmount('1.234.567-')).toBe(-1234567);
    expect(parseStatementAmount('(1.234.567)')).toBe(-1234567);
    expect(parseStatementAmount('+1.234.567')).toBe(1234567);
  });

  it('trata como vacía la celda de cargo o abono que no se usa en esa fila', () => {
    expect(parseStatementAmount('')).toBeNull();
    expect(parseStatementAmount('   ')).toBeNull();
    expect(parseStatementAmount('-')).toBeNull();
    expect(parseStatementAmount(null)).toBeNull();
    expect(parseStatementAmount(undefined)).toBeNull();
  });

  it('rechaza lo que no es un monto en vez de arriesgar un número', () => {
    expect(parseStatementAmount('Saldo inicial')).toBeNull();
    expect(parseStatementAmount('12/09/2026')).toBeNull();
    expect(parseStatementAmount('1.2.3')).toBeNull();
    expect(parseStatementAmount(NaN)).toBeNull();
  });

  it('rechaza una agrupación de miles inconsistente', () => {
    // Si los grupos no son de 3 dígitos, el número no se entendió y no hay que inventarlo.
    expect(parseStatementAmount('1.2345')).toBeNull();
    expect(parseStatementAmount('12.34.567')).toBeNull();
  });
});

describe('parseStatementDate', () => {
  const key = (date: Date | null) => (date ? date.toISOString().split('T')[0] : null);

  it('lee el formato día/mes/año chileno', () => {
    expect(key(parseStatementDate('07/09/2026'))).toBe('2026-09-07');
    expect(key(parseStatementDate('31/01/2026'))).toBe('2026-01-31');
    expect(key(parseStatementDate('07-09-2026'))).toBe('2026-09-07');
    expect(key(parseStatementDate('07.09.2026'))).toBe('2026-09-07');
  });

  it('lee el formato ISO', () => {
    expect(key(parseStatementDate('2026-09-07'))).toBe('2026-09-07');
    expect(key(parseStatementDate('2026-09-07T13:45:00'))).toBe('2026-09-07');
  });

  it('expande el año de dos dígitos', () => {
    expect(key(parseStatementDate('07/09/26'))).toBe('2026-09-07');
    expect(key(parseStatementDate('07/09/85'))).toBe('1985-09-07');
  });

  it('invierte a mes/día solo cuando el orden es inequívoco', () => {
    // 25 no puede ser un mes, así que 25/12 es día/mes: no hay nada que invertir.
    expect(key(parseStatementDate('25/12/2026'))).toBe('2026-12-25');
    // Acá el primero sí podría ser mes, pero el segundo no: el archivo viene en mes/día.
    expect(key(parseStatementDate('12/25/2026'))).toBe('2026-12-25');
    // Ambos son válidos como mes: se respeta la convención chilena de día/mes.
    expect(key(parseStatementDate('07/09/2026'))).toBe('2026-09-07');
  });

  it('convierte el serial numérico de Excel', () => {
    // 46272 es el serial de Excel para el 7 de septiembre de 2026.
    expect(key(parseStatementDate(46272))).toBe('2026-09-07');
  });

  it('descarta la hora de un serial de Excel con parte decimal', () => {
    expect(key(parseStatementDate(46272.75))).toBe('2026-09-07');
  });

  it('usa las partes UTC de un Date ya construido por la librería', () => {
    expect(key(parseStatementDate(new Date('2026-09-07T00:00:00.000Z')))).toBe('2026-09-07');
  });

  it('rechaza una fecha que no existe en vez de correrla al mes siguiente', () => {
    // Date.UTC(2026, 1, 31) devolvería el 3 de marzo sin avisar. Un 31 de febrero en una
    // cartola significa que la columna se leyó mal.
    expect(parseStatementDate('31/02/2026')).toBeNull();
    expect(parseStatementDate('00/09/2026')).toBeNull();
  });

  it('rechaza lo que no es una fecha', () => {
    expect(parseStatementDate('')).toBeNull();
    expect(parseStatementDate('Fecha')).toBeNull();
    expect(parseStatementDate('1.234.567')).toBeNull();
    expect(parseStatementDate(null)).toBeNull();
    // Fuera del rango de seriales aceptado: un monto no puede confundirse con una fecha.
    expect(parseStatementDate(5)).toBeNull();
    expect(parseStatementDate(1234567)).toBeNull();
  });
});

describe('parseStatementDate con fechas sin año', () => {
  const key = (date: Date | null) => (date ? date.toISOString().split('T')[0] : null);

  /** Período de una cartola mensual, como el que declara la cabecera de Santander. */
  const AGOSTO = {
    from: new Date(Date.UTC(2026, 6, 31)),
    to: new Date(Date.UTC(2026, 7, 31)),
  };

  it('le pone el año del período a una fecha que viene solo como día/mes', () => {
    // Santander escribe `03/08` en el detalle de movimientos: el año está únicamente
    // en el `Desde`/`Hasta` de la cabecera.
    expect(key(parseStatementDate('03/08', AGOSTO))).toBe('2026-08-03');
    expect(key(parseStatementDate('31/07', AGOSTO))).toBe('2026-07-31');
  });

  it('rechaza la fecha sin año cuando no hay período con qué resolverla', () => {
    // Adivinar el año sería inventar el dato más importante de la transacción.
    expect(parseStatementDate('03/08')).toBeNull();
    expect(parseStatementDate('03/08', null)).toBeNull();
  });

  it('resuelve bien una cartola que cruza el fin de año', () => {
    const period = { from: new Date(Date.UTC(2025, 11, 15)), to: new Date(Date.UTC(2026, 0, 15)) };

    expect(key(parseStatementDate('28/12', period))).toBe('2025-12-28');
    expect(key(parseStatementDate('05/01', period))).toBe('2026-01-05');
  });

  it('usa el año más cercano cuando la fecha cae fuera del período declarado', () => {
    // Un movimiento fuera del rango existe igual: mejor importarlo con el año más plausible
    // que descartar una transacción real.
    expect(key(parseStatementDate('25/09', AGOSTO))).toBe('2026-09-25');
  });

  it('sigue respetando la convención día/mes con el período puesto', () => {
    const anio = { from: new Date(Date.UTC(2026, 0, 1)), to: new Date(Date.UTC(2026, 11, 31)) };

    expect(key(parseStatementDate('07/09', anio))).toBe('2026-09-07');
    // Acá el primero no puede ser mes, así que el orden es inequívoco.
    expect(key(parseStatementDate('25/12', anio))).toBe('2026-12-25');
  });

  it('no confunde un número suelto con una fecha sin año', () => {
    expect(parseStatementDate('4089', AGOSTO)).toBeNull();
    expect(parseStatementDate('2142020', AGOSTO)).toBeNull();
  });
});
