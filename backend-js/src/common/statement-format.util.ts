/**
 * Parseo de los valores crudos de una cartola bancaria: montos y fechas.
 *
 * Es la parte más delicada de la importación. Un monto mal leído no falla ruidosamente: entra
 * como una transacción con un número equivocado y corrompe los saldos en silencio. Por eso, ante
 * cualquier ambigüedad que no se pueda resolver con certeza, estas funciones devuelven `null`
 * (la fila se marca como problemática en la previsualización) en vez de arriesgar un valor.
 */

/**
 * Textos con los que los bancos representan una celda vacía. Aparecen sobre todo en las columnas
 * de cargo/abono, donde una de las dos siempre está sin usar en cada fila.
 */
const EMPTY_PLACEHOLDERS = new Set(['', '-', '--', '---', 'n/a', 'na', 's/i', '.', ',']);

/**
 * Día 0 del calendario de Excel. Excel arrastra el bug histórico de considerar 1900 como año
 * bisiesto, así que su serial 1 corresponde al 1899-12-31 + 1 día contando ese 29 de febrero
 * inexistente; anclar en 1899-12-30 es lo que hace coincidir todas las fechas modernas.
 */
const EXCEL_EPOCH_UTC = Date.UTC(1899, 11, 30);

/** Rango de seriales de Excel que se aceptan como fecha: aproximadamente 1954 a 2119. */
const MIN_EXCEL_SERIAL = 20000;
const MAX_EXCEL_SERIAL = 80000;

/** Año de corte para expandir años de dos dígitos: `26` es 2026, `85` es 1985. */
const TWO_DIGIT_YEAR_PIVOT = 70;

/**
 * Rango de fechas que cubre la cartola, tomado de su cabecera.
 *
 * Hace falta porque varios bancos escriben las fechas de los movimientos sin año —Santander usa
 * `03/08`— y el único lugar del archivo donde aparece el año es el encabezado, en el `Desde` y
 * `Hasta` del período. Sin esto no hay forma de saber a qué año pertenece un movimiento.
 */
export interface StatementPeriod {
  from: Date;
  to: Date;
}

/**
 * Convierte el valor crudo de una celda de monto a número.
 *
 * El caso que obliga a escribir esto en vez de usar `parseFloat` es el formato chileno: en
 * `1.234.567` el punto es separador de miles, y `parseFloat` devolvería `1.234`. Un gasto de un
 * millón entraría como mil doscientos treinta y cuatro.
 *
 * La regla para decidir qué separador es el decimal:
 * - Si aparecen punto y coma, el que va **último** es el decimal (cubre `1.234.567,89` chileno y
 *   `1,234,567.89` en formato inglés, que algunos bancos usan en sus exportaciones).
 * - Si aparece uno solo, se mira cuántos dígitos lo siguen: 1 o 2 es decimal, 3 es separador de
 *   miles. Por eso `1.500` da 1500 y `12,50` da 12,5.
 *
 * @param raw valor de la celda, tal como vino del archivo
 * @returns el monto, o `null` si la celda está vacía o el formato no se puede interpretar con certeza
 */
export function parseStatementAmount(raw: unknown): number | null {
  if (raw === null || raw === undefined) return null;

  // Las celdas numéricas de un XLSX ya vienen como número: no hay separadores que interpretar.
  if (typeof raw === 'number') return Number.isFinite(raw) ? raw : null;

  let text = String(raw).trim();
  if (EMPTY_PLACEHOLDERS.has(text.toLowerCase())) return null;

  let negative = false;

  // Contabilidad clásica: los negativos entre paréntesis, `(1.234)` es -1234.
  if (text.startsWith('(') && text.endsWith(')')) {
    negative = true;
    text = text.slice(1, -1).trim();
  }

  // El espacio duro (U+00A0) aparece seguido en exportaciones hechas desde la web del banco.
  text = text.replace(/\s| /g, '').replace(/\$|CLP|USD/gi, '');

  // El signo puede venir adelante o atrás según el banco.
  if (text.startsWith('-')) {
    negative = !negative;
    text = text.slice(1);
  } else if (text.startsWith('+')) {
    text = text.slice(1);
  }
  if (text.endsWith('-')) {
    negative = !negative;
    text = text.slice(0, -1);
  }

  if (text === '' || !/^[\d.,]+$/.test(text) || !/\d/.test(text)) return null;

  const value = parseSeparators(text);
  if (value === null) return null;

  return negative ? -value : value;
}

