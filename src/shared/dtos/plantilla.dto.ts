import { IsString, IsBoolean, Length, IsNumber } from 'class-validator';
import { BaseDTO } from './base.dto';
import { EquipoDTO } from './equipo.dto';
import { JugadorDTO } from './jugador.dto';

export class PlantillaDTO extends BaseDTO {
  @IsNumber()
  idequipo: number;
  equipo: EquipoDTO;

  @IsNumber()
  idjugador: number;
  jugador: JugadorDTO;

  @IsBoolean()
  fijo: boolean;

  @IsString()
  @Length(1, 2)
  dorsal: string;
}