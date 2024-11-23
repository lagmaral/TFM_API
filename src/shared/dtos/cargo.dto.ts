import { IsString, Length, IsNumber } from 'class-validator';
import { BaseDTO } from './base.dto';

export class CargoDTO extends BaseDTO {
  @IsString()
  @Length(1, 100)
  nombre: string;

  @IsNumber()
  orden: number;
}
