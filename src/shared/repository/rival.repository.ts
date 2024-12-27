import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { Between, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { LoggerService } from '../services/logger.service';
import { PartidoEntity } from '../entities/partido.entity';
import { PartidoDTO } from '../dtos/partido.dto';
import { PartidoMapper } from '../mappers/partido.mapper';
import { RivalEntity } from '../entities/rival.entity';
import { RivalMapper } from '../mappers/rival.mapper';
import { RivalDTO } from '../dtos/rival.dto';

@Injectable()
export class RivalRepository extends BaseRepository<
  RivalEntity,
  RivalDTO,
  Partial<RivalDTO>
> {

  constructor(
    @InjectRepository(RivalEntity)
    repository: Repository<RivalEntity>,
    private readonly logger: LoggerService,
  ) {
    super(repository, RivalMapper.toDTO, RivalMapper.toEntity);
    logger.setContext('RivalEntity');
  }


  async findAll(): Promise<RivalDTO[]> {
    const entities = await this.repository.find({
      order: {
        nombre: 'ASC'  // Ordena alfabéticamente de forma ascendente
      },
    });
  
    return entities.map(RivalMapper.toDTO); // Mapea las entidades a DTOs
  }
  
}
