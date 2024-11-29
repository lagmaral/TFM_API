import { Injectable } from '@nestjs/common';
import { EquipoChatRepository } from 'src/shared/repository/equipo-chat.repository';
import { LoggerService } from 'src/shared/services/logger.service';
@Injectable()
export class EquipoChatService {
    constructor(
        private equipoChatRepository: EquipoChatRepository,
        private readonly logger: LoggerService,
      ) {
        logger.setContext('EquipoChatService');
      }

      async deleteEquipoChatByTeamId(id: number): Promise<boolean>  {
        return this.equipoChatRepository.deleteEquipoChatByTeamId(id);
      }
}
