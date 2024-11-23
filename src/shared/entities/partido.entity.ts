import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { EquipoEntity } from './equipo.entity';
import { PersonaEntity } from './persona.entity';
import { BaseEntity } from './base.entity';

@Entity('partido')
export class PartidoEntity extends BaseEntity {
  @ManyToOne(() => EquipoEntity)
  @JoinColumn({ name: 'idequipo' })
  equipo: EquipoEntity;

  @Column({ default: false })
  amistoso: boolean;

  @Column('timestamp')
  fecha: Date;

  @Column({ length: 100 })
  campo: string;

  @Column('text')
  descripcion: string;

  @Column({ length: 50 })
  municipio: string;

  @Column({ length: 100 })
  coordenadas: string;

  @Column({ length: 200 })
  rival: string;

  @Column({ default: true })
  local: boolean;

  @Column('smallint', { nullable: true })
  goleslocal: number;

  @Column('smallint', { nullable: true })
  golesvisitante: number;

  @ManyToOne(() => PersonaEntity)
  @JoinColumn({ name: 'iddelegado' })
  delegado: PersonaEntity;
}