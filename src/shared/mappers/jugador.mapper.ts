import { JugadorEntity } from '../entities/jugador.entity';
import { JugadorDTO } from '../dtos/jugador.dto';
import { PosicionEntity } from '../entities/posicion.entity';
import { CuotaEntity } from '../entities/cuota.entity';
import { PersonaEntity } from '../entities/persona.entity';
import { ConfigurableService } from '../services/env.service';

export class JugadorMapper {
  static toEntity(jugadorDTO: JugadorDTO): JugadorEntity {
    const jugador = new JugadorEntity();
    //jugador.id = jugadorDTO.id;
    jugador.fechanacimiento = jugadorDTO.fechanacimiento;
    jugador.posicion = new PosicionEntity();
    jugador.posicion.id = jugadorDTO.idposicion;
    if (jugadorDTO.internalkey) {
      jugador.internalkey = jugadorDTO.internalkey
          .toUpperCase()
          .replaceAll(ConfigurableService.getURLPlayersPath(), '')
          .replaceAll('.JPG', '');
    } else {
      jugador.internalkey  = ''; // O puedes asignar un valor por defecto si lo prefieres
    }
    //jugador.internalkey = jugadorDTO.internalkey.toUpperCase().replaceAll(ConfigurableService.getURLPlayersPath(), '').replaceAll('.JPG', '');
    //jugador.cuota = new CuotaEntity();
    //jugador.cuota.id = jugadorDTO.idcuota;
    jugador.consentimiento = jugadorDTO.consentimiento;
    jugador.nombre = jugadorDTO.nombre.toUpperCase();
    jugador.apellido1 = jugadorDTO.apellido1.toUpperCase();
    jugador.apellido2 = jugadorDTO.apellido2.toUpperCase();

    
    return jugador;
  }

  static toDTO(jugador: JugadorEntity): JugadorDTO {
    const jugadorDTO = new JugadorDTO();
    jugadorDTO.id = jugador.id;
    jugadorDTO.fechanacimiento = jugador.fechanacimiento;
    jugadorDTO.idposicion = jugador.posicion ? jugador.posicion.id : null;  // Si temporada es null o undefined, asignar null
    jugadorDTO.internalkey = ConfigurableService.getURLPlayersPath()+jugador.internalkey+'.jpg';
    //jugadorDTO.idcuota = jugador.cuota ? jugador.cuota.id : null;  // Si temporada es null o undefined, asignar null
    jugadorDTO.consentimiento = jugador.consentimiento;
    jugadorDTO.nombre = jugador.nombre;
    jugadorDTO.apellido1 = jugador.apellido1;
    jugadorDTO.apellido2 = jugador.apellido2;
    return jugadorDTO;
  }
}