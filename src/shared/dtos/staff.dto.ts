import { IsString, IsBoolean, Length, IsDate } from 'class-validator';
import { BaseDTO } from './base.dto';
import { EquipoStaffDTO } from './equipo-staff.dto';

export class StaffDTO extends BaseDTO {
  @IsString()
  @Length(1, 20)
  telefono: string;

  @IsString()
  @Length(1, 50)
  internalkey: string;

  @IsBoolean()
  admin: boolean;

  @IsDate()
  fechanacimiento: Date;

  @IsString()
  @Length(0, 100)
  nombre?: string;
  
  @IsString()
  @Length(0, 200)
  apellido1?: string;

  @IsString()
  @Length(0, 200)
  apellido2?: string;

  equiposList : EquipoStaffDTO[];
}