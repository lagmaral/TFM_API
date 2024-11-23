import { PatrocinadorEntity } from '../entities/patrocinador.entity';
import { PatrocinadorDTO } from '../dtos/patrocinador.dto';

export class PatrocinadorMapper {
  static toEntity(patrocinadorDTO: PatrocinadorDTO): PatrocinadorEntity {
    const patrocinador = new PatrocinadorEntity();
    //patrocinador.id = patrocinadorDTO.id;
    patrocinador.nombre = patrocinadorDTO.nombre;
    patrocinador.imagen = patrocinadorDTO.imagen;
    patrocinador.activa = patrocinadorDTO.activa;
    return patrocinador;
  }

  static toDTO(patrocinador: PatrocinadorEntity): PatrocinadorDTO {
    const patrocinadorDTO = new PatrocinadorDTO();
    patrocinadorDTO.id = patrocinador.id;
    patrocinadorDTO.nombre = patrocinador.nombre;
    patrocinadorDTO.imagen = patrocinador.imagen;
    patrocinadorDTO.activa = patrocinador.activa;
    return patrocinadorDTO;
  }
}