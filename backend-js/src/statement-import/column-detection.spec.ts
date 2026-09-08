import { detectColumns } from './column-detection';
import { parseStatementAmount, parseStatementDate } from '../common/statement-format.util';

/**
 * Las grillas de estos tests imitan la forma de una cartola chilena: filas decorativas arriba
 * (titular, cuenta, período), el encabezado recién después, y el par cargo/abono en columnas
 * separadas, que es lo habitual acá.
 *
 * No son archivos de un banco real: reproducen la estructura, no un formato verificado.
 */

describe('detectColumns', () => {
  it('encuentra el encabezado aunque tenga filas decorativas encima', () => {
    const rows: unknown[][] = [
      ['BANCO DE EJEMPLO', null, null, null],
      ['Titular: Juan Perez', null, null, null],
      ['Cuenta Corriente N° 000-12345-67', null, null, null],
      ['Período: 01/09/2026 al 30/09/2026', null, null, null],
      [],
      ['Fecha', 'Descripción', 'Cargo', 'Abono'],
      ['01/09/2026', 'Compra supermercado', '85.000', null],
      ['03/09/2026', 'Sueldo', null, '1.200.000'],
      ['05/09/2026', 'Netflix', '12.900', null],
      ['08/09/2026', 'Transferencia recibida', null, '50.000'],
    ];

    const mapping = detectColumns(rows);

    expect(mapping.headerRow).toBe(5);
    expect(mapping.firstDataRow).toBe(6);
    expect(mapping.source).toBe('headers');
    expect(mapping.columns).toEqual({ date: 0, description: 1, debit: 2, credit: 3 });
    expect(mapping.shape).toBe('debit_credit');
  });

  it('no confunde la columna de saldo con la de monto', () => {
    const rows: unknown[][] = [
      ['Fecha', 'Detalle', 'Cargo', 'Abono', 'Saldo'],
      ['01/09/2026', 'Compra', '85.000', null, '915.000'],
      ['03/09/2026', 'Sueldo', null, '1.200.000', '2.115.000'],
      ['05/09/2026', 'Netflix', '12.900', null, '2.102.100'],
    ];

    const mapping = detectColumns(rows);

    expect(mapping.columns.balance).toBe(4);
    expect(mapping.columns.debit).toBe(2);
    expect(mapping.columns.credit).toBe(3);
    expect(mapping.shape).toBe('debit_credit');
  });

  it('reconoce el formato de una sola columna de monto con signo', () => {
    const rows: unknown[][] = [
      ['Fecha', 'Glosa', 'Monto'],
      ['01/09/2026', 'Compra', '-85.000'],
      ['03/09/2026', 'Sueldo', '1.200.000'],
      ['05/09/2026', 'Netflix', '-12.900'],
    ];

    const mapping = detectColumns(rows);

    expect(mapping.shape).toBe('signed');
    expect(mapping.positiveMeans).toBe('income');
    expect(mapping.columns).toEqual({ date: 0, description: 1, amount: 2 });
  });

  it('trata una cartola de solo cargos como gastos y lo avisa', () => {
    const rows: unknown[][] = [
      ['Fecha Transacción', 'Comercio', 'Monto Cargo'],
      ['01/09/2026', 'Supermercado', '85.000'],
      ['03/09/2026', 'Farmacia', '12.400'],
      ['05/09/2026', 'Bencina', '40.000'],
    ];

    const mapping = detectColumns(rows);

    expect(mapping.shape).toBe('signed');
    expect(mapping.positiveMeans).toBe('expense');
    expect(mapping.columns.amount).toBe(2);
    expect(mapping.warnings.join(' ')).toContain('gastos');
  });

  it('prefiere el título específico sobre el genérico que está contenido dentro', () => {
    // 'Fecha Transacción' contiene 'transaccion', que también es sinónimo de descripción.
    const rows: unknown[][] = [
      ['Fecha Transacción', 'Detalle', 'Cargo', 'Abono'],
      ['01/09/2026', 'Compra', '85.000', null],
      ['03/09/2026', 'Sueldo', null, '1.200.000'],
      ['05/09/2026', 'Netflix', '12.900', null],
    ];

    const mapping = detectColumns(rows);

    expect(mapping.columns.date).toBe(0);
    expect(mapping.columns.description).toBe(1);
  });

  it('tolera tildes, mayúsculas y puntuación en los títulos', () => {
    const rows: unknown[][] = [
      ['FECHA', 'DESCRIPCIÓN', 'CARGOS (CLP)', 'ABONOS (CLP)', 'N° OPERACIÓN'],
      ['01/09/2026', 'Compra', '85.000', null, '123456'],
      ['03/09/2026', 'Sueldo', null, '1.200.000', '123457'],
      ['05/09/2026', 'Netflix', '12.900', null, '123458'],
    ];

    const mapping = detectColumns(rows);

    expect(mapping.columns).toEqual({ date: 0, description: 1, debit: 2, credit: 3, reference: 4 });
  });

  it('descarta una columna cuyo título promete algo que el contenido no cumple', () => {
    const rows: unknown[][] = [
      ['Fecha', 'Detalle', 'Monto'],
      ['sin informar', 'Compra', '85.000'],
      ['sin informar', 'Sueldo', '1.200.000'],
      ['sin informar', 'Netflix', '12.900'],
    ];

    const mapping = detectColumns(rows);

    expect(mapping.columns.date).toBeUndefined();
    expect(mapping.warnings.join(' ')).toContain('no se lee como fechas');
  });

  it('deduce las columnas por contenido cuando no hay encabezados', () => {
    const rows: unknown[][] = [
      ['01/09/2026', 'Compra supermercado', '-85.000'],
      ['03/09/2026', 'Sueldo del mes', '1.200.000'],
      ['05/09/2026', 'Suscripción Netflix', '-12.900'],
      ['08/09/2026', 'Transferencia recibida', '50.000'],
    ];

    const mapping = detectColumns(rows);

    expect(mapping.source).toBe('content');
    expect(mapping.headerRow).toBeNull();
    expect(mapping.columns.date).toBe(0);
    expect(mapping.columns.amount).toBe(2);
    expect(mapping.columns.description).toBe(1);
    expect(mapping.warnings.join(' ')).toContain('No se reconoció una fila de encabezados');
  });

  it('lee las fechas que vienen como serial de Excel', () => {
    const rows: unknown[][] = [
      ['Fecha', 'Detalle', 'Cargo', 'Abono'],
      [46266, 'Compra', 85000, null],
      [46268, 'Sueldo', null, 1200000],
      [46270, 'Netflix', 12900, null],
    ];

    const mapping = detectColumns(rows);

    expect(mapping.columns.date).toBe(0);
    expect(mapping.columns.debit).toBe(2);
    expect(mapping.columns.credit).toBe(3);
  });
});

