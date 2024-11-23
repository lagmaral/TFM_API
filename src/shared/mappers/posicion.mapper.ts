import { PosicionEntity } from '../entities/posicion.entity';
import { PosicionDTO } from '../dtos/posicion.dto';

export class PosicionMapper {
  static toEntity(posicionDTO: PosicionDTO): PosicionEntity {
    const posicion = new PosicionEntity();
    //posicion.id = posicionDTO.id;
    posicion.descripcion = posicionDTO.descripcion;
    return posicion;
  }

  static toDTO(posicion: PosicionEntity): PosicionDTO {
    const posicionDTO = new PosicionDTO();
    posicionDTO.id = posicion.id;
    posicionDTO.descripcion = posicion.descripcion;
    return posicionDTO;
  }
}