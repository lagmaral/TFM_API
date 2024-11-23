import { Entity,  Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('posicion')
export class PosicionEntity extends BaseEntity {
  @Column({ length: 2 })
  descripcion: string;
}