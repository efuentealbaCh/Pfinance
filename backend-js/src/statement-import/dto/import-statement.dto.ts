import { Transform, Type, plainToInstance } from 'class-transformer';
import { BadRequestException } from '@nestjs/common';
import {
  IsBoolean,
  IsIn,
  IsInt,
  IsOptional,
  IsUUID,
  Min,
  ValidateNested,
} from 'class-validator';

/**
 * Índices de columna que el usuario corrigió desde la previsualización.
 *
 * Todos son opcionales: el frontend manda solo lo que el usuario cambió respecto de lo detectado.
 */
export class ColumnOverridesDto {
  @IsOptional()
  @IsInt()
  @Min(0)
  date?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  description?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  amount?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  debit?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  credit?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  balance?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  reference?: number;
}

/**
 * Correcciones del usuario sobre la estructura que se detectó automáticamente.
 *
 * Es la salida de escape del diseño: si la detección se equivoca con el formato de un banco que no
 * conocemos, el usuario lo arregla acá en vez de quedarse sin poder importar hasta que salga un
 * deploy.
 */
export class MappingOverrideDto {
  /** Primera fila con datos, si el usuario corrigió dónde empieza la tabla. */
  @IsOptional()
  @IsInt()
  @Min(0)
  firstDataRow?: number;

  /** Última fila de la tabla, para dejar fuera apéndices que el detector no reconoció. */
  @IsOptional()
  @IsInt()
  @Min(0)
  lastDataRow?: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => ColumnOverridesDto)
  columns?: ColumnOverridesDto;

  @IsOptional()
  @IsIn(['signed', 'debit_credit'])
  shape?: 'signed' | 'debit_credit';

  @IsOptional()
  @IsIn(['income', 'expense'])
  positiveMeans?: 'income' | 'expense';
}

/**
 * Interpreta un valor de formulario como booleano.
 *
 * Hace falta porque estos endpoints reciben `multipart/form-data` para poder llevar el archivo, y
 * ahí TODO llega como texto. `Boolean('false')` es `true`, así que el `@Type(() => Boolean)`
 * habitual convertiría un "no" explícito del usuario en un "sí" — y en `set_balance_to_closing`
 * eso significa pisarle el saldo de la cuenta sin que lo haya pedido.
 *
 * @param value valor recibido en el formulario
 * @returns el booleano equivalente
 */
function toBoolean({ value }: { value: unknown }): boolean | undefined {
  if (value === undefined || value === null || value === '') return undefined;
  if (typeof value === 'boolean') return value;
  return ['true', '1', 'on', 'yes'].includes(String(value).trim().toLowerCase());
}

/**
 * Interpreta el mapeo, que en `multipart/form-data` viaja como un JSON en un campo de texto.
 *
 * Además de parsear el JSON hay que construir la instancia a mano con `plainToInstance`: un
 * `@Transform` REEMPLAZA la conversión que haría `@Type`, así que sin esto el mapeo quedaría como
 * objeto plano, sin la metadata de validación de la clase, y `forbidNonWhitelisted` rechazaría
 * todas sus propiedades como si fueran desconocidas.
 *
 * @param value valor recibido en el formulario
 * @returns la instancia de `MappingOverrideDto`
 * @throws BadRequestException si el texto no es JSON válido
 */
function toMapping({ value }: { value: unknown }): unknown {
  if (value === undefined || value === null) return undefined;

  let raw: unknown = value;
  if (typeof value === 'string') {
    if (value.trim() === '') return undefined;
    try {
      raw = JSON.parse(value);
    } catch {
      throw new BadRequestException('El campo "mapping" tiene que ser un JSON válido.');
    }
  }

  if (typeof raw !== 'object' || raw === null || Array.isArray(raw)) {
    throw new BadRequestException('El campo "mapping" tiene que ser un objeto.');
  }

  return plainToInstance(MappingOverrideDto, raw);
}

/** Cuerpo del `POST /statement-imports/preview`. */
export class PreviewStatementDto {
  /** Cuenta a la que se importarían los movimientos; define la moneda y el banco. */
  @IsUUID()
  user_account_id: string;

  @IsOptional()
  @Transform(toMapping)
  @ValidateNested()
  @Type(() => MappingOverrideDto)
  mapping?: MappingOverrideDto;
}

/** Cuerpo del `POST /statement-imports/confirm`. */
export class ConfirmStatementDto extends PreviewStatementDto {
  /**
   * Dejar el saldo de la cuenta igual al saldo de cierre de la cartola.
   *
   * Por defecto la importación NO toca el saldo. Una cartola es el registro de lo que ya pasó, y
   * sumarle sus movimientos a un saldo que ya los refleja lo duplicaría. Con esta opción el saldo
   * queda cuadrado con el banco, que es lo que uno realmente quiere después de importar.
   */
  @IsOptional()
  @Transform(toBoolean)
  @IsBoolean()
  set_balance_to_closing?: boolean;

  /** Guardar el mapeo usado para este banco, así la próxima cartola no pide confirmarlo de nuevo. */
  @IsOptional()
  @Transform(toBoolean)
  @IsBoolean()
  save_mapping?: boolean;
}
