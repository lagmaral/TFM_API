import { ChatMensajeEntity } from '../entities/chat-mensaje.entity';
import { ChatMessageDTO } from '../dtos/chat-message.dto';
import { ChatEntity } from '../entities/chat.entity';
import { UsuarioEntity } from '../entities/usuario.entity';

export class ChatMessageMapper {
  static toEntity(chatMessageDTO: ChatMessageDTO): ChatMensajeEntity {
    const chatMessage = new ChatMensajeEntity();
    //chatMessage.id = chatMessageDTO.id;
    chatMessage.chat = new ChatEntity();
    chatMessage.chat.id = chatMessageDTO.idchat;
    chatMessage.usuario = new UsuarioEntity();
    chatMessage.usuario.id = chatMessageDTO.idusuario;
    chatMessage.fechamensaje = chatMessageDTO.fechamensaje;
    chatMessage.mensaje = chatMessageDTO.mensaje;
    return chatMessage;
  }

  static toDTO(chatMessage: ChatMensajeEntity): ChatMessageDTO {
    const chatMessageDTO = new ChatMessageDTO();
    chatMessageDTO.id = chatMessage.id;
    chatMessageDTO.idchat = chatMessage.chat ? chatMessage.chat.id : null; // Si temporada es null o undefined, asignar null
    chatMessageDTO.idusuario = chatMessage.usuario ? chatMessage.usuario.id : null; // Si temporada es null o undefined, asignar null
    chatMessageDTO.fechamensaje = chatMessage.fechamensaje;
    chatMessageDTO.mensaje = chatMessage.mensaje;
    return chatMessageDTO;
  }
}
