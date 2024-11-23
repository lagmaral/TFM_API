import { JugadorEntity } from '../entities/jugador.entity';
import { JugadorDTO } from '../dtos/jugador.dto';
import { PosicionEntity } from '../entities/posicion.entity';
import { CuotaEntity } from '../entities/cuota.entity';
import { PersonaEntity } from '../entities/persona.entity';

export class JugadorMapper {
  static toEntity(jugadorDTO: JugadorDTO): JugadorEntity {
    const jugador = new JugadorEntity();
    //jugador.id = jugadorDTO.id;
    jugador.fechaNacimiento = jugadorDTO.fechaNacimiento;
    jugador.posicion = new PosicionEntity();
    jugador.posicion.id = jugadorDTO.idposicion;
    jugador.foto = jugadorDTO.foto;
    jugador.internalkey = jugadorDTO.internalkey;
    jugador.cuota = new CuotaEntity();
    jugador.cuota.id = jugadorDTO.idcuota;
    jugador.consentimiento = jugadorDTO.consentimiento;
    jugador.persona = new PersonaEntity();
    jugador.persona.id = jugadorDTO.idpersona;

    
    return jugador;
  }

  static toDTO(jugador: JugadorEntity): JugadorDTO {
    const jugadorDTO = new JugadorDTO();
    jugadorDTO.id = jugador.id;
    jugadorDTO.fechaNacimiento = jugador.fechaNacimiento;
    jugadorDTO.idposicion = jugador.posicion ? jugador.posicion.id : null;  // Si temporada es null o undefined, asignar null
    jugadorDTO.foto = jugador.foto;
    jugadorDTO.internalkey = jugador.internalkey;
    jugadorDTO.idcuota = jugador.cuota ? jugador.cuota.id : null;  // Si temporada es null o undefined, asignar null
    jugadorDTO.consentimiento = jugador.consentimiento;
    jugadorDTO.idpersona = jugador.persona ? jugador.persona.id : null;
    return jugadorDTO;
  }
}