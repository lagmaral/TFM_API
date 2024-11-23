import { NoticiaEntity } from '../entities/noticia.entity';
import { NoticiaDTO } from '../dtos/noticia.dto';

export class NoticiaMapper {
  static toEntity(noticiaDTO: NoticiaDTO): NoticiaEntity {
    const noticia = new NoticiaDTO();
    //noticia.id = noticiaDTO.id;
    noticia.titulo = noticiaDTO.titulo;
    noticia.cuerpo = noticiaDTO.cuerpo;
    noticia.fechaalta = noticiaDTO.fechaalta;
    noticia.fechapublicacion = noticiaDTO.fechapublicacion;
    noticia.activa = noticiaDTO.activa;
    return noticia;
  }

  static toDTO(noticia: NoticiaEntity): NoticiaDTO {
    const noticiaDTO = new NoticiaDTO();
    noticiaDTO.id = noticia.id;
    noticiaDTO.titulo = noticia.titulo;
    noticiaDTO.cuerpo = noticia.cuerpo;
    noticiaDTO.fechaalta = noticia.fechaalta;
    noticiaDTO.fechapublicacion = noticia.fechapublicacion;
    noticiaDTO.activa = noticia.activa;
    return noticiaDTO;
  }
}