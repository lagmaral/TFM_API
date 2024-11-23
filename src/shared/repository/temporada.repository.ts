import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { TemporadaEntity } from '../entities/temporada.entity';
import { TemporadaDTO } from '../dtos/temporada.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TemporadaMapper } from '../mappers/temporada.mapper';
import { LoggerService } from '../services/logger.service';

@Injectable()
export class TemporadaRepository extends BaseRepository<
  TemporadaEntity,
  TemporadaDTO,
  Partial<TemporadaDTO>
> {
  constructor(
    @InjectRepository(TemporadaEntity)
    repository: Repository<TemporadaEntity>,
    private readonly logger: LoggerService,
  ) {
    super(repository, TemporadaMapper.toDTO, TemporadaMapper.toEntity);
    logger.setContext('TemporadaRepository');
  }

  // Obtener la temporada activa
  async findActive(): Promise<TemporadaDTO | undefined> {
    const entity = await this.repository.findOne({ where: { activa: true } }); // Busca una temporada activa
    return entity ? TemporadaMapper.toDTO(entity) : null; // Transformar a DTO
  }

  // Crear una nueva temporada
  async createTemporada(descripcion: string): Promise<TemporadaDTO> {
    const temporada = this.repository.create({
      descripcion,
      activa: false,
    }); // Crear con 'activa' por defecto en 'false'
    const entity = await this.repository.save(temporada); // Guarda la nueva temporada
    return entity ? TemporadaMapper.toDTO(entity) : null; // Transformar a DTO
  }
}
