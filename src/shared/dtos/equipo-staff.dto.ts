import { IsNumber } from 'class-validator';
import { BaseDTO } from './base.dto';

export class EquipoStaffDTO extends BaseDTO {
  @IsNumber()
  idcargo: number;

  @IsNumber()
  idstaff: number;

  @IsNumber()
  idequipo: number;
}