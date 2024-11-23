import { IsString, Length, IsNumber } from 'class-validator';
import { BaseDTO } from './base.dto';

export class AutorizadosDTO extends BaseDTO {
  @IsNumber()
  idpersona: number;

  @IsNumber()
  idjugador: number;

  @IsString()
  @Length(1, 20)
  telefono: string;
}
