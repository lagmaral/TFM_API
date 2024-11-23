import { PartidoEntity } from '../entities/partido.entity';
import { PartidoDTO } from '../dtos/partido.dto';
import { EquipoEntity } from '../entities/equipo.entity';
import { PersonaEntity } from '../entities/persona.entity';

export class PartidoMapper {
  static toEntity(partidoDTO: PartidoDTO): PartidoEntity {
    const partido = new PartidoEntity();
    //partido.id = partidoDTO.id;
    partido.equipo = new EquipoEntity();
    partido.equipo.id = partidoDTO.idequipo;
    partido.amistoso = partidoDTO.amistoso;
    partido.fecha = partidoDTO.fecha;
    partido.campo = partidoDTO.campo;
    partido.descripcion = partidoDTO.descripcion;
    partido.municipio = partidoDTO.municipio;
    partido.coordenadas = partidoDTO.coordenadas;
    partido.rival = partidoDTO.rival;
    partido.local = partidoDTO.local;
    partido.goleslocal = partidoDTO.goleslocal;
    partido.golesvisitante = partidoDTO.golesvisitante;
    partido.delegado = new PersonaEntity();
    partido.delegado.id = partidoDTO.iddelegado;
    return partido;
  }

  static toDTO(partido: PartidoEntity): PartidoDTO {
    const partidoDTO = new PartidoDTO();
    partidoDTO.id = partido.id;
    partidoDTO.idequipo = partido.equipo ? partido.equipo.id : null;  // Si temporada es null o undefined, asignar null
    partidoDTO.amistoso = partido.amistoso;
    partidoDTO.fecha = partido.fecha;
    partidoDTO.campo = partido.campo;
    partidoDTO.descripcion = partido.descripcion;
    partidoDTO.municipio = partido.municipio;
    partidoDTO.coordenadas = partido.coordenadas;
    partidoDTO.rival = partido.rival;
    partidoDTO.local = partido.local;
    partidoDTO.goleslocal = partido.goleslocal;
    partidoDTO.golesvisitante = partido.golesvisitante;
    partidoDTO.iddelegado = partido.delegado ? partido.delegado.id : null;  // Si temporada es null o undefined, asignar null
    return partidoDTO;
  }
}