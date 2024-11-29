import { Entity, ManyToOne, JoinColumn } from 'typeorm';
import { CargoEntity } from './cargo.entity';
import { StaffEntity } from './staff.entity';
import { EquipoEntity } from './equipo.entity';
import { BaseEntity } from './base.entity';

@Entity('equipostaff')
export class EquipoStaffEntity extends BaseEntity {
  @ManyToOne(() => CargoEntity)
  @JoinColumn({ name: 'idcargo' })
  cargo: CargoEntity;

  @ManyToOne(() => StaffEntity)
  @JoinColumn({ name: 'idstaff' })
  staff: StaffEntity;

  @ManyToOne(() => EquipoEntity)
  @JoinColumn({ name: 'idequipo' })
  equipo: EquipoEntity;
}