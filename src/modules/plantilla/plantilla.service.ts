import { Injectable } from '@nestjs/common';
import { PlantillaRepository } from 'src/shared/repository/plantilla.repository';
import { LoggerService } from 'src/shared/services/logger.service';
@Injectable()
export class PlantillaService {
    constructor(
        private plantillaRepository: PlantillaRepository,
        private readonly logger: LoggerService,
      ) {
        logger.setContext('PlantillaService');
      }

      async deletePlantillaByTeamId(id: number): Promise<boolean>  {
        return this.plantillaRepository.deletePlantillaByTeamId(id);
      }
}
