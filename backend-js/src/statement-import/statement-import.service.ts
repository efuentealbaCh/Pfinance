import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { PrismaService } from '../prisma/prisma.service';
import { normalizeCurrency } from '../common/currency.util';
import { readStatement } from './statement-reader';
import { ColumnMapping, ColumnRole, detectColumns } from './column-detection';
import { ExtractedStatement, StatementRow, extractStatementRows } from './statement-rows';
import { ConfirmStatementDto, MappingOverrideDto, PreviewStatementDto } from './dto/import-statement.dto';

/** Cuántas filas interpretadas se devuelven en la previsualización. */
const PREVIEW_ROWS = 25;

/** Papeles que pueden venir corregidos desde el frontend. */
const OVERRIDABLE_ROLES: ColumnRole[] = ['date', 'description', 'amount', 'debit', 'credit', 'balance', 'reference'];

@Injectable()
export class StatementImportService {
  private readonly logger = new Logger(StatementImportService.name);

  constructor(private prisma: PrismaService) {}

  /**
   * Interpreta la cartola y muestra qué se importaría, sin escribir nada.
   *
   * Es el paso obligatorio antes de confirmar: una importación mal mapeada crea decenas de
   * transacciones con montos equivocados, y revisarla después cuesta mucho más que revisarla antes.
   *
   * @param userId dueño de la cuenta
   * @param file archivo subido
   * @param dto cuenta destino y correcciones de mapeo, si las hay
   * @returns la estructura detectada, las primeras filas interpretadas y los conteos
   */
  async preview(userId: string, file: { originalname: string; buffer: Buffer }, dto: PreviewStatementDto) {
    const { account, grid, mapping, extracted, duplicates } = await this.analyze(userId, file, dto);

    const alreadyImported = new Set(duplicates);
    const rows = extracted.rows.map(row => ({
      row_index: row.rowIndex,
      date: row.date.toISOString().split('T')[0],
      description: row.description,
      amount: row.amount,
      type: row.type,
      reference: row.reference,
      // Marcar el duplicado en la vista previa evita la pregunta obvia de por qué el total
      // importado no coincide con la cantidad de filas del archivo.
      already_imported: alreadyImported.has(row.fingerprint),
    }));

    return {
      account: {
        id: account.id,
        identifier: account.identifier,
        bank: account.banks?.name ?? null,
        currency: normalizeCurrency(account.currency),
        balance: Number(account.balance),
      },
      structure: this.describeStructure(grid, mapping),
      totals: {
        detected: extracted.rows.length,
        to_import: extracted.rows.length - alreadyImported.size,
        already_imported: alreadyImported.size,
        skipped: extracted.skipped.length,
      },
      closing_balance: extracted.closingBalance,
      warnings: mapping.warnings,
      skipped: extracted.skipped,
      // Se recorta la muestra: una cartola de un año son miles de filas y el frontend solo
      // necesita lo suficiente para que el usuario reconozca si el mapeo es correcto.
      rows: rows.slice(0, PREVIEW_ROWS),
      rows_truncated: Math.max(0, rows.length - PREVIEW_ROWS),
    };
  }

