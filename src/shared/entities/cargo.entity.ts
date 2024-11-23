import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('cargo')
export class CargoEntity extends BaseEntity {
  @Column({ length: 100 })
  nombre: string;

  @Column()
  orden: number;
}