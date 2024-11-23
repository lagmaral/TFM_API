import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('temporada') // Asegúrate de poner el nombre correcto de tu tabla aquí
export class TemporadaEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 100 })
  descripcion: string;

  @Column({ type: 'boolean', default: false })
  activa: boolean;
}
