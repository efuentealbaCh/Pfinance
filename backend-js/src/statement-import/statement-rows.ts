import { createHash } from 'crypto';
import { parseStatementAmount, parseStatementDate } from '../common/statement-format.util';
import { ColumnMapping, ColumnRole } from './column-detection';

/**
 * Extracción de las filas de una cartola a movimientos listos para importar.
 *
 * Nada de acá escribe en la base: produce el resultado que se muestra en la previsualización y
 * que después se confirma tal cual. Que sea la misma función la que arma la vista previa y la que
 * arma lo que se importa es lo que garantiza que el usuario apruebe exactamente lo que va a pasar.
 */

/** Un movimiento ya interpretado, listo para convertirse en transacción. */
export interface StatementRow {
  /** Índice de la fila en la grilla del archivo, para poder señalarla en la previsualización. */
  rowIndex: number;
  date: Date;
  description: string;
  /** Monto siempre positivo; el signo lo lleva `type`. */
  amount: number;
  type: 'income' | 'expense';
  /** Número de documento u operación, si la cartola lo trae. */
  reference: string | null;
  /** Huella que identifica esta fila para no importarla dos veces. */
  fingerprint: string;
}

/** Una fila que no se pudo interpretar, con el motivo para mostrárselo al usuario. */
export interface SkippedRow {
  rowIndex: number;
  reason: string;
  /** Contenido de la fila, recortado, para que el usuario la reconozca. */
  preview: string;
}

/** Resultado de recorrer la tabla de movimientos. */
export interface ExtractedStatement {
  rows: StatementRow[];
  skipped: SkippedRow[];
  /** Saldo de cierre que declara la última fila con saldo, si la cartola trae esa columna. */
  closingBalance: number | null;
}

/** Descripción con la que se guarda un movimiento cuya glosa venía vacía. */
const FALLBACK_DESCRIPTION = 'Movimiento importado';

/** Largo máximo del texto de muestra de una fila descartada. */
const PREVIEW_LENGTH = 120;

/**
 * Interpreta las filas de la tabla de movimientos.
 *
 * Solo se recorre el rango `firstDataRow`..`lastDataRow` del mapeo: lo que está fuera de la tabla
 * son apéndices del banco, y en al menos un caso real (el `Resumen de Comisiones` de Santander)
 * repiten movimientos que ya estaban listados.
 *
 * @param grid grilla del archivo
 * @param mapping estructura detectada o confirmada por el usuario
 * @returns los movimientos interpretados, los descartados con su motivo, y el saldo de cierre
 */
export function extractStatementRows(grid: unknown[][], mapping: ColumnMapping): ExtractedStatement {
  const rows: StatementRow[] = [];
  const skipped: SkippedRow[] = [];

  /** Cuántas veces se vio ya cada combinación de fecha, monto, tipo y glosa. */
  const occurrences = new Map<string, number>();

  for (let index = mapping.firstDataRow; index <= mapping.lastDataRow && index < grid.length; index++) {
    const row = grid[index] ?? [];

    // Una fila totalmente vacía no es un problema que valga la pena reportar.
    if (!row.some(cell => cell !== null && cell !== undefined && String(cell).trim() !== '')) continue;

    const date = readDate(row, mapping);
    const movement = readAmount(row, mapping);

    if (!date && !movement) {
      skipped.push({ rowIndex: index, reason: 'La fila no tiene fecha ni monto.', preview: previewOf(row) });
      continue;
    }
    if (!date) {
      skipped.push({ rowIndex: index, reason: 'No se pudo leer la fecha.', preview: previewOf(row) });
      continue;
    }
    if (!movement) {
      skipped.push({ rowIndex: index, reason: 'No se pudo leer el monto.', preview: previewOf(row) });
      continue;
    }
    if (movement.amount === 0) {
      skipped.push({ rowIndex: index, reason: 'El monto es cero.', preview: previewOf(row) });
      continue;
    }

    const description = readText(row, mapping.columns.description) || FALLBACK_DESCRIPTION;
    const reference = readText(row, mapping.columns.reference) || null;

    // El índice de repetición hace que dos compras idénticas del mismo día se importen las dos, y
    // que al reimportar la misma cartola vuelvan a dar las mismas dos huellas y no se dupliquen.
    const identity = [toDateKey(date), movement.amount, movement.type, normalizeDescription(description)].join('|');
    const occurrence = occurrences.get(identity) ?? 0;
    occurrences.set(identity, occurrence + 1);

    rows.push({
      rowIndex: index,
      date,
      description,
      amount: movement.amount,
      type: movement.type,
      reference,
      fingerprint: fingerprintOf(identity, occurrence),
    });
  }

  return { rows, skipped, closingBalance: readClosingBalance(grid, mapping) };
}

/**
 * Lee la fecha de una fila, usando el período de la cartola para las que vienen sin año.
 *
 * @param row fila a leer
 * @param mapping estructura de la cartola
 * @returns la fecha, o `null` si no se pudo interpretar
 */
function readDate(row: unknown[], mapping: ColumnMapping): Date | null {
  if (mapping.columns.date === undefined) return null;
  return parseStatementDate(row[mapping.columns.date], mapping.period);
}

