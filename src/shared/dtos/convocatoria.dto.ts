import { IsNumber } from 'class-validator';
import { BaseDTO } from './base.dto';

export class ConvocatoriaDTO extends BaseDTO {
  @IsNumber()
  idpartido: number;

  @IsNumber()
  idjugador: number;
}