import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { UsuarioEntity } from './usuario.entity';
import { BaseEntity } from './base.entity';

@Entity('chat')
export class ChatEntity extends BaseEntity {
  @ManyToOne(() => UsuarioEntity)
  @JoinColumn({ name: 'Idcreador' })
  creador: UsuarioEntity;

  @ManyToOne(() => UsuarioEntity)
  @JoinColumn({ name: 'idreceptor' })
  receptor: UsuarioEntity;

  @Column({ length: 20, unique: true })
  clave: string;
}