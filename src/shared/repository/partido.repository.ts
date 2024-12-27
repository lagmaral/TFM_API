import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { Between, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { LoggerService } from '../services/logger.service';
import { PartidoEntity } from '../entities/partido.entity';
import { PartidoDTO } from '../dtos/partido.dto';
import { PartidoMapper } from '../mappers/partido.mapper';

@Injectable()
export class PartidoRepository extends BaseRepository<
  PartidoEntity,
     PartidoDTO,
  Partial<PartidoDTO>
> {

  constructor(
    @InjectRepository(PartidoEntity)
    repository: Repository<PartidoEntity>,
    private readonly logger: LoggerService,
  ) {
    super(repository, PartidoMapper.toDTO, PartidoMapper.toEntity);
    logger.setContext('PartidoEntity');
  }


  async getOneById(id: number): Promise<PartidoDTO> {
    const entity = await this.repository.findOne({ where: { id } });
    return entity ? PartidoMapper.toDTO(entity) : null; // Transformar a DTO
  }

  async findLastSevenDays(): Promise<PartidoDTO[]> {
    const today = new Date();
    const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    const entities = await this.repository.find({
      where: {
        fecha: Between(sevenDaysAgo, today)
      },
      order: {
        fecha: 'DESC'
      }
    });
    return entities.map(PartidoMapper.toDTO); // Transformar a DTO
  }

  async findAllByTeamId(teamId: number): Promise<PartidoDTO[]> {
    const entities = await this.repository.find({
        where: { equipo: { id: teamId } },
        relations: ['equipo']
      });
    return entities.map(PartidoMapper.toDTO); // Transformar a DTO
  }

  async createPartido(partidoData: PartidoDTO): Promise<PartidoDTO> {
    const entity = await this.repository.save(partidoData);
    return entity ? PartidoMapper.toDTO(entity) : null; // Transformar a DTO
  }

  async updatePartido(id: number, partidoData: PartidoDTO): Promise<PartidoDTO> {
    await this.repository.update(id,partidoData);
    return this.getOneById(id);
  }

  async deletePartido(id: number): Promise<boolean> {
    return await super.deleteById(id);
  }

  async updateGoals(id: number, goleslocal: number, golesvisitante: number): Promise<PartidoDTO> {
    return await this.update(id, { goleslocal, golesvisitante });
  }
  
}
