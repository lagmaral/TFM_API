import { EquipoEntity } from '../entities/equipo.entity';
import { EquipoDTO } from '../dtos/equipo.dto';
import { TemporadaEntity } from '../entities/temporada.entity';

export class EquipoMapper {
  static toEntity(equipoDTO: EquipoDTO): EquipoEntity {
    const equipo = new EquipoEntity();
 // equipo.id = equipoDTO.id; // Omite esto
    equipo.temporada = new TemporadaEntity();
    equipo.temporada.id = equipoDTO.idtemporada;
    equipo.nombre = equipoDTO.nombre;
    equipo.descripcion = equipoDTO.descripcion;
    equipo.orden = equipoDTO.orden;
    equipo.activo = equipoDTO.activo;
    return equipo;
  }

  static toDTO(equipo: EquipoEntity): EquipoDTO {
    const equipoDTO = new EquipoDTO();
    equipoDTO.id = equipo.id;
    // Verificar si la propiedad temporada está definida antes de acceder a su id
    equipoDTO.idtemporada = equipo.temporada ? equipo.temporada.id : null;  // Si temporada es null o undefined, asignar null
    equipoDTO.nombre = equipo.nombre;
    equipoDTO.descripcion = equipo.descripcion;
    equipoDTO.orden = equipo.orden;
    equipoDTO.activo = equipo.activo;
    return equipoDTO;
  }
}