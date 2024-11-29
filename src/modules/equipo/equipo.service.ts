import { Injectable } from '@nestjs/common';
import { LoggerService } from 'src/shared/services/logger.service';
import { EquipoDTO } from 'src/shared/dtos/equipo.dto';
import { EquipoRepository } from 'src/shared/repository/equipo.repository';
import { PaginationDto } from 'src/shared/dtos/pagination.dto';
import { EquipoMapper } from 'src/shared/mappers/equipo.mapper';
import { EquipoStaffService } from '../equipo-staff/equipo-staff.service';
import { EquipoChatService } from '../equipo-chat/equipo-chat.service';
import { PlantillaService } from '../plantilla/plantilla.service';
import { TemporadaService } from '../temporada/temporada.service';
import { UtilsService } from 'src/shared/services/util.service';

@Injectable()
export class EquipoService {
  constructor(
    private equipoRepository: EquipoRepository,
    private readonly equipoStaffService: EquipoStaffService,
    private readonly equipoChatService: EquipoChatService,
    private readonly plantillaService: PlantillaService,
    private readonly temporadaService: TemporadaService,
    private readonly logger: LoggerService,
  ) {
    logger.setContext('EquipoService');
  }

  async findAll(): Promise<EquipoDTO[]> {
    return await this.equipoRepository.findAll();
  }

  async findById(id: number): Promise<EquipoDTO> {
    return await this.equipoRepository.findById(id);
  }

  async findAllByTemporadaOrdenada(idTemporada: number): Promise<EquipoDTO[]> {
    // Llamar al repositorio para obtener los equipos ordenados por 'orden'
    return await this.equipoRepository.findByTempId(idTemporada);
  }

  async newTeam(dto: EquipoDTO): Promise<EquipoDTO> {
    const temporada = await this.temporadaService.findActiva();
    dto.idtemporada = temporada.id;
    dto.internalkey = UtilsService.calculateTeamKey(dto);
    const orden = await this.equipoRepository.getNextOrdenValueUsingQueryBuilder();
    dto.orden = orden;
    return await this.equipoRepository.save(dto);
  }

  async updateTeam(dto: EquipoDTO): Promise<EquipoDTO> {
    dto.internalkey = UtilsService.calculateTeamKey(dto);
    return await this.equipoRepository.update(dto.id,dto);
  }

  async deleteTeam(id: number): Promise<boolean> {
    await this.equipoChatService.deleteEquipoChatByTeamId(id);
    await this.equipoStaffService.deleteEquipoStaffByTeamId(id);
    await this.plantillaService.deletePlantillaByTeamId(id);
    return this.equipoRepository.deleteById(id);
  }

  async findPaginated(
    filters: any,
    paginationDto: PaginationDto,
  ): Promise<{ data: EquipoDTO[]; total: number }> {
    const { page, limit } = paginationDto;
    this.logger.log('findPaginated'+JSON.stringify(paginationDto));
    const [result, total] = await this.equipoRepository.findAndCount({
      where: filters,
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data: result.map((staff) => EquipoMapper.toDTO(staff)), // Map results to DTOs
      total,
    };
  }
}
