import { IsString, Length, IsEmail, IsDate } from 'class-validator';
import { BaseDTO } from './base.dto';

export class UsuarioDTO extends BaseDTO {
  @IsString()
  @Length(1, 12)
  telefono: string;

  @IsEmail()
  @Length(1, 100)
  email: string;

  @IsString()
  @Length(1, 100)
  username: string;

  @IsString()
  @Length(1, 100)
  password: string;

  @IsString()
  @Length(0, 200)
  token?: string;

  @IsString()
  @Length(1, 100)
  nombre: string;

  @IsString()
  @Length(0, 200)
  apellido1: string;

  @IsString()
  @Length(0, 200)
  apellido2: string;

  @IsDate()
  fechanacimiento: Date;
}