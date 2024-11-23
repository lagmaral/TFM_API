import { Entity, ManyToOne, JoinColumn } from 'typeorm';
import { PartidoEntity } from './partido.entity';
import { JugadorEntity } from './jugador.entity';
import { BaseEntity } from './base.entity';

@Entity('convocatoria')
export class ConvocatoriaEntity extends BaseEntity {
  @ManyToOne(() => PartidoEntity)
  @JoinColumn({ name: 'idpartido' })
  partido: PartidoEntity;

  @ManyToOne(() => JugadorEntity)
  @JoinColumn({ name: 'idjugador' })
  jugador: JugadorEntity;
}