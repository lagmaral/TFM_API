import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { PersonaEntity } from './persona.entity';
import { JugadorEntity } from './jugador.entity';
import { BaseEntity } from './base.entity';

@Entity('autorizados')
export class AutorizadosEntity extends BaseEntity {
  @ManyToOne(() => PersonaEntity)
  @JoinColumn({ name: 'idpersona' })
  persona: PersonaEntity;

  @ManyToOne(() => JugadorEntity)
  @JoinColumn({ name: 'idjugador' })
  jugador: JugadorEntity;

  @Column({ length: 20, unique: true })
  telefono: string;
}