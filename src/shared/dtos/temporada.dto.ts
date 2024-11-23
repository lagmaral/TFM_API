import { IsString, IsBoolean, Length } from 'class-validator';
import { BaseDTO } from './base.dto';

export class TemporadaDTO extends BaseDTO{

  @IsString()
  @Length(1, 100) // Limitar la longitud del campo 'descripcion' entre 1 y 100 caracteres
  descripcion: string;

  @IsBoolean()
  activa?: boolean;
}
