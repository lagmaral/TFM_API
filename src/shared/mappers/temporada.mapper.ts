import { TemporadaDTO } from '../dtos/temporada.dto';
import { TemporadaEntity } from '../entities/temporada.entity';

export class TemporadaMapper {
  // Mapea un DTO de creación a una entidad
  static toEntity(dto: Partial<TemporadaDTO>): TemporadaEntity {
      const entity = new TemporadaEntity();
      //if (dto.id !== undefined) entity.id = dto.id;
      if (dto.descripcion !== undefined) entity.descripcion = dto.descripcion;
      if (dto.activa !== undefined) entity.activa = dto.activa;
      return entity;
  }


  // Opcional: Mapea una entidad a un DTO de creación
  static toDTO(entity: TemporadaEntity): TemporadaDTO {
    const dto = new TemporadaDTO();
    dto.id = entity.id;
    dto.descripcion = entity.descripcion;
    dto.activa = entity.activa;
    return dto;
  }

}
