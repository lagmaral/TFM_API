import { Injectable } from '@nestjs/common';
import { TemporadaRepository } from '../../shared/repository/temporada.repository';
import { TemporadaDTO } from '../../shared/dtos/temporada.dto';
import { LoggerService } from 'src/shared/services/logger.service';

@Injectable()
export class TemporadaService {
  constructor(
    private temporadaRepository: TemporadaRepository,
    private readonly logger: LoggerService,
  ) {
    logger.setContext('TemporadaService');
  }

  async findAll(): Promise<TemporadaDTO[]> {
    return await this.temporadaRepository.findAll();
  }

  async findActiva(): Promise<TemporadaDTO> {
    return await this.temporadaRepository.findActive();
  }

  async findById(id: number): Promise<TemporadaDTO> {
    return await this.temporadaRepository.findById(id);
  }

  async newTemporada(descripcion: string): Promise<TemporadaDTO> {
    return await this.temporadaRepository.createTemporada(descripcion);
  }

  async updateTemporada(dto: Partial<TemporadaDTO>): Promise<TemporadaDTO> {
    return this.temporadaRepository.update(dto.id, dto);
  }
}
