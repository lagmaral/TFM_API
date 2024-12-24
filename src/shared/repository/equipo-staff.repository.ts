import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { LoggerService } from '../services/logger.service';
import { EquipoStaffDTO } from '../dtos/equipo-staff.dto';
import { EquipoStaffEntity } from '../entities/equipo-staff.entity';
import { EquipoStaffMapper } from '../mappers/equipo-staff.mapper';
import { StaffEntity } from '../entities/staff.entity';
import { EquipoEntity } from '../entities/equipo.entity';
import { CargoEntity } from '../entities/cargo.entity';

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

  async deleteEquipoStaffByTeamId(id: number): Promise<boolean>  {
    const equipoStaffs = await this.repository.find({
      where: {
        equipo: { id: id }, // Asegúrate de que 'id' es el nombre correcto del campo en StaffEntity
      }
    });
    
    const result = await this.repository.remove(equipoStaffs);
    return result.length > 0;
  }
  
  async findTeamsByStaffId(staffId: number): Promise<EquipoStaffDTO[]> {
    const entities = await this.repository.find({
      where: { staff: { id: staffId } },
      relations: ['equipo', 'staff', 'cargo'],
    });
    return entities.map(EquipoStaffMapper.toDTO); // Transformar a DTO
  }

  async findStaffByTeamId(teamId: number): Promise<EquipoStaffDTO[]> {
    const entities = await this.repository.find({
      where: { equipo: { id: teamId } },
      relations: ['equipo', 'staff', 'cargo'],
      order: {
        cargo: {
          orden: 'ASC'
        }
      }
    });
    return entities.map(EquipoStaffMapper.toDTO); // Transformar a DTO
  }

  async newStaffTeam(staffId: number, equipoId: number, cargoId:number): Promise<EquipoStaffDTO> {
    let staff = new EquipoStaffEntity();
    staff.staff = { id: staffId } as StaffEntity;
    staff.equipo = { id: equipoId } as EquipoEntity;
    staff.cargo = { id: cargoId } as CargoEntity;;
    const entity = await this.repository.save(staff);
    return entity ? EquipoStaffMapper.toDTO(entity) : null; // Transformar a DTO
  }

  async deleteStaffTeamId(staffId: number, equipoId: number): Promise<void> {
    await this.repository.delete({
      staff: { id: staffId },
      equipo: { id: equipoId },
    });
  }
  
  async deleteStaffTeamByStaffId(staffId: number): Promise<void> {
    await this.repository.delete({
      staff: { id: staffId },
    });
  }

  async deleteStaffTeamById(id: number): Promise<void> {
    await this.repository.delete({
      id,
    });
  }  
}
