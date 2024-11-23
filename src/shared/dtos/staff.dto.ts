import { IsString, IsBoolean, Length, IsDate } from 'class-validator';
import { BaseDTO } from './base.dto';

export class StaffDTO extends BaseDTO {
   @IsString()
  @Length(1, 20)
  telefono: string;

  @IsString()
  @Length(1, 50)
  internalkey: string;

  @IsString()
  @Length(0, 500)
  foto?: string;

  @IsBoolean()
  admin: boolean;

  @IsDate()
  fechanacimiento: Date;
}