import { IsEmail, IsOptional, IsString, Length, MaxLength } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @MaxLength(255)
  email: string;

  @IsString()
  password: string;

  // Código TOTP de 6 dígitos, solo requerido si el usuario tiene 2FA activado.
  @IsOptional()
  @IsString()
  @Length(6, 6)
  code?: string;
}
