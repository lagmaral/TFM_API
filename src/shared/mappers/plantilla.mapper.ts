// plantilla.mapper.ts
import { PlantillaEntity } from '../entities/plantilla.entity';
import { PlantillaDTO } from '../dtos/plantilla.dto';
import { EquipoMapper } from './equipo.mapper';
import { JugadorMapper } from './jugador.mapper';

export class PlantillaMapper {
  // Método para convertir de entidad a DTO
  static toDTO(entity: PlantillaEntity): PlantillaDTO {
    const dto = new PlantillaDTO();
    dto.id = entity.id;
    dto.idequipo = entity.equipo ? entity.equipo.id : null; // Asegúrate de que 'id' esté disponible en EquipoEntity
    dto.equipo = entity.equipo ? EquipoMapper.toDTO(entity.equipo) : null;
    dto.idjugador = entity.jugador ? entity.jugador.id : null; // Asegúrate de que 'id' esté disponible en JugadorEntity
    dto.jugador = entity.equipo ? JugadorMapper.toDTO(entity.jugador) : null;
    //dto.fijo = entity.fijo;
    dto.dorsal = entity.dorsal;
    return dto;
  }

  // Método para convertir de DTO a entidad
  static toEntity(dto: PlantillaDTO): PlantillaEntity {
    const entity = new PlantillaEntity();
    entity.id = dto.id;
    // Aquí debes manejar la asignación de equipo y jugador según tu lógica de negocio
    // Por ejemplo, puedes buscar las entidades correspondientes por sus IDs
    //entity.fijo = dto.fijo;
    entity.dorsal = dto.dorsal;
    return entity;
  }
}