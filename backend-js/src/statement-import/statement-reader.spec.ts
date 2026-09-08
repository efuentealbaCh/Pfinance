import * as XLSX from 'xlsx';
import { BadRequestException } from '@nestjs/common';
import { readStatement } from './statement-reader';
import { detectColumns } from './column-detection';

/**
 * Estos tests generan archivos de verdad (XLSX, XLS legacy y CSV) y los hacen pasar por el
 * lector, en vez de simular la librería. La integración con SheetJS, la codificación del texto y
 * la detección del separador son justo las partes donde un mock no probaría nada.
 */

/**
 * Índice del encabezado en la grilla YA LEÍDA, que no coincide con el del arreglo fuente: el
 * lector descarta las filas en blanco, así que la fila vacía número 5 del archivo desaparece y
 * todo lo que viene después sube un lugar.
 */
const HEADER_ROW_AFTER_READ = 4;

/** Filas de una cartola con la forma habitual: encabezado decorativo y el par cargo/abono. */
const STATEMENT_ROWS = [
  ['BANCO DE EJEMPLO'],
  ['Titular: Juan Pérez'],
  ['Cuenta Corriente N° 000-12345-67'],
  ['Período: 01/09/2026 al 30/09/2026'],
  [],
  ['Fecha', 'Descripción', 'Cargo', 'Abono', 'Saldo'],
  ['01/09/2026', 'Compra supermercado', '85.000', '', '915.000'],
  ['03/09/2026', 'Sueldo', '', '1.200.000', '2.115.000'],
  ['05/09/2026', 'Suscripción Netflix', '12.900', '', '2.102.100'],
  ['08/09/2026', 'Transferencia recibida', '', '50.000', '2.152.100'],
];

/**
 * Arma un archivo de planilla con las filas dadas.
 *
 * @param rows filas a escribir
 * @param bookType formato de salida de SheetJS
 * @returns el archivo como buffer
 */
function buildWorkbook(rows: unknown[][], bookType: XLSX.BookType): Buffer {
  const worksheet = XLSX.utils.aoa_to_sheet(rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Cartola');
  return XLSX.write(workbook, { type: 'buffer', bookType }) as Buffer;
}

describe('readStatement', () => {
  it('lee un XLSX conservando las filas decorativas de arriba', () => {
    const sheet = readStatement(buildWorkbook(STATEMENT_ROWS, 'xlsx'), 'cartola.xlsx');

    expect(sheet.name).toBe('Cartola');
    expect(String(sheet.rows[0][0])).toContain('BANCO DE EJEMPLO');
    expect(sheet.rows[HEADER_ROW_AFTER_READ]).toEqual(['Fecha', 'Descripción', 'Cargo', 'Abono', 'Saldo']);
  });

  it('lee el XLS legacy que todavía exportan varios bancos', () => {
    const sheet = readStatement(buildWorkbook(STATEMENT_ROWS, 'biff8'), 'cartola.xls');

    expect(sheet.rows[HEADER_ROW_AFTER_READ]).toEqual(['Fecha', 'Descripción', 'Cargo', 'Abono', 'Saldo']);
  });

  it('lee un CSV separado por punto y coma, que es lo que exporta Excel en Chile', () => {
    const csv = STATEMENT_ROWS.map(row => row.join(';')).join('\r\n');
    const sheet = readStatement(Buffer.from(csv, 'utf8'), 'cartola.csv');

    expect(sheet.rows[HEADER_ROW_AFTER_READ]).toEqual(['Fecha', 'Descripción', 'Cargo', 'Abono', 'Saldo']);
  });

  it('no confunde la coma decimal con el separador de columnas', () => {
    const rows = [
      ['Fecha', 'Detalle', 'Monto'],
      ['01/09/2026', 'Compra', '85.000,50'],
      ['03/09/2026', 'Sueldo', '1.200.000,00'],
    ];
    const csv = rows.map(row => row.join(';')).join('\n');
    const sheet = readStatement(Buffer.from(csv, 'utf8'), 'cartola.csv');

    expect(sheet.rows[1]).toEqual(['01/09/2026', 'Compra', '85.000,50']);
  });

  it('rescata las tildes de un CSV exportado en Latin-1', () => {
    const csv = STATEMENT_ROWS.map(row => row.join(';')).join('\n');
    const sheet = readStatement(Buffer.from(csv, 'latin1'), 'cartola.csv');

    expect(sheet.rows[HEADER_ROW_AFTER_READ][1]).toBe('Descripción');
    expect(String(sheet.rows[HEADER_ROW_AFTER_READ + 3][1])).toBe('Suscripción Netflix');
  });

  it('respeta el BOM de UTF-8 sin dejarlo pegado a la primera celda', () => {
    const csv = STATEMENT_ROWS.map(row => row.join(';')).join('\n');
    const sheet = readStatement(Buffer.concat([Buffer.from([0xef, 0xbb, 0xbf]), Buffer.from(csv, 'utf8')]), 'c.csv');

    expect(String(sheet.rows[0][0])).toBe('BANCO DE EJEMPLO');
  });

  it('rechaza un formato que no sabe leer', () => {
    expect(() => readStatement(Buffer.from('contenido'), 'cartola.pdf')).toThrow(BadRequestException);
    expect(() => readStatement(Buffer.from('contenido'), 'cartola')).toThrow(BadRequestException);
  });

  it('rechaza una planilla sin ninguna hoja con contenido', () => {
    expect(() => readStatement(buildWorkbook([], 'xlsx'), 'vacia.xlsx')).toThrow(BadRequestException);
  });
});

describe('readStatement + detectColumns', () => {
  it.each([
    ['XLSX', 'xlsx' as XLSX.BookType, 'cartola.xlsx'],
    ['XLS legacy', 'biff8' as XLSX.BookType, 'cartola.xls'],
  ])('interpreta la cartola completa desde un archivo %s', (_label, bookType, filename) => {
    const sheet = readStatement(buildWorkbook(STATEMENT_ROWS, bookType), filename);
    const mapping = detectColumns(sheet.rows);

    expect(mapping.headerRow).toBe(HEADER_ROW_AFTER_READ);
    expect(mapping.shape).toBe('debit_credit');
    expect(mapping.columns).toEqual({ date: 0, description: 1, debit: 2, credit: 3, balance: 4 });
    expect(mapping.warnings).toEqual([]);
  });

  it('interpreta la cartola completa desde un CSV en Latin-1', () => {
    const csv = STATEMENT_ROWS.map(row => row.join(';')).join('\n');
    const sheet = readStatement(Buffer.from(csv, 'latin1'), 'cartola.csv');
    const mapping = detectColumns(sheet.rows);

    expect(mapping.headerRow).toBe(HEADER_ROW_AFTER_READ);
    expect(mapping.columns).toEqual({ date: 0, description: 1, debit: 2, credit: 3, balance: 4 });
  });
});
