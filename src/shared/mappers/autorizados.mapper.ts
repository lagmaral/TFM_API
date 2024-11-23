import { AutorizadosEntity } from '../entities/autorizados.entity';
import { AutorizadosDTO } from '../dtos/autorizados.dto';
import { PersonaEntity } from '../entities/persona.entity';
import { JugadorEntity } from '../entities/jugador.entity';

export class AutorizadosMapper {
  static toEntity(autorizadosDTO: AutorizadosDTO): AutorizadosEntity {
    const autorizados = new AutorizadosEntity();
    //autorizados.id = autorizadosDTO.id;
    autorizados.persona = new PersonaEntity();
    autorizados.persona.id = autorizadosDTO.idpersona;
    autorizados.jugador = new JugadorEntity();
    autorizados.jugador.id = autorizadosDTO.idjugador;
    autorizados.telefono = autorizadosDTO.telefono;
    return autorizados;
  }

  static toDTO(autorizados: AutorizadosEntity): AutorizadosDTO {
    const autorizadosDTO = new AutorizadosDTO();
    autorizadosDTO.id = autorizados.id;
    autorizadosDTO.idpersona = autorizados.persona
      ? autorizados.persona.id
      : null; // Si temporada es null o undefined, asignar null
    autorizadosDTO.idjugador = autorizados.jugador
      ? autorizados.jugador.id
      : null; // Si temporada es null o undefined, asignar null
    autorizadosDTO.telefono = autorizados.telefono;
    return autorizadosDTO;
  }
}
