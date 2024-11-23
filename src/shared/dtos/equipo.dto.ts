import { IsString, IsBoolean, Length, IsNumber } from 'class-validator';
import { BaseDTO } from './base.dto';

export class EquipoDTO extends BaseDTO {
  @IsNumber()
  idtemporada: number;

  @IsString()
  @Length(1, 200)
  nombre: string;

  @IsString()
  descripcion: string;

  @IsNumber()
  orden: number;

  @IsBoolean()
  activo: boolean;
}