import { IsString, Length, IsNumber } from 'class-validator';
import { BaseDTO } from './base.dto';

export class PersonaDTO extends BaseDTO {
  @IsString()
  @Length(1, 100)
  nombre: string;

  @IsString()
  @Length(1, 200)
  apellido1: string;

  @IsString()
  @Length(1, 200)
  apellido2: string;
}