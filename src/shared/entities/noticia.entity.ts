import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('noticia')
export class NoticiaEntity extends BaseEntity {
  @Column({ length: 500 })
  titulo: string;

  @Column('text')
  cuerpo: string;

  @Column({ type: 'date'})
  fechaalta: Date;

  @Column({ type: 'date'})
  fechapublicacion: Date;

  @Column({ default: false })
  activa: boolean;
}