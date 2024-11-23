import { IsString, IsBoolean, Length, IsNumber, IsDate } from 'class-validator';
import { BaseDTO } from './base.dto';

export class JugadorDTO extends BaseDTO {
  @IsDate()
  fechaNacimiento: Date;

  @IsNumber()
  idposicion: number;

  @IsString()
  @Length(1, 500)
  foto: string;

  @IsString()
  @Length(1, 20)
  internalkey: string;

  @IsNumber()
  idcuota: number;

  @IsBoolean()
  consentimiento: boolean;

  @IsNumber()
  idpersona: number;
}