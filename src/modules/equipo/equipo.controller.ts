import { Controller, Get, Post, Put, Param, Body } from '@nestjs/common';
import { LoggerService } from 'src/shared/services/logger.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { EquipoService } from './equipo.service';
import { EquipoDTO } from 'src/shared/dtos/equipo.dto';

@ApiTags('equipo') // Etiqueta para el grupo
@Controller('equipo')
export class EquipoController {
  constructor(
    private equipoService: EquipoService,
    private readonly logger: LoggerService,
  ) {
    this.logger.setContext('EquipoController');
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los equipos' })
  @ApiResponse({
    status: 200,
    description: 'Devuelve todos los equipos.',
    type: [EquipoDTO],
  })
  async findAll(): Promise<EquipoDTO[]> {
    this.logger.log('Fetching all teams');
    return await this.equipoService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un equipo por ID' })
  @ApiResponse({
    status: 200,
    description: 'Devuelve un equipo por su ID',
    type: EquipoDTO,
  })
  @ApiResponse({
    status: 404,
    description: 'No se encuentra el equipo',
  })
  async findOne(@Param('id') id: number): Promise<EquipoDTO> {
    this.logger.log('Fetching teams by id');
    return this.equipoService.findById(id);
  }

  // Endpoint para obtener todos los equipos de una temporada ordenados por 'orden'
  @Get('temporada/:idTemporada')
  @ApiOperation({ summary: 'Obtener los equipos de una temporada' })
  @ApiResponse({
    status: 200,
    description: 'Devuelve los equipos de una temporada',
    type: EquipoDTO,
  })
  @ApiResponse({
    status: 404,
    description: 'No se encuentra el equipo',
  })
  async findAllByTemporada(
    @Param('idTemporada') idTemporada: number,
  ): Promise<EquipoDTO[]> {
    return this.equipoService.findAllByTemporadaOrdenada(idTemporada);
  }

  @Post()
  @ApiOperation({ summary: 'Crear una nuevo equipo' })
  @ApiBody({
    type: EquipoDTO,
    description: 'Crea un nuevo equipo',
    required: true,
  })
  @ApiResponse({
    status: 201,
    description: 'Equipo creada exitosamente',
    type: EquipoDTO,
  })
  async create(@Body() input: EquipoDTO): Promise<EquipoDTO> {
    this.logger.log(`Creando nuevo equipo: ${JSON.stringify(input)}`);
    return this.equipoService.newTeam(input);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un equipo existente' }) // Descripción de la operación
  @ApiBody({
    type: EquipoDTO,
    description: 'Datos para actualizar el equipoº',
    required: true,
  }) // Cuerpo de la solicitud con los datos de actualización
  @ApiResponse({
    status: 200,
    description: 'Equipo actualizado exitosamente',
    type: EquipoDTO,
  }) // Respuesta cuando la actualización es exitosa
  @ApiResponse({ status: 404, description: 'Equipo no encontrado' }) // Respuesta cuando no se encuentra el id
  async update(
    @Param('id') id: number,
    @Body() dto: Partial<EquipoDTO>,
  ): Promise<EquipoDTO | undefined> {
    this.logger.log(`Updating  temp: ${dto}`);
    return this.equipoService.updateTeam(dto);
  }
}
