import { ConvocatoriaEntity } from '../entities/convocatoria.entity';
import { ConvocatoriaDTO } from '../dtos/convocatoria.dto';
import { PartidoEntity } from '../entities/partido.entity';
import { JugadorEntity } from '../entities/jugador.entity';

export class ConvocatoriaMapper {
  static toEntity(convocatoriaDTO: ConvocatoriaDTO): ConvocatoriaEntity {
    const convocatoria = new ConvocatoriaEntity();
    //convocatoria.id = convocatoriaDTO.id;
    convocatoria.partido = new PartidoEntity();
    convocatoria.partido.id = convocatoriaDTO.idpartido;
    convocatoria.jugador = new JugadorEntity();
    convocatoria.jugador.id = convocatoriaDTO.idjugador;
    return convocatoria;
  }

  static toDTO(convocatoria: ConvocatoriaEntity): ConvocatoriaDTO {
    const convocatoriaDTO = new ConvocatoriaDTO();
    convocatoriaDTO.id = convocatoria.id;
    convocatoriaDTO.idpartido = convocatoria.partido ? convocatoria.partido.id : null; // Si temporada es null o undefined, asignar null
    convocatoriaDTO.idjugador = convocatoria.jugador ? convocatoria.jugador.id : null; // Si temporada es null o undefined, asignar null
    return convocatoriaDTO;
  }
}