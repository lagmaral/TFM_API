import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { TemporadaDTO } from '../dtos/temporada.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { LoggerService } from '../services/logger.service';
import { EquipoDTO } from '../dtos/equipo.dto';
import { EquipoEntity } from '../entities/equipo.entity';
import { EquipoMapper } from '../mappers/equipo.mapper';

@Injectable()
export class EquipoRepository extends BaseRepository<
  EquipoEntity,
  EquipoDTO,
  Partial<TemporadaDTO>
> {
  constructor(
    @InjectRepository(EquipoEntity)
    repository: Repository<EquipoEntity>,
    private readonly logger: LoggerService,
  ) {
    super(repository, EquipoMapper.toDTO, EquipoMapper.toEntity);
    logger.setContext('EquipoRepository');
  }

  // Sobrescribir el método findAll
  async findAll(): Promise<EquipoDTO[]> {
    return await super.findAllWithRelations(['temporada']); // Llamada al método findAll de la clase base
  }

  async findById(id: number): Promise<EquipoDTO | null> {
    return await super.findByIdWithRelations(id, ['temporada']);
  }

  // Método para obtener todos los equipos de una temporada ordenados por el campo 'orden'
  async findByTempId(idTemporada: number): Promise<EquipoDTO[]> {
    // Realizamos la consulta filtrando por el campo 'idtemporada' y ordenando por 'orden' de manera creciente
    const entities = await this.repository.find({
      where: { temporada: { id: idTemporada } }, // Filtramos por el id de la temporada
      order: { orden: 'ASC' }, // Ordenamos de forma creciente por el campo 'orden'
      relations: ['temporada'], // Incluimos la relación con la temporada
    });
    return entities.map(EquipoMapper.toDTO); // Transformar a DTO
  }
}
