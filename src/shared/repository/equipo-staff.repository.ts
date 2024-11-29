import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { LoggerService } from '../services/logger.service';
import { EquipoStaffDTO } from '../dtos/equipo-staff.dto';
import { EquipoStaffEntity } from '../entities/equipo-staff.entity';
import { EquipoStaffMapper } from '../mappers/equipo-staff.mapper';

@Injectable()
export class EquipoStaffRepository extends BaseRepository<
  EquipoStaffEntity,
  EquipoStaffDTO,
  Partial<EquipoStaffDTO>
> {

  constructor(
    @InjectRepository(EquipoStaffEntity)
    repository: Repository<EquipoStaffEntity>,
    private readonly logger: LoggerService,
  ) {
    super(repository, EquipoStaffMapper.toDTO, EquipoStaffMapper.toEntity);
    logger.setContext('EquipoStaffRepository');
  }

  async deleteEquipoStaffByStaffId(id: number): Promise<boolean> {

    const equipoStaffs = await this.repository.find({
        where: {
          staff: { id: id }, // Asegúrate de que 'id' es el nombre correcto del campo en StaffEntity
        }
      });
      
      const result = await this.repository.remove(equipoStaffs);
      return result.length > 0;
  }
  
}
