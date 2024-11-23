import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { TemporadaEntity } from './temporada.entity';
import { BaseEntity } from './base.entity';

@Entity('equipo')
export class EquipoEntity extends BaseEntity {

  @ManyToOne(() => TemporadaEntity)
  @JoinColumn({ name: 'idtemporada' })
  temporada: TemporadaEntity;

  @Column({ length: 200 })
  nombre: string;

  @Column('text')
  descripcion: string;

  @Column()
  orden: number;

  @Column({ default: false })
  activo: boolean;
}