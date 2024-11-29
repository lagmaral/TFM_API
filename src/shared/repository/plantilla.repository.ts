import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { LoggerService } from '../services/logger.service';
import { EquipoStaffDTO } from '../dtos/equipo-staff.dto';
import { EquipoStaffEntity } from '../entities/equipo-staff.entity';
import { EquipoStaffMapper } from '../mappers/equipo-staff.mapper';
import { PlantillaEntity } from '../entities/plantilla.entity';
import { PlantillaDTO } from '../dtos/plantilla.dto';
import { PlantillaMapper } from '../mappers/plantilla.mapper';

@Injectable()
export class PlantillaRepository extends BaseRepository<
  PlantillaEntity,
  PlantillaDTO,
  Partial<PlantillaDTO>
> {

  constructor(
    @InjectRepository(PlantillaEntity)
    repository: Repository<PlantillaEntity>,
    private readonly logger: LoggerService,
  ) {
    super(repository, PlantillaMapper.toDTO, PlantillaMapper.toEntity);
    logger.setContext('PlantillaRepository');
  }

  async deletePlantillaByTeamId(id: number): Promise<boolean> {

    const equipoMembers = await this.repository.find({
        where: {
          equipo: { id: id }, // Asegúrate de que 'id' es el nombre correcto del campo en StaffEntity
        }
      });
      
      const result = await this.repository.remove(equipoMembers);
      return result.length > 0;
  }
  
}
