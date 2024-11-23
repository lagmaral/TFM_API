import { IsString, Length } from 'class-validator';
import { BaseDTO } from './base.dto';

export class PosicionDTO extends BaseDTO {
  @IsString()
  @Length(1, 2)
  descripcion: string;
}