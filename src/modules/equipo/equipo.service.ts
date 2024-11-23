import { Injectable } from '@nestjs/common';
import { LoggerService } from 'src/shared/services/logger.service';
import { EquipoDTO } from 'src/shared/dtos/equipo.dto';
import { EquipoRepository } from 'src/shared/repository/equipo.repository';

@Injectable()
export class EquipoService {
  constructor(
    private equipoRepository: EquipoRepository,
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
    return await this.equipoRepository.save(dto);
  }

  async updateTeam(dto: Partial<EquipoDTO>): Promise<EquipoDTO> {
    return this.equipoRepository.update(dto.id, dto);
  }
}
