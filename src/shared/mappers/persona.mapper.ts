import { PersonaEntity } from '../entities/persona.entity';
import { PersonaDTO } from '../dtos/persona.dto';

export class PersonaMapper {
  static toEntity(personaDTO: PersonaDTO): PersonaEntity {
    const persona = new PersonaEntity();
    //persona.id = personaDTO.id;
    persona.nombre = personaDTO.nombre;
    persona.apellido1 = personaDTO.apellido1;
    persona.apellido2 = personaDTO.apellido2;
    return persona;
  }

  static toDTO(persona: PersonaEntity): PersonaDTO {
    const personaDTO = new PersonaDTO();
    personaDTO.id = persona.id;
    personaDTO.nombre = persona.nombre;
    personaDTO.apellido1 = persona.apellido1;
    personaDTO.apellido2 = persona.apellido2;
    return personaDTO;
  }
}