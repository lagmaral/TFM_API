import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('cuota')
export class CuotaEntity extends BaseEntity {
  @Column({ length: 255 })
  descripcion: string;
}