import { IsString, IsBoolean, Length, IsNumber, IsDate } from 'class-validator';
import { BaseDTO } from './base.dto';

export class JugadorDTO extends BaseDTO {
  @IsDate()
  fechanacimiento: Date;

  @IsNumber()
  idposicion: number;

  @IsNumber()
  idequipo: number;

  @IsString()
  @Length(1, 20)
  internalkey: string;

  //@IsNumber()
  //idcuota: number;

  @IsBoolean()
  consentimiento: boolean;

  @IsString()
  @Length(3, 100)
  nombre: string;

  @IsString()
  @Length(3, 200)
  apellido1: string;

  @IsString()
  @Length(3, 200)
  apellido2: string;

}