/**
 * Lee el monto de una fila y decide si es ingreso o gasto.
 *
 * Con el par cargo/abono, la columna en la que aparece el número ya dice el tipo. Con una sola
 * columna de monto, lo dice el signo, interpretado según `positiveMeans`: en una cartola de
 * tarjeta que solo lista consumos, un número positivo es un gasto y no un ingreso.
 *
 * @param row fila a leer
 * @param mapping estructura de la cartola
 * @returns el monto en positivo y su tipo, o `null` si la fila no trae monto
 */
function readAmount(row: unknown[], mapping: ColumnMapping): { amount: number; type: 'income' | 'expense' } | null {
  if (mapping.shape === 'debit_credit') {
    const debit = readNumber(row, mapping.columns.debit);
    const credit = readNumber(row, mapping.columns.credit);

    // Si el banco llenó las dos columnas, manda la de mayor valor absoluto: la otra suele ser un
    // cero de relleno, y elegir al azar cambiaría el signo del movimiento.
    if (debit !== null && credit !== null) {
      if (Math.abs(debit) >= Math.abs(credit)) return { amount: Math.abs(debit), type: 'expense' };
      return { amount: Math.abs(credit), type: 'income' };
    }
    if (debit !== null) return { amount: Math.abs(debit), type: 'expense' };
    if (credit !== null) return { amount: Math.abs(credit), type: 'income' };
    return null;
  }

  const amount = readNumber(row, mapping.columns.amount);
  if (amount === null) return null;

  const positiveType = mapping.positiveMeans;
  const negativeType = positiveType === 'income' ? 'expense' : 'income';

  return { amount: Math.abs(amount), type: amount < 0 ? negativeType : positiveType };
}

/**
 * Lee una celda numérica.
 *
 * @param row fila a leer
 * @param column índice de columna, o `undefined` si ese papel no está mapeado
 * @returns el número, o `null`
 */
function readNumber(row: unknown[], column: number | undefined): number | null {
  if (column === undefined) return null;
  return parseStatementAmount(row[column]);
}

/**
 * Lee una celda de texto, colapsando los espacios.
 *
 * @param row fila a leer
 * @param column índice de columna, o `undefined` si ese papel no está mapeado
 * @returns el texto limpio, o cadena vacía
 */
function readText(row: unknown[], column: number | undefined): string {
  if (column === undefined) return '';
  const value = row[column];
  if (value === null || value === undefined) return '';
  return String(value).replace(/\s+/g, ' ').trim();
}

/**
 * Busca el saldo de cierre: el último valor de la columna de saldo dentro de la tabla.
 *
 * Se ofrece en la previsualización para que el usuario pueda dejar la cuenta cuadrada con el
 * banco después de importar, en vez de tener que calcularlo a mano.
 *
 * @param grid grilla del archivo
 * @param mapping estructura de la cartola
 * @returns el saldo de cierre, o `null` si la cartola no trae columna de saldo
 */
function readClosingBalance(grid: unknown[][], mapping: ColumnMapping): number | null {
  if (mapping.columns.balance === undefined) return null;

  const limit = Math.min(mapping.lastDataRow, grid.length - 1);
  for (let index = limit; index >= mapping.firstDataRow; index--) {
    const balance = parseStatementAmount(grid[index]?.[mapping.columns.balance]);
    if (balance !== null) return balance;
  }

  return null;
}

/**
 * Normaliza una glosa para la huella.
 *
 * Se colapsan espacios y se pasa a minúsculas para que una diferencia de formato entre dos
 * descargas de la misma cartola no genere dos huellas distintas y termine duplicando el movimiento.
 *
 * @param description glosa del movimiento
 * @returns la glosa normalizada
 */
function normalizeDescription(description: string): string {
  return description.replace(/\s+/g, ' ').trim().toLowerCase();
}

/**
 * Arma la huella de una fila.
 *
 * @param identity fecha, monto, tipo y glosa ya combinados
 * @param occurrence cuántas filas idénticas se vieron antes en la misma cartola
 * @returns el hash hexadecimal de 64 caracteres
 */
function fingerprintOf(identity: string, occurrence: number): string {
  return createHash('sha256').update(`${identity}|${occurrence}`).digest('hex');
}

/**
 * Fecha en formato `YYYY-MM-DD`, para que la huella no dependa de la zona horaria.
 *
 * @param date fecha a convertir
 * @returns la fecha como texto
 */
function toDateKey(date: Date): string {
  return date.toISOString().split('T')[0];
}

/**
 * Arma un texto corto con el contenido de una fila descartada.
 *
 * @param row fila a describir
 * @returns las celdas no vacías unidas, recortadas
 */
function previewOf(row: unknown[]): string {
  return row
    .filter(cell => cell !== null && cell !== undefined && String(cell).trim() !== '')
    .map(cell => String(cell).trim())
    .join(' | ')
    .slice(0, PREVIEW_LENGTH);
}

/** Papeles que el usuario puede reasignar a mano desde la previsualización. */
export const ASSIGNABLE_ROLES: ColumnRole[] = ['date', 'description', 'amount', 'debit', 'credit', 'balance', 'reference'];
