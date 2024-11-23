import { IsString, IsBoolean, Length, IsNumber } from 'class-validator';
import { BaseDTO } from './base.dto';

export class PatrocinadorDTO extends BaseDTO {
  @IsString()
  @Length(1, 200)
  nombre: string;

  @IsString()
  @Length(1, 500)
  imagen: string;

  @IsBoolean()
  activa: boolean;
}