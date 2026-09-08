import { BadRequestException } from '@nestjs/common';
import * as XLSX from 'xlsx';

/**
 * Lectura del archivo de cartola a una grilla de celdas, sin interpretar todavía qué significa
 * cada columna. Eso lo hace `column-detection.ts` sobre el resultado de acá.
 */

/** Extensiones aceptadas. SheetJS lee las tres, así que no hace falta una librería por formato. */
const SPREADSHEET_EXTENSIONS = ['xlsx', 'xls', 'xlsm'];
const TEXT_EXTENSIONS = ['csv', 'txt'];

/** Separadores candidatos para un archivo de texto, en orden de preferencia ante empate. */
const CANDIDATE_DELIMITERS = [';', ',', '\t', '|'];

/** Cuántas líneas se miran para adivinar el separador de un CSV. */
const DELIMITER_SAMPLE_LINES = 20;

/** Una hoja de cartola ya leída, como grilla de celdas crudas. */
export interface StatementSheet {
  /** Nombre de la hoja dentro del libro. */
  name: string;
  /** Filas de la hoja; cada celda conserva su tipo original (texto, número, fecha). */
  rows: unknown[][];
}

/**
 * Lee el archivo subido y devuelve la primera hoja con contenido.
 *
 * Las celdas se leen en crudo (`raw: true`), sin dejar que la librería formatee: así los montos
 * numéricos llegan como número y las fechas como el serial de Excel, que es más confiable que el
 * texto ya formateado. `parseStatementAmount` y `parseStatementDate` se encargan de ahí en más.
 *
 * @param buffer contenido del archivo
 * @param filename nombre original, del que se toma la extensión
 * @returns la primera hoja con filas
 * @throws BadRequestException si la extensión no está soportada o el archivo no tiene contenido legible
 */
export function readStatement(buffer: Buffer, filename: string): StatementSheet {
  const extension = (filename.split('.').pop() ?? '').toLowerCase();

  let workbook: XLSX.WorkBook;

  if (TEXT_EXTENSIONS.includes(extension)) {
    const text = decodeText(buffer);
    workbook = XLSX.read(text, { type: 'string', raw: true, FS: detectDelimiter(text) });
  } else if (SPREADSHEET_EXTENSIONS.includes(extension)) {
    try {
      workbook = XLSX.read(buffer, { type: 'buffer', raw: true });
    } catch (error) {
      throw new BadRequestException(
        `No se pudo leer el archivo como planilla: ${(error as Error).message}. ` +
          'Si lo descargaste del banco, probá abrirlo y volver a guardarlo como .xlsx o .csv.',
      );
    }
  } else {
    throw new BadRequestException(
      `Formato no soportado (.${extension || 'sin extensión'}). ` +
        `Se aceptan: ${[...SPREADSHEET_EXTENSIONS, ...TEXT_EXTENSIONS].join(', ')}.`,
    );
  }

  for (const name of workbook.SheetNames) {
    const rows = XLSX.utils.sheet_to_json<unknown[]>(workbook.Sheets[name], {
      header: 1,
      raw: true,
      defval: null,
      blankrows: false,
    });

    if (rows.length > 0) return { name, rows };
  }

  throw new BadRequestException('El archivo no tiene ninguna hoja con contenido.');
}

/**
 * Decodifica un archivo de texto probando UTF-8 y cayendo a Latin-1.
 *
 * Varios bancos chilenos exportan CSV en Windows-1252, no en UTF-8. Decodificarlo mal no rompe la
 * importación pero deja las descripciones con caracteres corruptos donde había tildes o eñes.
 *
 * @param buffer contenido del archivo
 * @returns el texto decodificado
 */
function decodeText(buffer: Buffer): string {
  // BOM de UTF-8: la codificación viene declarada, no hay nada que adivinar.
  if (buffer[0] === 0xef && buffer[1] === 0xbb && buffer[2] === 0xbf) {
    return buffer.subarray(3).toString('utf8');
  }

  const utf8 = buffer.toString('utf8');
  // El carácter de reemplazo aparece cuando la secuencia de bytes no era UTF-8 válido.
  return utf8.includes('�') ? buffer.toString('latin1') : utf8;
}

/**
 * Adivina el separador de un archivo de texto.
 *
 * En Chile el CSV exportado desde Excel suele venir con punto y coma, justamente porque la coma
 * ya está ocupada como separador decimal del formato local.
 *
 * @param text contenido del archivo
 * @returns el separador más probable
 */
function detectDelimiter(text: string): string {
  const lines = text.split(/\r?\n/).filter(line => line.trim() !== '').slice(0, DELIMITER_SAMPLE_LINES);
  if (lines.length === 0) return ',';

  let best = ',';
  let bestScore = -1;

  for (const delimiter of CANDIDATE_DELIMITERS) {
    // Se usa la mediana de apariciones por línea en vez del total: un separador real aparece una
    // cantidad parecida de veces en cada fila, mientras que la coma decimal se concentra en las
    // filas con montos y no en el encabezado.
    const counts = lines.map(line => line.split(delimiter).length - 1).sort((a, b) => a - b);
    const median = counts[Math.floor(counts.length / 2)];

    if (median > bestScore) {
      bestScore = median;
      best = delimiter;
    }
  }

  return bestScore > 0 ? best : ',';
}
