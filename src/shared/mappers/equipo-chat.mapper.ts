import { EquipoChatEntity } from '../entities/equipo-chat.entity';
import { EquipoChatDTO } from '../dtos/equipo-chat.dto';
import { UsuarioEntity } from '../entities/usuario.entity';

export class EquipoChatMapper {
  static toEntity(equipoChatDTO: EquipoChatDTO): EquipoChatEntity {
    const equipoChat = new EquipoChatEntity();
    //equipoChat.id = equipoChatDTO.id;
    equipoChat.usuario = new UsuarioEntity();
    equipoChat.usuario.id = equipoChatDTO.idusuario;
    equipoChat.fechamensaje = equipoChatDTO.fechamensaje;
    equipoChat.mensaje = equipoChatDTO.mensaje;
    return equipoChat;
  }

  static toDTO(equipoChat: EquipoChatEntity): EquipoChatDTO {
    const equipoChatDTO = new EquipoChatDTO();
    equipoChatDTO.id = equipoChat.id;
    equipoChatDTO.idusuario = equipoChat.usuario ? equipoChat.usuario.id : null; // Si temporada es null o undefined, asignar null
    equipoChatDTO.fechamensaje = equipoChat.fechamensaje;
    equipoChatDTO.mensaje = equipoChat.mensaje;
    return equipoChatDTO;
  }
}