import { IsString, IsBoolean, Length, IsNumber, IsDate } from 'class-validator';
import { BaseDTO } from './base.dto';

export class PartidoDTO extends BaseDTO {
   @IsNumber()
  idequipo: number;

  @IsBoolean()
  amistoso: boolean;

  @IsDate()
  fecha: Date;

  @IsString()
  @Length(1, 100)
  campo: string;

  @IsString()
  descripcion: string;

  @IsString()
  @Length(1, 50)
  municipio: string;

  @IsString()
  @Length(1, 100)
  coordenadas: string;

  @IsString()
  @Length(1, 200)
  rival: string;

  @IsBoolean()
  local: boolean;

  @IsNumber()
  goleslocal?: number;

  @IsNumber()
  golesvisitante?: number;

  @IsNumber()
  iddelegado: number;
}