  /**
   * Importa los movimientos de la cartola.
   *
   * **No toca el saldo de la cuenta salvo que se pida explícitamente.** Una cartola es el registro
   * de movimientos que el banco ya aplicó: si el saldo de la app venía del banco, sumarle esos
   * mismos movimientos lo dejaría al doble. Con `set_balance_to_closing` el saldo queda igual al
   * de cierre de la cartola, que es lo que uno realmente quiere después de importar.
   *
   * @param userId dueño de la cuenta
   * @param file archivo subido, el mismo que se previsualizó
   * @param dto cuenta destino, correcciones de mapeo y opciones de importación
   * @returns el resumen de lo importado
   */
  async confirm(userId: string, file: { originalname: string; buffer: Buffer }, dto: ConfirmStatementDto) {
    const { account, grid, mapping, extracted, duplicates } = await this.analyze(userId, file, dto);

    const alreadyImported = new Set(duplicates);
    const toImport = extracted.rows.filter(row => !alreadyImported.has(row.fingerprint));

    if (toImport.length === 0) {
      throw new BadRequestException(
        extracted.rows.length === 0
          ? 'No se encontró ningún movimiento importable en el archivo. Revisá la previsualización.'
          : 'Todos los movimientos del archivo ya estaban importados en esta cuenta.',
      );
    }

    const balanceBefore = Number(account.balance);
    const setBalance = dto.set_balance_to_closing === true && extracted.closingBalance !== null;

    const importId = randomUUID();
    const now = new Date();

    await this.prisma.$transaction(async tx => {
      await tx.statement_imports.create({
        data: {
          id: importId,
          user_id: userId,
          user_account_id: account.id,
          filename: file.originalname.slice(0, 255),
          imported_count: toImport.length,
          duplicate_count: alreadyImported.size,
          skipped_count: extracted.skipped.length,
          balance_before: balanceBefore,
          mapping: {
            ...this.serializeMapping(mapping),
            // Se guarda junto al mapeo para que deshacer sepa si tiene que restaurar el saldo.
            balance_set_to_closing: setBalance,
          },
          created_at: now,
        },
      });

      await tx.transactions.createMany({
        data: toImport.map(row => this.toTransaction(row, userId, account.id, importId, now)),
        // Red de seguridad ante una confirmación enviada dos veces: el índice único de
        // (cuenta, huella) descarta la repetición en vez de hacer fallar toda la importación.
        skipDuplicates: true,
      });

      if (setBalance) {
        await tx.user_accounts.update({
          where: { id: account.id },
          data: { balance: extracted.closingBalance as number, updated_at: now },
        });
      }
    });

    if (dto.save_mapping) await this.saveMapping(userId, account.bank_id, grid, mapping);

    this.logger.log(
      `Importación ${importId}: ${toImport.length} movimiento(s) en la cuenta ${account.id} ` +
        `(${alreadyImported.size} ya estaban, ${extracted.skipped.length} descartada(s)).`,
    );

    return {
      import_id: importId,
      imported: toImport.length,
      already_imported: alreadyImported.size,
      skipped: extracted.skipped.length,
      balance: {
        before: balanceBefore,
        after: setBalance ? (extracted.closingBalance as number) : balanceBefore,
        // Decirlo explícitamente evita que alguien crea que el saldo se actualizó solo.
        changed: setBalance,
      },
      mapping_saved: dto.save_mapping === true,
    };
  }

  /**
   * Lista las importaciones del usuario, de la más reciente a la más antigua.
   *
   * @param userId dueño de las importaciones
   * @returns las importaciones con su cuenta
   */
  async listImports(userId: string) {
    const imports = await this.prisma.statement_imports.findMany({
      where: { user_id: userId },
      include: { user_accounts: { include: { banks: true } } },
      orderBy: { created_at: 'desc' },
    });

    return {
      imports: imports.map(record => ({
        id: record.id,
        filename: record.filename,
        imported_count: record.imported_count,
        duplicate_count: record.duplicate_count,
        skipped_count: record.skipped_count,
        created_at: record.created_at,
        account: {
          id: record.user_account_id,
          identifier: record.user_accounts.identifier,
          bank: record.user_accounts.banks?.name ?? null,
        },
      })),
    };
  }

  /**
   * Deshace una importación completa.
   *
   * Existe porque un mapeo equivocado puede crear cientos de transacciones y borrarlas de a una no
   * es una opción realista. El saldo solo se restaura si esta misma importación lo había cambiado:
   * si no lo tocó, tampoco corresponde tocarlo al revertir.
   *
   * @param userId dueño de la importación
   * @param importId importación a revertir
   * @returns cuántas transacciones se eliminaron
   */
  async undoImport(userId: string, importId: string) {
    const record = await this.prisma.statement_imports.findFirst({
      where: { id: importId, user_id: userId },
    });
    if (!record) throw new NotFoundException('Importación no encontrada.');

    const config = (record.mapping ?? {}) as Record<string, unknown>;
    const restoreBalance = config.balance_set_to_closing === true;

    const deleted = await this.prisma.$transaction(async tx => {
      const { count } = await tx.transactions.deleteMany({ where: { statement_import_id: importId } });

      if (restoreBalance) {
        await tx.user_accounts.update({
          where: { id: record.user_account_id },
          data: { balance: record.balance_before, updated_at: new Date() },
        });
      }

      await tx.statement_imports.delete({ where: { id: importId } });
      return count;
    });

    return {
      message: `Se revirtió la importación: ${deleted} transacción(es) eliminada(s).`,
      deleted,
      balance_restored: restoreBalance,
    };
  }