/**
 * Estructura de una cartola de Banco Santander, reconstruida a partir de un archivo real.
 *
 * Los datos son inventados; lo que se conserva del original es la forma, que es lo que rompía la
 * detección: cabecera de doce filas con el período, títulos de sección intercalados, fechas SIN
 * AÑO en el detalle, y un apéndice al final que repite un movimiento ya listado.
 */
const SANTANDER_ROWS: unknown[][] = [
  ['Banco Santander', null, '', '', 'Cartola de cuenta Corriente - Agosto 2026', null, null],
  ['Sr(a)', 'NOMBRE APELLIDO', '', '', 'Cartola N°', '40', ''],
  ['Rut', '11.111.111-1', '', '', 'Desde', '31/07/2026', ''],
  ['E-mail', 'CORREO@EJEMPLO.CL', '', '', 'Hasta', '31/08/2026', ''],
  ['INFORMACIÓN CUENTA CORRIENTE', null, null, null, null, null, null],
  ['Tipo de Cuenta:', 'CTA CTE', '', '', 'N° Cuenta:', '0-000-00-00000-0', ''],
  ['Saldo inicial:', '$100.000', '', '', 'Impuestos:', '$0', ''],
  ['DETALLE DE MOVIMIENTOS', null, null, null, null, 'SALDOS DIARIOS', null],
  ['FECHA', 'SUCURSAL', 'DESCRIPCIÓN', 'N° DOCUMENTO', 'CHEQUES Y OTROS CARGOS', 'DEPOSITOS Y OTROS ABONOS', 'SALDO'],
  ['03/08', 'Sucursal', 'Compra Nacional COMERCIO', '2142020', 23980, '', ''],
  ['05/08', 'Sucursal', 'Transf recibida', '', '', 500000, ''],
  ['27/08', 'Sucursal', 'COM.MANTENCION PLAN', '', 4089, '', ''],
  ['31/08', 'Sucursal', 'Compra Nacional OTRO', '2422020', 740, '', '571191'],
  ['', '', 'Resumen de Comisiones', '', '', '', ''],
  ['', '', '****************************', '', '', '', ''],
  ['27/08', 'Sucursal', 'COM.MANTENCION PLAN', '', 4089, '', ''],
  ['MENSAJES', null, null, null, null, null, null],
  ['"INFORMESE SOBRE LAS ENTIDADES AUTORIZADAS PARA EMITIR TARJETAS"', null, null, null, null, null, null],
];

