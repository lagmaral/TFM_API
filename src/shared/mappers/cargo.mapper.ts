import { CargoEntity } from '../entities/cargo.entity';
import { CargoDTO } from '../dtos/cargo.dto';

export class CargoMapper {
  static toEntity(cargoDTO: CargoDTO): CargoEntity {
    const cargo = new CargoEntity();
    //cargo.id = cargoDTO.id;
    cargo.nombre = cargoDTO.nombre;
    cargo.orden = cargoDTO.orden;
    return cargo;
  }

  static toDTO(cargo: CargoEntity): CargoDTO {
    const cargoDTO = new CargoDTO();
    cargoDTO.id = cargo.id;
    cargoDTO.nombre = cargo.nombre;
    cargoDTO.orden = cargo.orden;
    return cargoDTO;
  }
}