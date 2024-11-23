import { IsString, Length, IsNumber } from 'class-validator';
import { BaseDTO } from './base.dto';

export class CuotaDTO extends BaseDTO {
 @IsString()
  @Length(1, 255)
  descripcion: string;
}