import { StatementPeriod, parseStatementAmount, parseStatementDate } from '../common/statement-format.util';

/**
 * Detección de qué significa cada columna de una cartola.
 *
 * Es la capa que absorbe las diferencias entre bancos. La idea de fondo: el destino es fijo y
 * chico —fecha, descripción, monto y si es cargo o abono—, y lo único que cambia de un banco a
 * otro es de qué columna sale cada cosa. Ese mapeo se adivina acá, se muestra al usuario para que
 * lo confirme o lo corrija, y recién después se importa.
 */

/** Papel que puede cumplir una columna de la cartola. */
export type ColumnRole = 'date' | 'description' | 'amount' | 'debit' | 'credit' | 'balance' | 'reference';

/** Cómo expresa el archivo si un movimiento suma o resta. */
export type StatementShape =
  /** Una sola columna de monto, donde el signo distingue ingreso de gasto. */
  | 'signed'
  /** Dos columnas separadas, cargo y abono, que es lo habitual en la banca chilena. */
  | 'debit_credit';

/** Resultado de interpretar la estructura del archivo. */
export interface ColumnMapping {
  /** Índice de la fila de encabezados, o `null` si se dedujo por el contenido. */
  headerRow: number | null;
  /** Primera fila con datos. */
  firstDataRow: number;
  /**
   * Última fila de la tabla de movimientos, inclusive.
   *
   * Existe porque la tabla no llega hasta el final del archivo: los bancos agregan apéndices
   * después (resúmenes de comisiones, textos legales) y algunos REPITEN ahí movimientos que ya
   * estaban listados. Importar esas filas duplicaría transacciones reales.
   */
  lastDataRow: number;
  /** Filas con forma de movimiento que quedaron fuera de la tabla y no se van a importar. */
  rowsAfterTable: number;
  /** Índice de columna asignado a cada papel detectado. */
  columns: Partial<Record<ColumnRole, number>>;
  shape: StatementShape;
  /** Con `shape` en `signed`, qué significa un monto positivo. */
  positiveMeans: 'income' | 'expense';
  /** Cómo se llegó al mapeo, para que la previsualización sea honesta sobre su confianza. */
  source: 'headers' | 'content';
  /**
   * Período que declara la cabecera de la cartola, o `null` si no se encontró.
   *
   * Se expone porque las fechas sin año dependen de él: quien extraiga las filas tiene que usar
   * exactamente el mismo período con el que se validó la columna, o el año saldría distinto.
   */
  period: StatementPeriod | null;
  /** Cosas que el usuario debería revisar antes de confirmar la importación. */
  warnings: string[];
}

/**
 * Nombres con los que los bancos titulan cada columna.
 *
 * Se comparan normalizados (sin tildes, en minúscula y sin puntuación), así que `N° Operación`,
 * `n operacion` y `N. OPERACION` caen todos en la misma entrada.
 */
const COLUMN_SYNONYMS: Record<ColumnRole, string[]> = {
  date: [
    'fecha',
    'fecha transaccion',
    'fecha de transaccion',
    'f transaccion',
    'fecha operacion',
    'fecha de operacion',
    'fecha movimiento',
    'fecha contable',
    'fecha compra',
    'date',
  ],
  description: [
    'descripcion',
    'descripcion movimiento',
    'detalle',
    'detalle movimiento',
    'glosa',
    'concepto',
    'motivo',
    'comercio',
    'lugar de transaccion',
    'description',
  ],
  debit: ['cargo', 'cargos', 'monto cargo', 'cargos clp', 'cargo clp', 'debito', 'debe', 'giro', 'giros', 'egreso', 'egresos'],
  credit: ['abono', 'abonos', 'monto abono', 'abonos clp', 'abono clp', 'credito', 'haber', 'deposito', 'depositos', 'ingreso', 'ingresos'],
  amount: ['monto', 'montos', 'importe', 'valor', 'monto clp', 'monto transaccion', 'monto total', 'amount'],
  balance: ['saldo', 'saldos', 'saldo clp', 'saldo contable', 'saldo disponible', 'balance'],
  reference: ['n operacion', 'numero operacion', 'n documento', 'numero documento', 'documento', 'referencia', 'codigo', 'n cuota'],
};

