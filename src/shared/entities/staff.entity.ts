import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';
@Entity('staff')
export class StaffEntity extends BaseEntity {
  @Column({ length: 20, unique: true })
  telefono: string;

  @Column({ length: 50, unique: true })
  internalkey: string;

  @Column({ length: 500, nullable: true })
  foto: string;

  @Column({ default: false })
  admin: boolean;

  @Column({ type: 'date'})
  fechanacimiento: Date;

  @Column({ length: 100, nullable: true })
  nombre: string;

  @Column({ length: 200, nullable: true })
  apellido1: string;

  @Column({ length: 200, nullable: true })
  apellido2: string;
}