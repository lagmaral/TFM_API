import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { PersonaEntity } from './persona.entity';
import { BaseEntity } from './base.entity';
@Entity('usuario')
export class UsuarioEntity extends BaseEntity {

  @Column({ length: 12, unique: true })
  telefono: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column({ length: 100 })
  username: string;

  @Column({ length: 200 })
  password: string;

  @Column({ length: 200, nullable: true })
  token: string;

  @Column({ length: 100 })
  nombre: string;

  @Column({ length: 200 })
  apellido1: string;

  @Column({ length: 200, nullable: true })
  apellido2: string;

  @Column('timestamp')
  fechanacimiento: Date;

}