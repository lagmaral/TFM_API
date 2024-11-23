import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';
@Entity('persona')
export class PersonaEntity extends BaseEntity{
  @Column({ length: 100 })
  nombre: string;

  @Column({ length: 200 })
  apellido1: string;

  @Column({ length: 200 })
  apellido2: string;

}