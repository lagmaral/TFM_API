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
import { JugadorEntity } from '../entities/jugador.entity';
import { EquipoEntity } from '../entities/equipo.entity';

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


  async findTeamsByJugadorId(jugadorId: number): Promise<PlantillaDTO[]> {
    const entities = await this.repository.find({
      where: { jugador: { id: jugadorId } },
      relations: ['equipo', 'jugador'],
    });
    return entities.map(PlantillaMapper.toDTO); // Transformar a DTO
  }

  async newPlayerTeam(jugadorId: number, equipoId: number, dorsal: string): Promise<PlantillaDTO> {
    let plantilla = new PlantillaEntity();
    plantilla.jugador = { id: jugadorId } as JugadorEntity;
    plantilla.equipo = { id: equipoId } as EquipoEntity;
    plantilla.dorsal = dorsal;
    const entity = await this.repository.save(plantilla);
    return entity ? PlantillaMapper.toDTO(entity) : null; // Transformar a DTO
  }

  async deletePlayerTeamId(jugadorId: number, equipoId: number): Promise<void> {
    await this.repository.delete({
      jugador: { id: jugadorId },
      equipo: { id: equipoId },
    });
  }
  
  async deletePlayerTeamByPlayerId(jugadorId: number): Promise<void> {
    await this.repository.delete({
      jugador: { id: jugadorId },
    });
  }

  async deletePlayerTeamById(id: number): Promise<void> {
    await this.repository.delete({
      id,
    });
  }

  async findPlayersByTeamId(teamId: number): Promise<PlantillaDTO[]> {
    const entities = await this.repository.find({
      where: { equipo: { id: teamId } },
      relations: ['equipo', 'jugador', 'jugador.posicion'],
      order: {
        dorsal:  'ASC'
      }
    });
    return entities.map(PlantillaMapper.toDTO); // Transformar a DTO
  }
}
