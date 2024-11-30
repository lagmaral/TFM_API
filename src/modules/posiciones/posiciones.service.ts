import { Injectable } from '@nestjs/common';
import { LoggerService } from 'src/shared/services/logger.service';
import { PosicionRepository } from 'src/shared/repository/posicion.repository';
import { PosicionDTO } from 'src/shared/dtos/posicion.dto';
import { PosicionEntity } from 'src/shared/entities/posicion.entity';


@Injectable()
export class PosicionesService {
  constructor(
    private posicionRepository: PosicionRepository,
    private readonly logger: LoggerService,
  ) {
    logger.setContext('PosicionesService');
  }

  async findAll(): Promise<PosicionDTO[]> {
    return await this.posicionRepository.findAll();
  }

  async findById(id: number): Promise<PosicionDTO> {
    return await this.posicionRepository.findById(id);
  }

  async loadById(id: number): Promise<PosicionEntity> {
    return await this.posicionRepository.repository.findOne({ where: { id } });
  }
}
