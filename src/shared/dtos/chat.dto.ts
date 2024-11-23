import { IsString, Length, IsNumber } from 'class-validator';
import { BaseDTO } from './base.dto';

export class ChatDTO extends BaseDTO {
  @IsNumber()
  idcreador: number;

  @IsNumber()
  idreceptor: number;

  @IsString()
  @Length(1, 20)
  clave: string;
}