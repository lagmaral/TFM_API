import { IsString, IsBoolean, Length, IsNumber, IsDate } from 'class-validator';
import { BaseDTO } from './base.dto';

export class NoticiaDTO extends BaseDTO {
   @IsString()
  @Length(1, 500)
  titulo: string;

  @IsString()
  cuerpo: string;

  @IsDate()
  fechaalta: Date;

  @IsDate()
  fechapublicacion: Date;

  @IsBoolean()
  activa: boolean;
}