/** Cuántas filas del principio se miran buscando el encabezado. */
const MAX_HEADER_SCAN_ROWS = 30;

/**
 * Cuántas filas se revisan buscando el período cuando no se encontró un encabezado.
 *
 * Con encabezado se mira todo lo que está encima de él, que es donde el banco pone el bloque de
 * titular, cuenta y período.
 */
const MAX_PERIOD_SCAN_ROWS = 30;

/** Cuántas filas de datos se muestrean para validar que una columna es lo que se cree. */
const CONTENT_SAMPLE_ROWS = 60;

/** Proporción de celdas que deben parsear para dar por buena una columna. */
const CONTENT_MATCH_THRESHOLD = 0.6;

/**
 * Mínimo de celdas con contenido para que la validación signifique algo.
 *
 * Las columnas de cargo y abono vienen a medias por naturaleza: cada movimiento usa una o la
 * otra, nunca las dos. En una cartola con pocos movimientos eso deja muy pocas celdas para
 * juzgar, y ahí el veredicto tiene que ser "no alcanza para opinar", no "está mal".
 */
const MIN_CONTENT_SAMPLES = 2;

/**
 * Marcas diacríticas combinantes, que es lo que `normalize('NFD')` deja separado de la letra base.
 *
 * Se usa la propiedad Unicode `\p{M}` en vez del rango literal U+0300–U+036F porque ese rango se
 * escribe con caracteres invisibles en el código fuente: un copiar/pegar descuidado los pierde sin
 * dejar rastro, y la función deja de sacar tildes sin que nada falle ruidosamente.
 */
const COMBINING_MARKS = /\p{M}/gu;

/** Sinónimos ya normalizados, calculados una vez al cargar el módulo. */
const NORMALIZED_SYNONYMS: { role: ColumnRole; synonym: string }[] = Object.entries(COLUMN_SYNONYMS)
  .flatMap(([role, synonyms]) => synonyms.map(synonym => ({ role: role as ColumnRole, synonym: normalize(synonym) })))
  // De mayor a menor largo: así `fecha transaccion` gana contra el `transaccion` de descripción.
  .sort((a, b) => b.synonym.length - a.synonym.length);

/**
 * Normaliza el texto de una celda para compararlo con los sinónimos.
 *
 * @param value texto a normalizar
 * @returns el texto en minúsculas, sin tildes ni puntuación y con espacios colapsados
 */
