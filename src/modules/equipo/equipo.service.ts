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
import { PosicionesService } from '../posiciones/posiciones.service';
import { PosicionDTO } from 'src/shared/dtos/posicion.dto';
import { RivalRepository } from 'src/shared/repository/rival.repository';
import { RivalDTO } from 'src/shared/dtos/rival.dto';

@Injectable()
export class EquipoService {
  constructor(
    private equipoRepository: EquipoRepository,
    private rivalRepository: RivalRepository,
    private readonly equipoStaffService: EquipoStaffService,
    private readonly equipoChatService: EquipoChatService,
    private readonly plantillaService: PlantillaService,
    private readonly temporadaService: TemporadaService,
    private readonly posicionesService: PosicionesService,
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

  async findAllByTemporadaOrdenada(): Promise<EquipoDTO[]> {
    // Llamar al repositorio para obtener los equipos ordenados por 'orden'
    const temporada = await this.temporadaService.findActiva();
    return await this.equipoRepository.findByTempId(temporada.id);
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

  async findAllActiveTeams(): Promise<EquipoDTO[]> {
    return this.equipoRepository.findAllActiveTeams();
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

  async intercambiarOrden(id: number, direccion:string): Promise<void> {
    if(direccion === 'asc')
      await this.equipoRepository.intercambiarOrden(id,'asc');
    else
      await this.equipoRepository.intercambiarOrden(id,'desc');
  }

  async findAllPositions(): Promise<PosicionDTO[]> {
    return await this.posicionesService.findAll();
  }

  async findAllRivals(): Promise<RivalDTO[]> {
    return await this.rivalRepository.findAll();
  }
  
}