/**
 * Interpreta los separadores de un número ya limpio de signos y símbolos.
 *
 * @param text solo dígitos, puntos y comas
 * @returns el valor absoluto, o `null` si la agrupación de miles es inconsistente
 */
function parseSeparators(text: string): number | null {
  const lastDot = text.lastIndexOf('.');
  const lastComma = text.lastIndexOf(',');

  let decimalSep: string | null = null;

  if (lastDot >= 0 && lastComma >= 0) {
    decimalSep = lastDot > lastComma ? '.' : ',';
  } else if (lastDot >= 0 || lastComma >= 0) {
    const sep = lastDot >= 0 ? '.' : ',';
    const occurrences = text.split(sep).length - 1;
    const digitsAfter = text.length - 1 - text.lastIndexOf(sep);

    // Más de una aparición solo puede ser agrupación de miles. Con una sola, 1 o 2 dígitos
    // detrás es un decimal y 3 es agrupación — que es la convención chilena para pesos.
    if (occurrences === 1 && (digitsAfter === 1 || digitsAfter === 2)) decimalSep = sep;
  }

  const thousandsSep = decimalSep === '.' ? ',' : '.';
  const [integerPart, decimalPart] = decimalSep
    ? splitOnce(text, decimalSep)
    : [text, ''];

  // Si lo que se tomó como agrupación de miles no viene en grupos de 3, el número no se entendió:
  // mejor marcar la fila como problemática que importar un monto inventado.
  const groups = integerPart.split(thousandsSep === '.' ? '.' : ',');
  if (groups.length > 1) {
    if (groups[0].length === 0 || groups[0].length > 3) return null;
    if (groups.slice(1).some(group => group.length !== 3)) return null;
  }

  // Un separador del otro tipo dentro de la parte decimal no tiene interpretación válida.
  if (decimalPart.includes('.') || decimalPart.includes(',')) return null;

  const cleaned = `${groups.join('')}${decimalPart ? `.${decimalPart}` : ''}`;
  const value = Number(cleaned);

  return Number.isFinite(value) ? value : null;
}

/**
 * Parte un texto en el separador indicado, solo en su última aparición.
 *
 * @param text texto a partir
 * @param separator carácter separador
 * @returns la parte previa y la posterior
 */
function splitOnce(text: string, separator: string): [string, string] {
  const index = text.lastIndexOf(separator);
  return [text.slice(0, index), text.slice(index + 1)];
}

/**
 * Convierte el valor crudo de una celda de fecha a una fecha UTC a medianoche.
 *
 * Acepta el serial numérico de Excel, un `Date` ya construido por la librería de planillas, y las
 * escrituras de texto habituales. Ante `07/09/2026` asume **día/mes**, que es la convención
 * chilena; solo cambia a mes/día cuando el primer número supera 12 y el segundo no, porque ahí
 * el orden es inequívoco.
 *
 * Con `period`, además acepta fechas sin año (`03/08`) y deduce a cuál pertenecen. Sin `period`
 * esas fechas se rechazan a propósito: adivinar el año sería inventar el dato más importante de
 * la transacción.
 *
 * @param raw valor de la celda, tal como vino del archivo
 * @param period rango que cubre la cartola, para darle año a las fechas que no lo traen
 * @returns la fecha a medianoche UTC, o `null` si no se puede interpretar
 */
