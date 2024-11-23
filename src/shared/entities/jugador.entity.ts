import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { PosicionEntity } from './posicion.entity';
import { CuotaEntity } from './cuota.entity';
import { PersonaEntity } from './persona.entity';
import { BaseEntity } from './base.entity';

@Entity('jugador')
export class JugadorEntity extends BaseEntity{
  @Column('timestamp')
  fechaNacimiento: Date;

  @ManyToOne(() => PosicionEntity)
  @JoinColumn({ name: 'idposicion' })
  posicion: PosicionEntity;

  @Column({ length: 500 })
  foto: string;

  @Column({ length: 20, unique: true })
  internalkey: string;

  @ManyToOne(() => CuotaEntity)
  @JoinColumn({ name: 'idcuota' })
  cuota: CuotaEntity;

  @Column({ default: false })
  consentimiento: boolean;

  @ManyToOne(() => PersonaEntity)
  @JoinColumn({ name: 'idpersona' })
  persona: PersonaEntity;


}