import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { UsuarioEntity } from './usuario.entity';
import { BaseEntity } from './base.entity';
import { EquipoEntity } from './equipo.entity';
@Entity('equipochat')
export class EquipoChatEntity extends BaseEntity {
  @ManyToOne(() => UsuarioEntity)
  @JoinColumn({ name: 'idusuario' })
  usuario: UsuarioEntity;

  @Column({ type: 'date'})
  fechamensaje: Date;

  @Column('text')
  mensaje: string;

  @ManyToOne(() => EquipoEntity)
  @JoinColumn({ name: 'idequipo' })
  equipo: EquipoEntity;
}