  /**
   * Recorrido común de previsualización y confirmación.
   *
   * Que las dos pasen exactamente por acá es lo que garantiza que se importe lo mismo que se
   * mostró: cualquier diferencia entre ambos caminos sería una trampa para el usuario, que aprobó
   * una cosa y obtendría otra.
   *
   * @param userId dueño de la cuenta
   * @param file archivo subido
   * @param dto cuenta destino y correcciones de mapeo
   * @returns la cuenta, la grilla, el mapeo aplicado, las filas extraídas y las huellas ya existentes
   */
  private async analyze(
    userId: string,
    file: { originalname: string; buffer: Buffer },
    dto: PreviewStatementDto,
  ): Promise<{
    account: any;
    grid: unknown[][];
    mapping: ColumnMapping;
    extracted: ExtractedStatement;
    duplicates: string[];
  }> {
    const account = await this.prisma.user_accounts.findFirst({
      where: { id: dto.user_account_id, user_id: userId },
      include: { banks: true },
    });
    if (!account) throw new NotFoundException('Cuenta no encontrada.');

    const sheet = readStatement(file.buffer, file.originalname);
    const grid = sheet.rows;

    let mapping = detectColumns(grid);
    mapping = await this.applySavedMapping(userId, account.bank_id, grid, mapping);
    mapping = this.applyOverrides(mapping, dto.mapping, grid);

    if (mapping.columns.date === undefined) {
      throw new BadRequestException(
        'No se pudo identificar la columna de fecha del archivo. ' +
          (mapping.warnings[0] ?? 'Indicá manualmente qué columna la contiene.'),
      );
    }
    if (mapping.columns.amount === undefined && mapping.columns.debit === undefined && mapping.columns.credit === undefined) {
      throw new BadRequestException(
        'No se pudo identificar ninguna columna de montos en el archivo. ' +
          'Indicá manualmente cuál es el cargo y cuál el abono.',
      );
    }

    const extracted = extractStatementRows(grid, mapping);
    const duplicates = await this.findAlreadyImported(account.id, extracted.rows);

    return { account, grid, mapping, extracted, duplicates };
  }

  /**
   * Busca cuáles de las filas ya están importadas en la cuenta.
   *
   * @param accountId cuenta destino
   * @param rows filas interpretadas
   * @returns las huellas que ya existen
   */
  private async findAlreadyImported(accountId: string, rows: StatementRow[]): Promise<string[]> {
    if (rows.length === 0) return [];

    const existing = await this.prisma.transactions.findMany({
      where: {
        user_account_id: accountId,
        import_fingerprint: { in: rows.map(row => row.fingerprint) },
      },
      select: { import_fingerprint: true },
    });

    return existing.map(row => row.import_fingerprint as string);
  }

  /**
   * Convierte una fila interpretada en los datos de una transacción.
   *
   * Las transacciones importadas quedan **sin categoría**: adivinarla a partir de la glosa del
   * banco produciría clasificaciones incorrectas con apariencia de certeza, y corregir una
   * categoría mal puesta cuesta más que asignarla desde cero.
   *
   * @param row fila interpretada
   * @param userId dueño
   * @param accountId cuenta destino
   * @param importId lote al que pertenece
   * @param now marca de tiempo común a todo el lote
   * @returns los datos para `createMany`
   */
  private toTransaction(row: StatementRow, userId: string, accountId: string, importId: string, now: Date) {
    const description = row.reference ? `${row.description} (${row.reference})` : row.description;

    return {
      id: randomUUID(),
      user_id: userId,
      user_account_id: accountId,
      target_account_id: null,
      category_id: null,
      amount: row.amount,
      description,
      date: row.date,
      type: row.type,
      // Un movimiento bancario propio no se reparte con un grupo: el gasto compartido se arma
      // a mano, y marcarlos como compartidos generaría deudas que nadie pidió.
      is_shared: false,
      card_id: null,
      statement_import_id: importId,
      import_fingerprint: row.fingerprint,
      created_at: now,
      updated_at: now,
    };
  }

