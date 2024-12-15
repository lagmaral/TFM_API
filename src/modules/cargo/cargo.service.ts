import { Injectable } from '@nestjs/common';
import { CargoDTO } from 'src/shared/dtos/cargo.dto';
import { CargoRepository } from 'src/shared/repository/cargo.repository';
import { LoggerService } from 'src/shared/services/logger.service';

@Injectable()
export class CargoService {

  constructor(
    private cargoRepository: CargoRepository,
    private readonly logger: LoggerService,
  ) {
    logger.setContext('CargoService');
  }

  async findAll(): Promise<CargoDTO[]> {
    return await this.cargoRepository.findAll();
  }

  /*async findById(id: number): Promise<PosicionDTO> {
    return await this.posicionRepository.findById(id);
  }

  async loadById(id: number): Promise<PosicionEntity> {
    return await this.posicionRepository.repository.findOne({ where: { id } });
  }*/
}
