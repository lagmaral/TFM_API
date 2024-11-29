import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { TemporadaDTO } from '../dtos/temporada.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { LoggerService } from '../services/logger.service';

import { StaffEntity } from '../entities/staff.entity';
import { StaffDTO } from '../dtos/staff.dto';
import { StaffMapper } from '../mappers/staff.mapper';


@Injectable()
export class StaffRepository extends BaseRepository<
  StaffEntity,
  StaffDTO,
  Partial<StaffDTO>
> {
  constructor(
    @InjectRepository(StaffEntity)
    repository: Repository<StaffEntity>,
    private readonly logger: LoggerService,
  ) {
    super(repository, StaffMapper.toDTO, StaffMapper.toEntity);
    logger.setContext('StaffRepository');
  }

  // Crear un nuevo usuario
  async create(staff: StaffEntity): Promise<StaffDTO> {
    const entity = await this.repository.save(staff);
    return entity ? StaffMapper.toDTO(entity) : null; // Transformar a DTO
  }

  async findAndCount(arg0: { where: any; skip: number; take: number; }): Promise<[any[], number]> {
    this.logger.log('SKIP: '+arg0.skip);
    this.logger.log('TAKE: '+arg0.take);
    this.logger.log('WHERE: '+JSON.stringify(arg0.where));
    const [items, count] = await this.repository.createQueryBuilder('staff')
      //.where(arg0.where)
      .orderBy('staff.apellido1', 'ASC')
      .addOrderBy('staff.apellido2', 'ASC')
      .addOrderBy('staff.nombre', 'ASC')
      .skip(arg0.skip)
      .take(arg0.take)
      .getManyAndCount();
  
    return [items, count];
  }
}