  /**
   * Aplica el mapeo que el usuario guardó para este banco, si existe.
   *
   * Los papeles se guardan por el TEXTO del encabezado y no por el número de columna, porque entre
   * dos cartolas del mismo banco cambia la cantidad de filas decorativas y puede cambiar el orden
   * de las columnas. Un índice guardado quedaría apuntando a la columna equivocada, que es
   * exactamente el error que esta función existe para evitar.
   *
   * @param userId dueño del mapeo
   * @param bankId banco de la cuenta
   * @param grid grilla del archivo
   * @param detected mapeo detectado automáticamente
   * @returns el mapeo guardado aplicado sobre este archivo, o el detectado si no hay guardado
   */
  private async applySavedMapping(
    userId: string,
    bankId: string,
    grid: unknown[][],
    detected: ColumnMapping,
  ): Promise<ColumnMapping> {
    const saved = await this.prisma.bank_statement_mappings.findUnique({
      where: { user_id_bank_id: { user_id: userId, bank_id: bankId } },
    });
    if (!saved) return detected;

    const config = saved.config as { roles?: Record<string, string>; shape?: string; positiveMeans?: string };
    const roles = config.roles ?? {};
    if (detected.headerRow === null) return detected;

    const headerCells = (grid[detected.headerRow] ?? []).map(cell => normalizeHeader(cell));
    const columns: Partial<Record<ColumnRole, number>> = {};

    for (const [role, label] of Object.entries(roles)) {
      const column = headerCells.indexOf(normalizeHeader(label));
      if (column >= 0) columns[role as ColumnRole] = column;
    }

    // Si ninguna de las columnas guardadas aparece en este archivo, el banco cambió el formato y
    // conviene quedarse con la detección automática en vez de forzar un mapeo que no calza.
    if (Object.keys(columns).length === 0) {
      return {
        ...detected,
        warnings: [
          ...detected.warnings,
          'El mapeo guardado para este banco no coincide con las columnas del archivo, así que se ' +
            'usó la detección automática. Revisá la previsualización y volvé a guardarlo.',
        ],
      };
    }

    return {
      ...detected,
      columns,
      shape: (config.shape as ColumnMapping['shape']) ?? detected.shape,
      positiveMeans: (config.positiveMeans as ColumnMapping['positiveMeans']) ?? detected.positiveMeans,
    };
  }

  /**
   * Guarda el mapeo confirmado para las cartolas de este banco.
   *
   * @param userId dueño del mapeo
   * @param bankId banco de la cuenta
   * @param grid grilla del archivo
   * @param mapping mapeo confirmado
   */
  private async saveMapping(userId: string, bankId: string, grid: unknown[][], mapping: ColumnMapping) {
    if (mapping.headerRow === null) {
      this.logger.warn(
        `No se guardó el mapeo del banco ${bankId}: el archivo no tiene encabezados y el mapeo ` +
          'depende de índices de columna que no sirven para otro archivo.',
      );
      return;
    }

    const headerRow = grid[mapping.headerRow] ?? [];
    const roles: Record<string, string> = {};
    for (const [role, column] of Object.entries(mapping.columns)) {
      const label = String(headerRow[column as number] ?? '').trim();
      if (label !== '') roles[role] = label;
    }

    const config = { roles, shape: mapping.shape, positiveMeans: mapping.positiveMeans };

    await this.prisma.bank_statement_mappings.upsert({
      where: { user_id_bank_id: { user_id: userId, bank_id: bankId } },
      create: { user_id: userId, bank_id: bankId, config },
      update: { config, updated_at: new Date() },
    });
  }