export function parseStatementDate(raw: unknown, period?: StatementPeriod | null): Date | null {
  if (raw === null || raw === undefined) return null;

  if (raw instanceof Date) {
    return Number.isNaN(raw.getTime())
      ? null
      : buildDate(raw.getUTCFullYear(), raw.getUTCMonth() + 1, raw.getUTCDate());
  }

  if (typeof raw === 'number') {
    if (!Number.isFinite(raw) || raw < MIN_EXCEL_SERIAL || raw > MAX_EXCEL_SERIAL) return null;
    // Se trunca el serial: la parte decimal es la hora del día, que a la app no le interesa.
    const date = new Date(EXCEL_EPOCH_UTC + Math.floor(raw) * 86400000);
    return buildDate(date.getUTCFullYear(), date.getUTCMonth() + 1, date.getUTCDate());
  }

  const text = String(raw).trim();
  if (text === '') return null;

  const iso = /^(\d{4})[-/](\d{1,2})[-/](\d{1,2})(?:[T\s].*)?$/.exec(text);
  if (iso) return buildDate(Number(iso[1]), Number(iso[2]), Number(iso[3]));

  const dmy = /^(\d{1,2})[-/.](\d{1,2})[-/.](\d{2,4})(?:[T\s].*)?$/.exec(text);
  if (dmy) {
    const [day, month] = orderDayMonth(Number(dmy[1]), Number(dmy[2]));
    return buildDate(expandYear(Number(dmy[3])), month, day);
  }

  // Fecha sin año, como la que escribe Santander en el detalle de movimientos.
  const dayMonth = /^(\d{1,2})[-/.](\d{1,2})$/.exec(text);
  if (dayMonth && period) {
    const [day, month] = orderDayMonth(Number(dayMonth[1]), Number(dayMonth[2]));
    return resolveYearFromPeriod(day, month, period);
  }

  return null;
}

/**
 * Ordena dos números como día y mes.
 *
 * Se asume día/mes, que es la convención chilena. Solo se invierte cuando el orden es inequívoco:
 * el primero no puede ser un mes y el segundo sí.
 *
 * @param first primer número de la fecha
 * @param second segundo número de la fecha
 * @returns la dupla `[día, mes]`
 */
function orderDayMonth(first: number, second: number): [number, number] {
  if (first <= 12 && second > 12) return [second, first];
  return [first, second];
}

/**
 * Deduce a qué año pertenece una fecha que vino sin él.
 *
 * Se prueba cada año que toca el período y se elige el primero que deja la fecha dentro del
 * rango. Eso resuelve bien el caso difícil, una cartola que cruza el fin de año: con un período
 * del 15/12/2025 al 15/01/2026, el `28/12` cae en 2025 y el `05/01` en 2026.
 *
 * Si ningún año la deja dentro del rango —un movimiento fuera del período declarado— se usa el
 * año que la acerque más, en vez de descartar una transacción que existe de verdad.
 *
 * @param day día del mes
 * @param month mes de 1 a 12
 * @param period rango que cubre la cartola
 * @returns la fecha con el año deducido, o `null` si el día y mes no forman una fecha válida
 */
function resolveYearFromPeriod(day: number, month: number, period: StatementPeriod): Date | null {
  const firstYear = period.from.getUTCFullYear();
  const lastYear = period.to.getUTCFullYear();

  let closest: { date: Date; distance: number } | null = null;

  for (let year = firstYear; year <= lastYear; year++) {
    const candidate = buildDate(year, month, day);
    if (!candidate) continue;

    if (candidate >= period.from && candidate <= period.to) return candidate;

    const distance = Math.min(
      Math.abs(candidate.getTime() - period.from.getTime()),
      Math.abs(candidate.getTime() - period.to.getTime()),
    );
    if (!closest || distance < closest.distance) closest = { date: candidate, distance };
  }

  return closest ? closest.date : null;
}

/**
 * Expande un año de dos dígitos.
 *
 * @param year año tal como vino, de 2 o 4 dígitos
 * @returns el año de 4 dígitos
 */
function expandYear(year: number): number {
  if (year >= 100) return year;
  return year < TWO_DIGIT_YEAR_PIVOT ? 2000 + year : 1900 + year;
}

/**
 * Construye una fecha UTC a medianoche, verificando que exista de verdad.
 *
 * El chequeo importa porque `Date.UTC` no rechaza un 31 de febrero: lo corre al 3 de marzo. Una
 * fecha así en una cartola significa que la columna se interpretó mal, y conviene devolver `null`
 * para que la fila aparezca como problemática en vez de importarse con otro día.
 *
 * @param year año de 4 dígitos
 * @param month mes de 1 a 12
 * @param day día del mes
 * @returns la fecha, o `null` si la combinación no existe
 */
function buildDate(year: number, month: number, day: number): Date | null {
  if (month < 1 || month > 12 || day < 1 || day > 31) return null;

  const date = new Date(Date.UTC(year, month - 1, day));
  if (date.getUTCFullYear() !== year || date.getUTCMonth() !== month - 1 || date.getUTCDate() !== day) {
    return null;
  }

  return date;
}
