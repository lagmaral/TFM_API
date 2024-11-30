/*import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { LoggerService } from '../services/logger.service';
import { PosicionEntity } from '../entities/posicion.entity';
import { PosicionDTO } from '../dtos/posicion.dto';
import { PosicionMapper } from '../mappers/posicion.mapper';

@Injectable()
export class PosicionRepository extends BaseRepository<
  PosicionEntity,
  PosicionDTO,
  Partial<PosicionDTO>
> {

  constructor(
    @InjectRepository(PosicionEntity)
    repository: Repository<PosicionEntity>,
    private readonly logger: LoggerService,
  ) {
    super(repository, PosicionMapper.toDTO, PosicionMapper.toEntity);
    logger.setContext('PosicionRepository');
  }

  
}
*/