describe('detectColumns sobre la estructura real de Santander', () => {
  it('encuentra el encabezado pese a los títulos de sección intercalados', () => {
    const mapping = detectColumns(SANTANDER_ROWS);

    // La fila 7, 'DETALLE DE MOVIMIENTOS' + 'SALDOS DIARIOS', también reconoce dos papeles;
    // gana la 8 porque reconoce seis.
    expect(mapping.headerRow).toBe(8);
    expect(mapping.columns).toEqual({ date: 0, description: 2, reference: 3, debit: 4, credit: 5, balance: 6 });
    expect(mapping.shape).toBe('debit_credit');
  });

  it('saca el período de la cabecera para poder fechar los movimientos', () => {
    const mapping = detectColumns(SANTANDER_ROWS);

    expect(mapping.period?.from.toISOString().split('T')[0]).toBe('2026-07-31');
    expect(mapping.period?.to.toISOString().split('T')[0]).toBe('2026-08-31');
  });

  it('corta la tabla donde empieza el apéndice y avisa del movimiento repetido', () => {
    const mapping = detectColumns(SANTANDER_ROWS);

    // La última fila de la tabla es la del 31/08; lo que sigue es 'Resumen de Comisiones'.
    expect(mapping.lastDataRow).toBe(12);
    expect(mapping.rowsAfterTable).toBe(1);
    expect(mapping.warnings.join(' ')).toContain('Resumen de Comisiones');
  });

  it('los movimientos de la tabla cuadran con el saldo declarado', () => {
    const mapping = detectColumns(SANTANDER_ROWS);

    let cargos = 0;
    let abonos = 0;
    for (let index = mapping.firstDataRow; index <= mapping.lastDataRow; index++) {
      cargos += parseStatementAmount(SANTANDER_ROWS[index][mapping.columns.debit!]) ?? 0;
      abonos += parseStatementAmount(SANTANDER_ROWS[index][mapping.columns.credit!]) ?? 0;
    }

    // 100.000 + 500.000 - 23.980 - 4.089 - 740 = 571.191, el saldo de la última fila.
    expect(100000 + abonos - cargos).toBe(571191);
    // Si el apéndice entrara, la comisión se contaría dos veces y daría 567.102.
    expect(cargos).toBe(28809);
  });

  it('fecha los movimientos con el año que sale del período', () => {
    const mapping = detectColumns(SANTANDER_ROWS);
    const first = parseStatementDate(SANTANDER_ROWS[mapping.firstDataRow][mapping.columns.date!], mapping.period);

    expect(first?.toISOString().split('T')[0]).toBe('2026-08-03');
  });
});
