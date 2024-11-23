import { Controller, Get, Post, Put, Param, Body } from '@nestjs/common';
import { TemporadaDTO } from '../../shared/dtos/temporada.dto';
import { TemporadaService } from './temporada.service';
import { LoggerService } from 'src/shared/services/logger.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('temporada') // Etiqueta para el grupo
@Controller('temporada')
export class TemporadaController {
  constructor(
    private temporadaService: TemporadaService,
    private readonly logger: LoggerService,
  ) {
    this.logger.setContext('TemporadaController');
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las temporadas' })
  @ApiResponse({
    status: 200,
    description: 'Devuelve todas las temporadas.',
    type: [TemporadaDTO],
  })
  async findAll(): Promise<TemporadaDTO[]> {
    this.logger.log('Fetching all temps');
    return await this.temporadaService.findAll();
  }

  @Get('activa')
  @ApiOperation({ summary: 'Obtener la temporada activa' })
  @ApiResponse({
    status: 200,
    description: 'Devuelve la temporada activa',
    type: TemporadaDTO,
  })
  @ApiResponse({
    status: 404,
    description: 'No se encuentra la temporada',
  })
  async findActive(): Promise<TemporadaDTO> {
    this.logger.log('Fetching active temp');
    return this.temporadaService.findActiva();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una temporada por ID' })
  @ApiResponse({
    status: 200,
    description: 'Devuelve una temporada por su ID',
    type: TemporadaDTO,
  })
  @ApiResponse({
    status: 404,
    description: 'No se encuentra la temporada',
  })
  async findOne(@Param('id') id: number): Promise<TemporadaDTO> {
    this.logger.log('Fetching temps by id');
    return this.temporadaService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear una nueva temporada' })
  @ApiBody({
    type: TemporadaDTO,
    description: 'Descripción de la temporada',
    required: true,
  })
  @ApiResponse({
    status: 201,
    description: 'Temporada creada exitosamente',
    type: TemporadaDTO,
  })
  async create(@Body() input: TemporadaDTO): Promise<TemporadaDTO> {
    this.logger.log(`Creando nueva temporada: ${input.descripcion}`);
    return this.temporadaService.newTemporada(input.descripcion);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar una temporada existente' }) // Descripción de la operación
  @ApiBody({
    type: TemporadaDTO,
    description: 'Datos para actualizar la temporada',
    required: true,
  }) // Cuerpo de la solicitud con los datos de actualización
  @ApiResponse({
    status: 200,
    description: 'Temporada actualizada exitosamente',
    type: TemporadaDTO,
  }) // Respuesta cuando la actualización es exitosa
  @ApiResponse({ status: 404, description: 'Temporada no encontrada' }) // Respuesta cuando no se encuentra la temporada
  async update(
    @Param('id') id: number,
    @Body() dto: Partial<TemporadaDTO>,
  ): Promise<TemporadaDTO | undefined> {
    this.logger.log(`Updating  temp: ${dto}`);
    return this.temporadaService.updateTemporada(dto);
  }
}