  /**
   * Aplica las correcciones que mandó el usuario sobre el mapeo detectado.
   *
   * @param mapping mapeo detectado
   * @param override correcciones, si las hay
   * @param grid grilla del archivo, para acotar los índices de fila
   * @returns el mapeo corregido
   */
  private applyOverrides(mapping: ColumnMapping, override: MappingOverrideDto | undefined, grid: unknown[][]): ColumnMapping {
    if (!override) return mapping;

    const columns = { ...mapping.columns };
    if (override.columns) {
      for (const role of OVERRIDABLE_ROLES) {
        const column = override.columns[role];
        if (column !== undefined) columns[role] = column;
      }
    }

    // Con cargo y abono corregidos a mano, la forma pasa a ser el par aunque se haya detectado
    // una sola columna de monto.
    const shape =
      override.shape ?? (columns.debit !== undefined && columns.credit !== undefined ? 'debit_credit' : mapping.shape);

    const firstDataRow = override.firstDataRow ?? mapping.firstDataRow;
    const lastDataRow = Math.min(override.lastDataRow ?? mapping.lastDataRow, grid.length - 1);

    if (lastDataRow < firstDataRow) {
      throw new BadRequestException('El fin de la tabla no puede ser anterior a su comienzo.');
    }

    return {
      ...mapping,
      columns,
      shape,
      positiveMeans: override.positiveMeans ?? mapping.positiveMeans,
      firstDataRow,
      lastDataRow,
    };
  }

  /**
   * Arma la descripción de la estructura para el frontend.
   *
   * Se devuelven los títulos reales de las columnas además de sus índices, para que la pantalla de
   * previsualización pueda mostrar "Fecha → FECHA" y el usuario verifique el mapeo sin tener que
   * pensar en números de columna.
   *
   * @param grid grilla del archivo
   * @param mapping mapeo aplicado
   * @returns la estructura en el formato que consume el frontend
   */
  private describeStructure(grid: unknown[][], mapping: ColumnMapping) {
    const headerRow = mapping.headerRow !== null ? grid[mapping.headerRow] ?? [] : [];

    const columns: Record<string, { index: number; label: string | null }> = {};
    for (const [role, column] of Object.entries(mapping.columns)) {
      const label = mapping.headerRow !== null ? String(headerRow[column as number] ?? '').trim() : '';
      columns[role] = { index: column as number, label: label === '' ? null : label };
    }

    return {
      header_row: mapping.headerRow,
      first_data_row: mapping.firstDataRow,
      last_data_row: mapping.lastDataRow,
      rows_after_table: mapping.rowsAfterTable,
      shape: mapping.shape,
      positive_means: mapping.positiveMeans,
      detected_by: mapping.source,
      period: mapping.period
        ? {
            from: mapping.period.from.toISOString().split('T')[0],
            to: mapping.period.to.toISOString().split('T')[0],
          }
        : null,
      columns,
      // Los títulos completos permiten que el frontend arme el selector para corregir el mapeo.
      available_columns: headerRow.map((cell, index) => ({ index, label: String(cell ?? '').trim() })),
    };
  }

  /**
   * Reduce el mapeo a lo que se guarda en el registro de importación.
   *
   * @param mapping mapeo aplicado
   * @returns el objeto serializable para la columna Json
   */
  private serializeMapping(mapping: ColumnMapping) {
    return {
      header_row: mapping.headerRow,
      first_data_row: mapping.firstDataRow,
      last_data_row: mapping.lastDataRow,
      columns: mapping.columns,
      shape: mapping.shape,
      positive_means: mapping.positiveMeans,
      detected_by: mapping.source,
    };
  }
}

/**
 * Normaliza el título de una columna para comparar el mapeo guardado contra el archivo actual.
 *
 * @param value título a normalizar
 * @returns el título en minúsculas, sin tildes ni puntuación
 */
function normalizeHeader(value: unknown): string {
  return String(value ?? '')
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}
