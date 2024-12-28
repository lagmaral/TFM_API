
import { RivalDTO } from '../dtos/rival.dto';
import { RivalEntity } from '../entities/rival.entity';

export class RivalMapper {
  static toEntity(rivalDTO: RivalDTO): RivalEntity {
    const entity = new RivalEntity();
    //autorizados.id = autorizadosDTO.id;
    entity.id = rivalDTO.id;
    entity.nombre = rivalDTO.nombre;
    entity.image = rivalDTO.image;

    return entity;
  }

  static toDTO(input: RivalEntity): RivalDTO {
    const dto = new RivalDTO();
    dto.id = input.id;
    if(input.nombre)
      dto.nombre = input.nombre.toUpperCase(); 
    dto.image = input.image;
    return dto;
  }
}
