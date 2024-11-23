import { IsString, IsNumber, IsDate } from 'class-validator';
import { BaseDTO } from './base.dto';

export class ChatMessageDTO extends BaseDTO {
  @IsNumber()
  idchat: number;

  @IsNumber()
  idusuario: number;

  @IsDate()
  fechamensaje: Date;

  @IsString()
  mensaje: string;
}
