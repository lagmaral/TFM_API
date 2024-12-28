import { Injectable, NotFoundException } from '@nestjs/common';
import { PartidoDTO } from 'src/shared/dtos/partido.dto';
import { PartidoEntity } from 'src/shared/entities/partido.entity';
import { PartidoMapper } from 'src/shared/mappers/partido.mapper';
import { EquipoRepository } from 'src/shared/repository/equipo.repository';
import { PartidoRepository } from 'src/shared/repository/partido.repository';
import { LoggerService } from 'src/shared/services/logger.service';

@Injectable()
export class PartidoService {
  constructor(
    private partidoRepository: PartidoRepository,
    private equipoRepository:EquipoRepository,
    private readonly logger: LoggerService,
  ) {
    logger.setContext('PartidoService');
  }

  async findById(id: number): Promise<PartidoDTO> {
    return this.partidoRepository.findById(id);
  }

  async findLastSevenDays(): Promise<PartidoDTO[]> {
    return this.partidoRepository.findLastSevenDays();
  }

  async findAllByTeamId(teamId: number): Promise<PartidoDTO[]> {
    return this.partidoRepository.findAllByTeamId(teamId);
  }

  async createPartido(partidoData: PartidoDTO): Promise<PartidoDTO> {
    //this.logger.log(JSON.stringify(partidoData));
    const match = PartidoMapper.toEntity(partidoData);
    //this.logger.log('xx' +JSON.stringify(match));
    match.equipo = await this.equipoRepository.findByIdWithRelationsEntity(partidoData.idequipo, ['temporada']);
    //this.logger.log('xx2' +JSON.stringify(match));
    return this.partidoRepository.createPartido(match);
  }

  async updatePartido(id: number, partidoData: PartidoDTO): Promise<PartidoDTO> {
    const partido = await this.partidoRepository.findById(id);
    if (!partido) {
      throw new NotFoundException(`Partido con ID ${id} no encontrado`);
    }
    return this.partidoRepository.updatePartido(id, partidoData);
  }

  async deletePartido(id: number): Promise<void> {
    const partido = await this.partidoRepository.findById(id);
    if (!partido) {
      throw new NotFoundException(`Partido con ID ${id} no encontrado`);
    }
    await this.partidoRepository.deletePartido(id);
  }

  async updateGoals(id: number, goleslocal: number, golesvisitante: number): Promise<PartidoDTO> {
    const partido = await this.partidoRepository.findById(id);
    if (!partido) {
      throw new NotFoundException(`Partido con ID ${id} no encontrado`);
    }
    return this.partidoRepository.updateGoals(id, goleslocal, golesvisitante);
  }

}
