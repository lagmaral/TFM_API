import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { LoggerService } from '../services/logger.service';


import { CargoEntity } from '../entities/cargo.entity';
import { CargoDTO } from '../dtos/cargo.dto';
import { CargoMapper } from '../mappers/cargo.mapper';


@Injectable()
export class CargoRepository extends BaseRepository<
  CargoEntity,
  CargoDTO,
  Partial<CargoDTO>
> {
  constructor(
    @InjectRepository(CargoEntity)
    repository: Repository<CargoEntity>,
    private readonly logger: LoggerService,
  ) {
    super(repository, CargoMapper.toDTO, CargoMapper.toEntity);
    logger.setContext('CargoRepository');
  }

  // Crear un nuevo cargo
  async create(cargo: CargoEntity): Promise<CargoDTO> {
    const entity = await this.repository.save(cargo);
    return entity ? CargoMapper.toDTO(entity) : null; // Transformar a DTO
  }

  
  

}
