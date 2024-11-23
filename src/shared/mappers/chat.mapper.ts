import { ChatEntity } from '../entities/chat.entity';
import { ChatDTO } from '../dtos/chat.dto';
import { UsuarioEntity } from '../entities/usuario.entity';

export class ChatMapper {
  static toEntity(chatDTO: ChatDTO): ChatEntity {
    const chat = new ChatEntity();
    //chat.id = chatDTO.id;
    chat.creador = new UsuarioEntity();
    chat.creador.id = chatDTO.idcreador;
    chat.receptor = new UsuarioEntity();
    chat.receptor.id = chatDTO.idreceptor;
    chat.clave = chatDTO.clave;
    return chat;
  }

  static toDTO(chat: ChatEntity): ChatDTO {
    const chatDTO = new ChatDTO();
    chatDTO.id = chat.id;
    chatDTO.idcreador = chat.creador ? chat.creador.id : null; // Si temporada es null o undefined, asignar null
    chatDTO.idreceptor = chat.receptor ? chat.receptor.id : null; // Si temporada es null o undefined, asignar null
    chatDTO.clave = chat.clave;
    return chatDTO;
  }
}
