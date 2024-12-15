import { IsNumber } from 'class-validator';
import { BaseDTO } from './base.dto';
import { CargoDTO } from './cargo.dto';
import { StaffDTO } from './staff.dto';
import { EquipoDTO } from './equipo.dto';

export class EquipoStaffDTO extends BaseDTO {
  @IsNumber()
  idcargo: number;
  cargo: CargoDTO;
  @IsNumber()
  idstaff: number;
  staff: StaffDTO;
  @IsNumber()
  idequipo: number;
  equipo: EquipoDTO;
}