import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ChatEntity } from './chat.entity';
import { UsuarioEntity } from './usuario.entity';
import { BaseEntity } from './base.entity';

@Entity('chatmensaje')
export class ChatMensajeEntity extends BaseEntity {
  @ManyToOne(() => ChatEntity)
  @JoinColumn({ name: 'idchat' })
  chat: ChatEntity;

  @ManyToOne(() => UsuarioEntity)
  @JoinColumn({ name: 'idusuario' })
  usuario: UsuarioEntity;

  @Column({ type: 'date'})
  fechamensaje: Date;

  @Column('text')
  mensaje: string;
}