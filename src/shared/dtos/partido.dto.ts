import { IsString, IsBoolean, Length, IsNumber, IsDate } from 'class-validator';
import { BaseDTO } from './base.dto';
import { RivalDTO } from './rival.dto';
import { EquipoDTO } from './equipo.dto';
import { ConfigurableService } from '../services/env.service';

export class PartidoDTO extends BaseDTO {
   @IsNumber()
  idequipo: number;
  equipo: EquipoDTO;
  equipoicon:string = ConfigurableService.getURLEscudosPath()+'00.png';
  
  @IsNumber()
  idrival: number;
  rival: RivalDTO;

  @IsBoolean()
  amistoso: boolean;

  @IsDate()
  fecha: Date;

  @IsString()
  @Length(1, 100)
  campo: string;

  @IsString()
  descripcion: string;

  @IsString()
  @Length(1, 50)
  municipio: string;

  @IsString()
  @Length(1, 100)
  coordenadas: string;

  @IsBoolean()
  local: boolean;

  @IsNumber()
  goleslocal?: number;

  @IsNumber()
  golesvisitante?: number;

  @IsNumber()
  iddelegado: number;
}