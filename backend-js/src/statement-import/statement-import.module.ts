import { Module } from '@nestjs/common';
import { StatementImportService } from './statement-import.service';
import { StatementImportController } from './statement-import.controller';

/**
 * Importación de cartolas bancarias: lectura del archivo, detección de columnas,
 * previsualización y carga de los movimientos.
 */
@Module({
  controllers: [StatementImportController],
  providers: [StatementImportService],
})
export class StatementImportModule {}
