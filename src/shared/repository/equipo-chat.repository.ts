import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { LoggerService } from '../services/logger.service';
import { EquipoStaffDTO } from '../dtos/equipo-staff.dto';
import { EquipoStaffEntity } from '../entities/equipo-staff.entity';
import { EquipoStaffMapper } from '../mappers/equipo-staff.mapper';
import { EquipoChatEntity } from '../entities/equipo-chat.entity';
import { EquipoChatDTO } from '../dtos/equipo-chat.dto';
import { EquipoChatMapper } from '../mappers/equipo-chat.mapper';

@Injectable()
export class EquipoChatRepository extends BaseRepository<
  EquipoChatEntity,
  EquipoChatDTO,
  Partial<EquipoChatDTO>
> {

  constructor(
    @InjectRepository(EquipoChatEntity)
    repository: Repository<EquipoChatEntity>,
    private readonly logger: LoggerService,
  ) {
    super(repository, EquipoChatMapper.toDTO, EquipoChatMapper.toEntity);
    logger.setContext('EquipoChatRepository');
  }

  async deleteEquipoChatByTeamId(id: number): Promise<boolean> {

    const equipoStaffs = await this.repository.find({
        where: {
          equipo: { id: id }, // Asegúrate de que 'id' es el nombre correcto del campo en StaffEntity
        }
      });
      
      const result = await this.repository.remove(equipoStaffs);
      return result.length > 0;
  }
  
}
