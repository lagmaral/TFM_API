import { Injectable } from '@nestjs/common';
import { EquipoStaffRepository } from 'src/shared/repository/equipo-staff.repository';
import { LoggerService } from 'src/shared/services/logger.service';
@Injectable()
export class EquipoStaffService {
    constructor(
        private equipoStaffRepository: EquipoStaffRepository,
        private readonly logger: LoggerService,
      ) {
        logger.setContext('EquipoStaffService');
      }

      async deleteEquipoStaffByStaffId(id: number): Promise<boolean>  {
        return this.equipoStaffRepository.deleteEquipoStaffByStaffId(id);
      }
}
