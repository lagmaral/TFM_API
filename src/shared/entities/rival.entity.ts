import { Entity,  Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('rival')
export class RivalEntity extends BaseEntity {
  @Column({ length: 200 })
  nombre: string;
  @Column({ length: 200})
  image: string;
}