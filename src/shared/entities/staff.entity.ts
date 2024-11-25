import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { PersonaEntity } from './persona.entity';
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

  @ManyToOne(() => PersonaEntity)
  @JoinColumn({ name: 'idpersona' })
  persona: PersonaEntity;
}