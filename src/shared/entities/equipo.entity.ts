import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { TemporadaEntity } from './temporada.entity';
import { BaseEntity } from './base.entity';

@Entity('equipo')
export class EquipoEntity extends BaseEntity {

  @ManyToOne(() => TemporadaEntity)
  @JoinColumn({ name: 'idtemporada' })
  temporada: TemporadaEntity;

  @Column({ length: 200 })
  nombre: string;

  @Column('text')
  descripcion: string;

  @Column()
  orden: number;

  @Column({
    type: "boolean",
    transformer: {
        to: (value: boolean) => value, // Transformación al guardar
        from: (value: any) => value === true || value === 'true', // Transformación al recuperar
    },
  } )
  activo: boolean;

  @Column('text')
  internalkey: string;
  
}