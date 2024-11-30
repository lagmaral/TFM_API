import { Injectable, NotFoundException } from '@nestjs/common';
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

  /*async deletePlantillaByTeamId(id: number): Promise<boolean> {

    const equipoMembers = await this.repository.find({
        where: {
          equipo: { id: id }, // Asegúrate de que 'id' es el nombre correcto del campo en StaffEntity
        }
      });
      
      const result = await this.repository.remove(equipoMembers);
      return result.length > 0;
  }*/
  
}
