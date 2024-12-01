import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
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
import { JugadorRepository } from 'src/shared/repository/jugador.repository';
import { JugadorDTO } from 'src/shared/dtos/jugador.dto';
import { JugadorMapper } from 'src/shared/mappers/jugador.mapper';
import { getRepository } from 'typeorm';
import { PosicionEntity } from 'src/shared/entities/posicion.entity';
//import config from 'src/ormconfig';
//import { AppDataSource } from '../../shared/services/datasource.service';
@Injectable()
export class JugadorService {
  constructor(
    private jugadorRepository: JugadorRepository,
    /*private readonly equipoStaffService: EquipoStaffService,
    private readonly equipoChatService: EquipoChatService,
    private readonly plantillaService: PlantillaService,
    private readonly temporadaService: TemporadaService,*/
    private readonly posicionesService: PosicionesService,
    private readonly logger: LoggerService,
  ) {
    logger.setContext('JugadorService');
  }

  async findById(id: number): Promise<JugadorDTO> {
    return await this.jugadorRepository.findById(id);
  }

  async findPaginated(
    filters: any,
    paginationDto: PaginationDto,
  ): Promise<{ data: JugadorDTO[]; total: number }> {
    const { page, limit } = paginationDto;
    this.logger.log('findPaginated'+JSON.stringify(paginationDto));
    const [result, total] = await this.jugadorRepository.findAndCount({
      where: filters,
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data: result.map((staff) => JugadorMapper.toDTO(staff)), // Map results to DTOs
      total,
    };
  }


  async newPlayer(jugadorDTO: JugadorDTO): Promise<JugadorDTO> {
    // Calcular internalkey
    const internalkey = UtilsService.calculatePlayerInternalKey(jugadorDTO);

    // Verificar si ya existe un Staff con este internalKey
    const existingPlayer = await this.jugadorRepository.repository.findOne({
      where: { internalkey },
    });
    if (existingPlayer) {
      throw new ConflictException('Jugador ya existente'); // Lanza un error si ya existe
    }

    jugadorDTO.internalkey = internalkey;
    // Crear una nueva instancia de Staff
    const player = JugadorMapper.toEntity(jugadorDTO);
    player.posicion = await this.posicionesService.loadById(jugadorDTO.idposicion);

    //TODO PENDIENTE DE GUARDAR LA RELACION CON PLANTILLA

    // Guardar en la base de datos
    return await this.jugadorRepository.create(player);
  }


  async deletePlayer(id: number): Promise<boolean> {
    //await this.equipoChatService.deleteEquipoChatByTeamId(id);
    //await this.equipoStaffService.deleteEquipoStaffByTeamId(id);
    //await this.plantillaService.deletePlantillaByTeamId(id);
    //TODO BORRAR DE PLANTILLA
    return this.jugadorRepository.deleteById(id);
  }

  async updatePlayer(id:number, dto: JugadorDTO): Promise<JugadorDTO> {
  
    // 1. Comprobar si el usuario existe por el token
    const player = await this.jugadorRepository.findById(id);
    if (!player) {
      throw new NotFoundException('Jugador no encontrado');
    }

    // 2. Verificar si el teléfono existe en la base de datos
    const internalKey = UtilsService.calculatePlayerInternalKey(dto);
    const existingPlayer = await this.jugadorRepository.repository.findOne({
      where: { internalkey: internalKey },
    });

    const numericId = Number(id);

    if (existingPlayer && existingPlayer.id !== numericId) {
      throw new ConflictException('Jugador ya existente'); // Lanza un error si ya existe
    }
    // 3. Modificar el usuario con los nuevos datos
    // Si el teléfono es válido o no se modifica, se puede actualizar

    const updatedPlayer = JugadorMapper.toEntity(dto);
    
    updatedPlayer.id = updatedPlayer.id; // Mantener el ID del usuario actual
    updatedPlayer.internalkey = internalKey; // Mantener el mismo token si es necesario

    updatedPlayer.fechanacimiento = UtilsService.formatDateToPostgres(new Date(updatedPlayer.fechanacimiento));
    //this.logger.log("ANTES DE GUARDAR: "+JSON.stringify(updatedStaff));
    // Actualiza la base de datos con los nuevos datos del usuario

    await this.jugadorRepository.update(id, updatedPlayer);

    // Devuelve el DTO actualizado del usuario
    return await this.jugadorRepository.findById(dto.id);

  }


  
}
