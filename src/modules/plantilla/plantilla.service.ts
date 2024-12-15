import { Injectable } from '@nestjs/common';
import { JugadorDTO } from 'src/shared/dtos/jugador.dto';
import { PlantillaDTO } from 'src/shared/dtos/plantilla.dto';
import { PlantillaEntity } from 'src/shared/entities/plantilla.entity';
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

  async findTeamsByJugadorId(jugadorId: number): Promise<PlantillaDTO[]> {
    
    const object = await this.plantillaRepository.findTeamsByJugadorId(jugadorId);
    return object;
  }

  async newPlayerTeam(plantillaDTO: PlantillaDTO): Promise<PlantillaDTO> {
    return  await this.plantillaRepository.newPlayerTeam(plantillaDTO.idjugador, plantillaDTO.idequipo,plantillaDTO.dorsal);
  }

  async deletePlayerTeam(jugadorId: number, equipoId: number): Promise<void> {
    await this.plantillaRepository.deletePlayerTeamId(jugadorId,equipoId);
  }

  async deletePlayerTeamByPlayerId(jugadorId: number): Promise<void> {
    await this.plantillaRepository.deletePlayerTeamByPlayerId(jugadorId);
  }
      
  async deletePlayerTeamById(id: number): Promise<void> {
    await this.plantillaRepository.deletePlayerTeamById(id);
  }
}
