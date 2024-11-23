import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { EquipoEntity } from './equipo.entity';
import { JugadorEntity } from './jugador.entity';
import { BaseEntity } from './base.entity';

@Entity('plantilla')
export class PlantillaEntity extends BaseEntity{
  @ManyToOne(() => EquipoEntity)
  @JoinColumn({ name: 'idequipo' })
  equipo: EquipoEntity;

  @ManyToOne(() => JugadorEntity)
  @JoinColumn({ name: 'idjugador' })
  jugador: JugadorEntity;

  @Column({ default: true })
  fijo: boolean;

  @Column({ length: 2 })
  dorsal: string;
}