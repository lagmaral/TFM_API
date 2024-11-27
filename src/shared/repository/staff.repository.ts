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
  findAndCount(arg0: { where: any; skip: number; take: number; }): [any, any] | PromiseLike<[any, any]> {
      throw new Error('Method not implemented.');
  }
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
}
