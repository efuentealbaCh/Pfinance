import { detectColumns } from './column-detection';
import { extractStatementRows } from './statement-rows';

/**
 * Cartola con el par cargo/abono y una columna de saldo, que es la forma más común en Chile.
 *
 * @param extra filas adicionales a agregar al final de la tabla
 * @returns la grilla
 */
function buildStatement(extra: unknown[][] = []): unknown[][] {
  return [
    ['Fecha', 'Detalle', 'Cargo', 'Abono', 'Saldo'],
    ['01/09/2026', 'Compra supermercado', '85.000', '', '915.000'],
    ['03/09/2026', 'Sueldo', '', '1.200.000', '2.115.000'],
    ['05/09/2026', 'Netflix', '12.900', '', '2.102.100'],
    ...extra,
  ];
}

describe('extractStatementRows', () => {
  it('interpreta cada fila con su fecha, monto y tipo', () => {
    const grid = buildStatement();
    const { rows } = extractStatementRows(grid, detectColumns(grid));

    expect(rows).toHaveLength(3);
    expect(rows[0]).toMatchObject({ description: 'Compra supermercado', amount: 85000, type: 'expense' });
    expect(rows[1]).toMatchObject({ description: 'Sueldo', amount: 1200000, type: 'income' });
    expect(rows[0].date.toISOString().split('T')[0]).toBe('2026-09-01');
  });

  it('lee el saldo de cierre de la última fila que lo trae', () => {
    const grid = buildStatement();
    const { closingBalance } = extractStatementRows(grid, detectColumns(grid));

    expect(closingBalance).toBe(2102100);
  });

  it('devuelve montos siempre positivos, con el signo en el tipo', () => {
    const grid = [
      ['Fecha', 'Glosa', 'Monto'],
      ['01/09/2026', 'Compra', '-85.000'],
      ['03/09/2026', 'Sueldo', '1.200.000'],
      ['05/09/2026', 'Otra compra', '-12.900'],
    ];
    const { rows } = extractStatementRows(grid, detectColumns(grid));

    expect(rows.map(row => [row.amount, row.type])).toEqual([
      [85000, 'expense'],
      [1200000, 'income'],
      [12900, 'expense'],
    ]);
  });

  it('agrega el número de documento a la descripción', () => {
    const grid = [
      ['Fecha', 'Detalle', 'N° Documento', 'Cargo', 'Abono'],
      ['01/09/2026', 'Compra', '2142020', '85.000', ''],
      ['03/09/2026', 'Sueldo', '', '', '1.200.000'],
      ['05/09/2026', 'Netflix', '', '12.900', ''],
    ];
    const { rows } = extractStatementRows(grid, detectColumns(grid));

    expect(rows[0].reference).toBe('2142020');
    expect(rows[1].reference).toBeNull();
  });

  it('descarta la fila con monto cero y dice por qué', () => {
    const grid = buildStatement([['08/09/2026', 'Ajuste', '0', '', '2.102.100']]);
    const { rows, skipped } = extractStatementRows(grid, detectColumns(grid));

    expect(rows).toHaveLength(3);
    expect(skipped).toHaveLength(1);
    expect(skipped[0].reason).toContain('cero');
    // La muestra le permite al usuario reconocer cuál fila fue.
    expect(skipped[0].preview).toContain('Ajuste');
  });

  it('usa una descripción de respaldo cuando la glosa viene vacía', () => {
    const grid = buildStatement([['08/09/2026', '', '5.000', '', '2.097.100']]);
    const { rows } = extractStatementRows(grid, detectColumns(grid));

    expect(rows[3].description).toBe('Movimiento importado');
  });
});

describe('huellas de deduplicación', () => {
  it('da la misma huella al leer dos veces el mismo archivo', () => {
    const grid = buildStatement();
    const mapping = detectColumns(grid);

    const first = extractStatementRows(grid, mapping).rows.map(row => row.fingerprint);
    const second = extractStatementRows(grid, mapping).rows.map(row => row.fingerprint);

    expect(first).toEqual(second);
  });

  it('da huellas distintas a movimientos distintos', () => {
    const grid = buildStatement();
    const { rows } = extractStatementRows(grid, detectColumns(grid));

    expect(new Set(rows.map(row => row.fingerprint)).size).toBe(3);
  });

  it('distingue dos movimientos idénticos del mismo día', () => {
    // Dos cafés iguales el mismo día son dos gastos reales, no un duplicado: si compartieran
    // huella, el segundo nunca se podría importar.
    const grid = buildStatement([
      ['08/09/2026', 'Cafe', '3.000', '', ''],
      ['08/09/2026', 'Cafe', '3.000', '', ''],
    ]);
    const { rows } = extractStatementRows(grid, detectColumns(grid));

    expect(rows).toHaveLength(5);
    expect(rows[3].fingerprint).not.toBe(rows[4].fingerprint);
  });

  it('mantiene las huellas de los repetidos al releer el archivo', () => {
    // Es la otra mitad del caso anterior: los dos cafés tienen que dar SIEMPRE las mismas dos
    // huellas, o al reimportar la cartola se agregarían de nuevo.
    const grid = buildStatement([
      ['08/09/2026', 'Cafe', '3.000', '', ''],
      ['08/09/2026', 'Cafe', '3.000', '', ''],
    ]);
    const mapping = detectColumns(grid);

    const first = extractStatementRows(grid, mapping).rows.map(row => row.fingerprint);
    const second = extractStatementRows(grid, mapping).rows.map(row => row.fingerprint);

    expect(first).toEqual(second);
  });

  it('no cambia la huella por diferencias de espaciado en la glosa', () => {
    const spaced = buildStatement().map(row => [...row]);
    spaced[1][1] = '  Compra   supermercado  ';

    const a = extractStatementRows(buildStatement(), detectColumns(buildStatement())).rows[0].fingerprint;
    const b = extractStatementRows(spaced, detectColumns(spaced)).rows[0].fingerprint;

    expect(a).toBe(b);
  });

  it('no importa las filas que quedaron fuera de la tabla', () => {
    const grid = buildStatement([
      ['', '', 'Resumen de Comisiones', '', ''],
      ['05/09/2026', 'Netflix', '12.900', '', ''],
    ]);
    const mapping = detectColumns(grid);
    const { rows } = extractStatementRows(grid, mapping);

    // El movimiento repetido bajo el apéndice no entra, pese a ser una fila válida.
    expect(rows).toHaveLength(3);
    expect(mapping.rowsAfterTable).toBe(1);
  });
});
