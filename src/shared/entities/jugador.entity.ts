import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { PosicionEntity } from './posicion.entity';
import { CuotaEntity } from './cuota.entity';
import { PersonaEntity } from './persona.entity';
import { BaseEntity } from './base.entity';

@Entity('jugador')
export class JugadorEntity extends BaseEntity{
  @Column({ type: 'date'})
  fechanacimiento: Date;

  @ManyToOne(() => PosicionEntity)
  @JoinColumn({ name: 'idposicion' })
  posicion: PosicionEntity;

  @Column({ length: 20, unique: true })
  internalkey: string;

  /*@ManyToOne(() => CuotaEntity)
  @JoinColumn({ name: 'idcuota' })
  cuota: CuotaEntity;*/

  @Column({
    type: "boolean",
    transformer: {
        to: (value: boolean) => value, // Transformación al guardar
        from: (value: any) => value === true || value === 'true', // Transformación al recuperar
    },
  } )
  consentimiento: boolean;

  @Column({ length: 100,  })
  nombre: string;

  @Column({ length: 200,  })
  apellido1: string;

  @Column({ length: 200,  })
  apellido2: string;


}