function normalize(value: unknown): string {
  return String(value ?? '')
    .normalize('NFD')
    .replace(COMBINING_MARKS, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

/**
 * Puntúa cuánto se parece el título de una columna a un sinónimo conocido.
 *
 * @param header título normalizado de la columna
 * @param synonym sinónimo normalizado
 * @returns 3 si es idéntico, 2 si el título empieza con el sinónimo, 1 si lo contiene, 0 si no
 */
function scoreMatch(header: string, synonym: string): number {
  if (header === synonym) return 3;
  if (header.startsWith(synonym + ' ')) return 2;
  if (header.includes(synonym)) return 1;
  return 0;
}

/**
 * Asigna papeles a las columnas a partir de los títulos del encabezado.
 *
 * La asignación es voraz sobre el puntaje: se toma la mejor coincidencia disponible y se descarta
 * tanto esa columna como ese papel, así dos columnas nunca compiten por lo mismo. Como los
 * sinónimos están ordenados de más largo a más corto, un título específico le gana a uno genérico
 * que esté contenido dentro.
 *
 * @param headerCells celdas de la fila de encabezado
 * @returns el índice de columna asignado a cada papel
 */
function mapColumnsFromHeaders(headerCells: unknown[]): Partial<Record<ColumnRole, number>> {
  const candidates: { column: number; role: ColumnRole; score: number }[] = [];

  headerCells.forEach((cell, column) => {
    const header = normalize(cell);
    if (header === '') return;

    for (const { role, synonym } of NORMALIZED_SYNONYMS) {
      const score = scoreMatch(header, synonym);
      if (score > 0) candidates.push({ column, role, score: score * 100 + synonym.length });
    }
  });

  candidates.sort((a, b) => b.score - a.score);

  const columns: Partial<Record<ColumnRole, number>> = {};
  const usedColumns = new Set<number>();

  for (const candidate of candidates) {
    if (usedColumns.has(candidate.column) || columns[candidate.role] !== undefined) continue;
    columns[candidate.role] = candidate.column;
    usedColumns.add(candidate.column);
  }

  return columns;
}

/**
 * Cuenta cuántos papeles distintos reconoce una fila, para decidir si es el encabezado.
 *
 * @param row fila candidata
 * @returns cantidad de papeles reconocidos
 */
function scoreHeaderRow(row: unknown[]): number {
  return Object.keys(mapColumnsFromHeaders(row)).length;
}

/**
 * Busca la fila de encabezados.
 *
 * No se asume que sea la primera: los bancos suelen poner arriba el logo, el titular, el número
 * de cuenta y el período, a veces ocupando diez filas antes de que empiece la tabla.
 *
 * @param rows grilla completa del archivo
 * @returns el índice de la fila de encabezados, o `null` si ninguna se reconoce
 */
function findHeaderRow(rows: unknown[][]): number | null {
  let best: { index: number; score: number } | null = null;

  const limit = Math.min(rows.length, MAX_HEADER_SCAN_ROWS);
  for (let index = 0; index < limit; index++) {
    const score = scoreHeaderRow(rows[index]);
    // Con menos de dos papeles reconocidos es más probable que sea una fila de datos suelta.
    if (score >= 2 && (!best || score > best.score)) best = { index, score };
  }

  return best ? best.index : null;
}

/** Qué dice el contenido de una columna sobre la hipótesis que se tenía de ella. */
type ContentVerdict =
  /** El contenido confirma la hipótesis. */
  | 'ok'
  /** El contenido la desmiente: hay celdas de sobra y no se leen como se esperaba. */
  | 'contradicted'
  /** No hay suficientes celdas con datos para opinar. */
  | 'insufficient';

/**
 * Contrasta el contenido de una columna contra lo que se cree que es.
 *
 * La distinción entre `contradicted` e `insufficient` es lo que evita el peor error posible acá:
 * descartar la columna de montos de una cartola con pocos movimientos y dejar la importación sin
 * los datos que importan. Solo se descarta una columna cuando el contenido la desmiente de verdad.
 *
 * @param rows grilla completa
 * @param firstDataRow primera fila con datos
 * @param column índice de la columna a validar
 * @param parse función que intenta interpretar la celda
 * @returns el veredicto sobre la columna
 */
function checkColumnContent(
  rows: unknown[][],
  firstDataRow: number,
  column: number,
  parse: (value: unknown) => unknown,
): ContentVerdict {
  let filled = 0;
  let parsed = 0;

  const limit = Math.min(rows.length, firstDataRow + CONTENT_SAMPLE_ROWS);
  for (let index = firstDataRow; index < limit; index++) {
    const cell = rows[index]?.[column];
    if (cell === null || cell === undefined || String(cell).trim() === '') continue;
    filled++;
    if (parse(cell) !== null) parsed++;
  }

  if (filled < MIN_CONTENT_SAMPLES) return 'insufficient';
  return parsed / filled >= CONTENT_MATCH_THRESHOLD ? 'ok' : 'contradicted';
}

/**
 * Deduce las columnas mirando solo el contenido, sin encabezados.
 *
 * Es el plan B para archivos que no traen títulos, o que los traen con nombres que no se parecen
 * a nada conocido. Busca una columna que se lea como fechas, una que se lea como montos, y toma
 * como descripción la columna de texto con más contenido.
 *
 * @param rows grilla completa
 * @param parseDate parser de fechas ya atado al período de la cartola, si se encontró uno
 * @returns un mapeo parcial, que puede quedar incompleto
 */
function detectByContent(
  rows: unknown[][],
  parseDate: (value: unknown) => Date | null,
): { columns: Partial<Record<ColumnRole, number>>; firstDataRow: number } {
  const width = Math.max(...rows.map(row => row.length), 0);
  const columns: Partial<Record<ColumnRole, number>> = {};

  // Se saltan las filas de cabecera decorativa buscando desde donde haya datos consistentes.
  const firstDataRow = 0;

  for (let column = 0; column < width; column++) {
    // Sin encabezados hace falta evidencia positiva: un veredicto de "no alcanza para opinar"
    // no basta para asignarle un papel a la columna.
    if (columns.date === undefined && checkColumnContent(rows, firstDataRow, column, parseDate) === 'ok') {
      columns.date = column;
      continue;
    }
    if (columns.amount === undefined && checkColumnContent(rows, firstDataRow, column, parseStatementAmount) === 'ok') {
      columns.amount = column;
    }
  }

  // La descripción es la columna de texto con más caracteres promedio: en una cartola siempre es
  // la glosa del movimiento, muy por encima de cualquier código o referencia.
  let bestTextColumn: { column: number; average: number } | null = null;
  for (let column = 0; column < width; column++) {
    if (column === columns.date || column === columns.amount) continue;

    let total = 0;
    let count = 0;
    const limit = Math.min(rows.length, firstDataRow + CONTENT_SAMPLE_ROWS);
    for (let index = firstDataRow; index < limit; index++) {
      const cell = rows[index]?.[column];
      if (typeof cell !== 'string' || cell.trim() === '') continue;
      // Un texto que se lee como monto o fecha es un dato, no una glosa.
      if (parseStatementAmount(cell) !== null || parseDate(cell) !== null) continue;
      total += cell.trim().length;
      count++;
    }

    const average = count > 0 ? total / count : 0;
    if (average > 3 && (!bestTextColumn || average > bestTextColumn.average)) {
      bestTextColumn = { column, average };
    }
  }

  if (bestTextColumn) columns.description = bestTextColumn.column;

  return { columns, firstDataRow };
}

/**
 * Busca el período que cubre la cartola en el bloque de cabecera.
 *
 * Se recogen todas las fechas **con año explícito** que aparecen antes de la tabla y se toma la
 * menor y la mayor. Es deliberadamente tosco en vez de buscar las etiquetas `Desde` y `Hasta`:
 * cada banco las escribe distinto, y para lo único que sirve el período es para decidir el año de
 * un `03/08`. Que el rango salga más ancho de la cuenta no cambia esa decisión, porque siempre se
 * elige el año que deja la fecha dentro del rango.
 *
 * @param rows grilla completa del archivo
 * @param beforeRow fila donde empieza la tabla; solo se mira lo que está por encima
 * @returns el período encontrado, o `null` si no hay ninguna fecha con año en la cabecera
 */
export function detectStatementPeriod(rows: unknown[][], beforeRow: number): StatementPeriod | null {
  const limit = beforeRow > 0 ? Math.min(beforeRow, rows.length) : Math.min(rows.length, MAX_PERIOD_SCAN_ROWS);

  let from: Date | null = null;
  let to: Date | null = null;

  for (let index = 0; index < limit; index++) {
    for (const cell of rows[index] ?? []) {
      // Sin período de referencia, solo pasan las fechas que traen año propio: es justo lo que
      // se está buscando, y evita que un `03/08` suelto de la cabecera se resuelva solo.
      const date = parseStatementDate(cell);
      if (!date) continue;

      if (!from || date < from) from = date;
      if (!to || date > to) to = date;
    }
  }

  return from && to ? { from, to } : null;
}

/**
 * Interpreta la estructura de una cartola: dónde empieza la tabla y qué significa cada columna.
 *
 * @param rows grilla del archivo, tal como la devuelve `readStatement`
 * @returns el mapeo detectado, con las advertencias que el usuario debería revisar
 */
export function detectColumns(rows: unknown[][]): ColumnMapping {
  const warnings: string[] = [];
  const headerRow = findHeaderRow(rows);
  const period = detectStatementPeriod(rows, headerRow ?? 0);
  const parseDate = (value: unknown) => parseStatementDate(value, period);

  let columns: Partial<Record<ColumnRole, number>>;
  let firstDataRow: number;
  let source: 'headers' | 'content';

  if (headerRow !== null) {
    columns = mapColumnsFromHeaders(rows[headerRow]);
    firstDataRow = headerRow + 1;
    source = 'headers';

    // Un encabezado puede prometer algo que la columna no cumple. Solo se descarta cuando el
    // contenido lo desmiente; si no hay datos suficientes, se le cree al título.
    if (columns.date !== undefined && checkColumnContent(rows, firstDataRow, columns.date, parseDate) === 'contradicted') {
      warnings.push(
        `La columna "${String(rows[headerRow][columns.date] ?? '')}" parecía la fecha por su título, ` +
          'pero su contenido no se lee como fechas.',
      );
      delete columns.date;
    }

    for (const role of ['amount', 'debit', 'credit'] as const) {
      const column = columns[role];
      if (column !== undefined && checkColumnContent(rows, firstDataRow, column, parseStatementAmount) === 'contradicted') {
        warnings.push(
          `La columna "${String(rows[headerRow][column] ?? '')}" parecía un monto por su título, ` +
            'pero su contenido no se lee como números.',
        );
        delete columns[role];
      }
    }
  } else {
    const detected = detectByContent(rows, parseDate);
    columns = detected.columns;
    firstDataRow = detected.firstDataRow;
    source = 'content';
    warnings.push(
      'No se reconoció una fila de encabezados, así que las columnas se dedujeron del contenido. ' +
        'Revisá la previsualización con más atención de lo habitual.',
    );
  }

  // Si el encabezado no dio nada usable, se intenta igual por contenido antes de rendirse.
  if (columns.date === undefined && source === 'headers') {
    const fallback = detectByContent(rows.slice(firstDataRow), parseDate);
    if (fallback.columns.date !== undefined) {
      columns.date = fallback.columns.date;
      warnings.push('La columna de fecha se dedujo del contenido porque ningún encabezado la identificaba.');
    }
  }

  // Caso Santander: las fechas del detalle vienen como `03/08` y el año solo está en la
  // cabecera. Si no se encontró el período, no hay de dónde sacarlo y conviene decirlo.
  if (columns.date === undefined && !period && hasYearlessDates(rows, firstDataRow)) {
    warnings.push(
      'Las fechas de los movimientos vienen sin año y no se encontró el período de la cartola en ' +
        'la cabecera, así que no hay de dónde deducirlo.',
    );
  }

  const { shape, positiveMeans, resolved } = resolveShape(columns, warnings);
  const { lastDataRow, rowsAfterTable, sectionLabel } = findTableEnd(rows, firstDataRow, resolved, parseDate);

  if (rowsAfterTable > 0) {
    warnings.push(
      `Se ignoraron ${rowsAfterTable} fila(s) con forma de movimiento que están después del final de ` +
        `la tabla${sectionLabel ? `, bajo "${sectionLabel}"` : ''}. Suelen ser resúmenes que repiten ` +
        'movimientos ya listados más arriba.',
    );
  }

  return {
    headerRow,
    firstDataRow,
    lastDataRow,
    rowsAfterTable,
    columns: resolved,
    shape,
    positiveMeans,
    source,
    period,
    warnings,
  };
}

/**
 * Decide si el archivo usa una columna de monto con signo o el par cargo/abono.
 *
 * Cuando solo aparece una de las dos columnas del par, se la trata como columna de monto con
 * signo fijo: una cartola de tarjeta de crédito que solo lista cargos entra así sin problema.
 *
 * @param columns columnas detectadas
 * @param warnings lista donde acumular avisos para el usuario
 * @returns la forma resuelta y las columnas ya normalizadas
 */
function resolveShape(
  columns: Partial<Record<ColumnRole, number>>,
  warnings: string[],
): { shape: StatementShape; positiveMeans: 'income' | 'expense'; resolved: Partial<Record<ColumnRole, number>> } {
  const resolved = { ...columns };

  if (resolved.debit !== undefined && resolved.credit !== undefined) {
    // Con cargo y abono separados, una columna de monto suelta sería redundante y confusa.
    delete resolved.amount;
    return { shape: 'debit_credit', positiveMeans: 'income', resolved };
  }

  if (resolved.amount !== undefined) {
    return { shape: 'signed', positiveMeans: 'income', resolved };
  }

  if (resolved.debit !== undefined) {
    resolved.amount = resolved.debit;
    delete resolved.debit;
    warnings.push('Solo se encontró una columna de cargos: todos los movimientos se importarán como gastos.');
    return { shape: 'signed', positiveMeans: 'expense', resolved };
  }

  if (resolved.credit !== undefined) {
    resolved.amount = resolved.credit;
    delete resolved.credit;
    warnings.push('Solo se encontró una columna de abonos: todos los movimientos se importarán como ingresos.');
    return { shape: 'signed', positiveMeans: 'income', resolved };
  }

  return { shape: 'signed', positiveMeans: 'income', resolved };
}

/**
 * Detecta si la tabla trae fechas escritas sin año, como `03/08`.
 *
 * Solo se usa para explicarle al usuario por qué no se pudo identificar la columna de fecha,
 * que si no queda como un fallo sin causa aparente.
 *
 * @param rows grilla completa
 * @param firstDataRow primera fila con datos
 * @returns `true` si alguna celda tiene la forma de una fecha sin año
 */
function hasYearlessDates(rows: unknown[][], firstDataRow: number): boolean {
  const limit = Math.min(rows.length, firstDataRow + CONTENT_SAMPLE_ROWS);

  for (let index = firstDataRow; index < limit; index++) {
    for (const cell of rows[index] ?? []) {
      if (typeof cell === 'string' && /^\d{1,2}[-/.]\d{1,2}$/.test(cell.trim())) return true;
    }
  }

  return false;
}

/**
 * Busca dónde termina la tabla de movimientos.
 *
 * El corte se hace en la primera fila que parece un título de sección: tiene texto pero ni fecha
 * ni monto. En una cartola de Santander eso es el `Resumen de Comisiones`, un apéndice que repite
 * comisiones ya listadas entre los movimientos; importarlo agregaría cargos que la cuenta nunca
 * tuvo, y el propio saldo final del banco no los incluye.
 *
 * Las filas con forma de movimiento que aparezcan después del corte se cuentan pero no se
 * importan, y el aviso correspondiente le dice al usuario cuántas fueron: descartar datos en
 * silencio sería peor que el problema que se está evitando.
 *
 * @param rows grilla completa
 * @param firstDataRow primera fila con datos
 * @param columns columnas ya resueltas
 * @param parseDate parser de fechas atado al período de la cartola
 * @returns la última fila de la tabla, cuántas filas quedaron fuera, y el título de la sección que cortó
 */
function findTableEnd(
  rows: unknown[][],
  firstDataRow: number,
  columns: Partial<Record<ColumnRole, number>>,
  parseDate: (value: unknown) => Date | null,
): { lastDataRow: number; rowsAfterTable: number; sectionLabel: string | null } {
  const amountColumns = (['amount', 'debit', 'credit'] as const)
    .map(role => columns[role])
    .filter((column): column is number => column !== undefined);

  /**
   * Determina si una fila tiene los datos mínimos de un movimiento.
   *
   * @param row fila a evaluar
   * @returns si trae fecha y si trae algún monto
   */
  const inspect = (row: unknown[]) => ({
    hasDate: columns.date !== undefined && parseDate(row?.[columns.date]) !== null,
    hasAmount: amountColumns.some(column => parseStatementAmount(row?.[column]) !== null),
    hasText: (row ?? []).some(cell => typeof cell === 'string' && cell.trim() !== ''),
  });

  let lastDataRow = rows.length - 1;
  let sectionLabel: string | null = null;

  for (let index = firstDataRow; index < rows.length; index++) {
    const { hasDate, hasAmount, hasText } = inspect(rows[index]);
    if (hasDate || hasAmount || !hasText) continue;

    lastDataRow = index - 1;
    sectionLabel = (rows[index] ?? [])
      .map(cell => (typeof cell === 'string' ? cell.trim() : ''))
      // Se descartan los separadores decorativos de asteriscos o guiones.
      .find(text => text !== '' && /[a-zA-Z]/.test(text)) ?? null;
    break;
  }

  let rowsAfterTable = 0;
  for (let index = lastDataRow + 1; index < rows.length; index++) {
    const { hasDate, hasAmount } = inspect(rows[index]);
    if (hasDate && hasAmount) rowsAfterTable++;
  }

  return { lastDataRow, rowsAfterTable, sectionLabel };
}
