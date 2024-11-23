import { IsString, IsBoolean, Length, IsNumber } from 'class-validator';
import { BaseDTO } from './base.dto';

export class PlantillaDTO extends BaseDTO {
  @IsNumber()
  idequipo: number;

  @IsNumber()
  idjugador: number;

  @IsBoolean()
  fijo: boolean;

  @IsString()
  @Length(1, 2)
  dorsal: string;
}