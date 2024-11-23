import { IsString, IsNumber, IsDate } from 'class-validator';
import { BaseDTO } from './base.dto';

export class EquipoChatDTO extends BaseDTO {
  @IsNumber()
  idusuario: number;

  @IsDate()
  fechamensaje: Date;

  @IsString()
  mensaje: string;
}