import { UsuarioEntity } from '../entities/usuario.entity';
import { UsuarioDTO } from '../dtos/usuario.dto';

export class UsuarioMapper {
  static toEntity(usuarioDTO: UsuarioDTO): UsuarioEntity {
    const usuario = new UsuarioEntity();
    //usuario.id = usuarioDTO.id;
    usuario.telefono = usuarioDTO.telefono;
    usuario.email = usuarioDTO.email;
    usuario.username = usuarioDTO.username;
    usuario.password = usuarioDTO.password;
    usuario.token = usuarioDTO.token;
    usuario.nombre = usuarioDTO.nombre;
    usuario.apellido1 = usuarioDTO.apellido1;
    usuario.apellido2 = usuarioDTO.apellido2;
    return usuario;
  }

  static toDTO(usuario: UsuarioEntity): UsuarioDTO {
    const usuarioDTO = new UsuarioDTO();
    usuarioDTO.id = usuario.id;
    usuarioDTO.telefono = usuario.telefono;
    usuarioDTO.email = usuario.email;
    usuarioDTO.username = usuario.username;
    usuarioDTO.password = usuario.password;
    usuarioDTO.token = usuario.token;
    usuarioDTO.nombre = usuario.nombre;
    usuarioDTO.apellido1 = usuario.apellido1;
    usuarioDTO.apellido2 = usuario.apellido2;
    return usuarioDTO;
  }
}