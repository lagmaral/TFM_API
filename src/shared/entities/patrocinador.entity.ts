import { Entity,  Column } from 'typeorm';
import { BaseEntity } from './base.entity';
@Entity('patrocinador')
export class PatrocinadorEntity extends BaseEntity {
  @Column({ length: 200 })
  nombre: string;

  @Column({ length: 500 })
  imagen: string;

  @Column({ default: false })
  activa: boolean;
}