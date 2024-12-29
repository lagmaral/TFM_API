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
    const entity = await this.repository.findOne({ where: { id },relations: ['equipo', 'rival'] });
    return entity ? PartidoMapper.toDTO(entity) : null; // Transformar a DTO
  }

  async findMonthRange(): Promise<PartidoDTO[]> {
    const today = new Date();
    const fifteenDaysAgo = new Date(today.getTime() - 15 * 24 * 60 * 60 * 1000);
    const fifteenDaysLater = new Date(today.getTime() + 15 * 24 * 60 * 60 * 1000);
  
    const entities = await this.repository.find({
      where: {
        fecha: Between(fifteenDaysAgo, fifteenDaysLater)
      },
      relations: ['equipo', 'rival'],
      order: {
        fecha: 'DESC'
      }
    });
  
    return entities.map(PartidoMapper.toDTO);
  }

  async findAllByTeamId(teamId: number): Promise<PartidoDTO[]> {
    const entities = await this.repository.find({
        where: { equipo: { id: teamId } },
        relations: ['equipo','rival'],
        order: {
          fecha: 'DESC', // Ordenar por fecha descendente
        },
      });
    return entities.map(PartidoMapper.toDTO); // Transformar a DTO
  }

  async createPartido(partidoData: PartidoEntity): Promise<PartidoDTO> {
   // Crea una nueva instancia de la entidad
   const entity = this.repository.create(partidoData);
    
   // Guarda la nueva entidad en la base de datos
   const savedEntity = await this.repository.save(entity);
   
   // Loguea la entidad guardada
   this.logger.log(JSON.stringify(savedEntity));
   
   // Devuelve el DTO transformado
   return savedEntity ? PartidoMapper.toDTO(savedEntity) : null; //
  }

  async updatePartido(id: number, partidoData: PartidoEntity): Promise<PartidoDTO> {
    await this.repository.update(id,partidoData);
    return await this.getOneById(id);
  }

  async deletePartido(id: number): Promise<boolean> {
    return await super.deleteById(id);
  }

  async updateGoals(id: number, goleslocal: number, golesvisitante: number): Promise<PartidoDTO> {
    await this.update(id, { goleslocal, golesvisitante });
    return await this.getOneById(id);
  }
  
}
