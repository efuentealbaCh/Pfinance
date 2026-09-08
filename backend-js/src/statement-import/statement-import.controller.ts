import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { Throttle, minutes } from '@nestjs/throttler';
import { StatementImportService } from './statement-import.service';
import { ConfirmStatementDto, PreviewStatementDto } from './dto/import-statement.dto';

/**
 * Tamaño máximo del archivo. Una cartola de un año son unos pocos cientos de kilobytes; el límite
 * está para que un archivo enorme no consuma la memoria del proceso, que en Render es poca.
 */
const MAX_FILE_SIZE = 5 * 1024 * 1024;

/** Archivo subido por multer, con solo lo que necesita el servicio. */
interface UploadedStatement {
  originalname: string;
  buffer: Buffer;
}

@UseGuards(AuthGuard('jwt'))
@Controller('statement-imports')
export class StatementImportController {
  constructor(private readonly statementImportService: StatementImportService) {}

  /**
   * Interpreta la cartola y devuelve qué se importaría, sin escribir nada.
   *
   * @throws BadRequestException si no vino archivo
   */
  @Throttle({ default: { limit: 20, ttl: minutes(1) } })
  @Post('preview')
  @UseInterceptors(FileInterceptor('file', { limits: { fileSize: MAX_FILE_SIZE } }))
  preview(
    @Request() req: any,
    @UploadedFile() file: UploadedStatement | undefined,
    @Body() dto: PreviewStatementDto,
  ) {
    return this.statementImportService.preview(req.user.id, requireFile(file), dto);
  }

  /**
   * Importa los movimientos.
   *
   * Se vuelve a subir el mismo archivo en vez de guardar la previsualización en el servidor: la
   * interpretación es determinista, así que el mismo archivo con el mismo mapeo da exactamente las
   * mismas filas, y no hace falta mantener estado entre las dos llamadas. Si igual se confirmara
   * dos veces, la deduplicación por huella impide que se dupliquen los movimientos.
   *
   * @throws BadRequestException si no vino archivo
   */
  @Throttle({ default: { limit: 10, ttl: minutes(1) } })
  @Post('confirm')
  @UseInterceptors(FileInterceptor('file', { limits: { fileSize: MAX_FILE_SIZE } }))
  confirm(
    @Request() req: any,
    @UploadedFile() file: UploadedStatement | undefined,
    @Body() dto: ConfirmStatementDto,
  ) {
    return this.statementImportService.confirm(req.user.id, requireFile(file), dto);
  }

  /** Historial de importaciones del usuario. */
  @Get()
  list(@Request() req: any) {
    return this.statementImportService.listImports(req.user.id);
  }

  /** Deshace una importación completa, con sus transacciones. */
  @Delete(':id')
  undo(@Request() req: any, @Param('id', ParseUUIDPipe) id: string) {
    return this.statementImportService.undoImport(req.user.id, id);
  }
}

/**
 * Verifica que haya llegado un archivo con contenido.
 *
 * @param file archivo recibido por multer
 * @returns el archivo
 * @throws BadRequestException si falta o viene vacío
 */
function requireFile(file: UploadedStatement | undefined): UploadedStatement {
  if (!file || !file.buffer || file.buffer.length === 0) {
    throw new BadRequestException('Falta el archivo de la cartola en el campo "file".');
  }
  return file;
}
