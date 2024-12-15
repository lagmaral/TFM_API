import { EquipoEntity } from '../entities/equipo.entity';
import { EquipoDTO } from '../dtos/equipo.dto';
import { TemporadaEntity } from '../entities/temporada.entity';
import { UtilsService } from '../services/util.service';
import { ConfigurableService } from '../services/env.service';

export class EquipoMapper {
  static toEntity(equipoDTO: EquipoDTO): EquipoEntity {
    const equipo = new EquipoEntity();
 // equipo.id = equipoDTO.id; // Omite esto
    equipo.temporada = new TemporadaEntity();
    equipo.temporada.id = equipoDTO.idtemporada;
    if(equipoDTO.nombre!=undefined){
      equipo.nombre = equipoDTO.nombre.toUpperCase();
    }
    if(equipoDTO.descripcion!=undefined){
      equipo.descripcion = equipoDTO.descripcion.toUpperCase();
    }

    equipo.orden = equipoDTO.orden;
    equipo.activo = equipoDTO.activo;
    if (equipoDTO.internalkey) {
      equipo.internalkey = equipoDTO.internalkey
          .toUpperCase()
          .replaceAll(ConfigurableService.getURLPlayersPath(), '')
          .replaceAll('.JPG', '');
    } else {
      equipo.internalkey  = ''; // O puedes asignar un valor por defecto si lo prefieres
    }
    //equipo.internalkey = equipoDTO.internalkey.replaceAll(ConfigurableService.getURLPlayersPath(), '').replaceAll('.jpg', '');
    return equipo;
  }

  static toDTO(equipo: EquipoEntity): EquipoDTO {
    const equipoDTO = new EquipoDTO();
    equipoDTO.id = equipo.id;
    // Verificar si la propiedad temporada está definida antes de acceder a su id
    equipoDTO.idtemporada = equipo.temporada ? equipo.temporada.id : null;  // Si temporada es null o undefined, asignar null
    if(equipo.nombre!=undefined){
      equipoDTO.nombre = equipo.nombre.toUpperCase();
    }
    if(equipo.descripcion!=undefined){
      equipoDTO.descripcion = equipo.descripcion?.toUpperCase() ?? equipo.descripcion
    }
    equipoDTO.orden = equipo.orden;
    equipoDTO.activo = equipo.activo;
    equipoDTO.internalkey = ConfigurableService.getURLPlayersPath()+equipo.internalkey+'.JPG';
    return equipoDTO;
  }
}