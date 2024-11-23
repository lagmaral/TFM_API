import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { UsuarioEntity } from './usuario.entity';
import { BaseEntity } from './base.entity';
@Entity('equipochat')
export class EquipoChatEntity extends BaseEntity {
  @ManyToOne(() => UsuarioEntity)
  @JoinColumn({ name: 'idusuario' })
  usuario: UsuarioEntity;

  @Column('timestamp')
  fechamensaje: Date;

  @Column('text')
  mensaje: string;
}