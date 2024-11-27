import { Controller, Get, Post, Put, Param, Body, Query } from '@nestjs/common';
import { LoggerService } from 'src/shared/services/logger.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { StaffService } from './staff.service';
import { StaffDTO } from 'src/shared/dtos/staff.dto';
import { PaginationDto } from 'src/shared/dtos/pagination.dto';

@ApiTags('staff') // Etiqueta para el grupo
@Controller('staff')
export class StaffController {
  constructor(
    private staffService: StaffService,
    private readonly logger: LoggerService,
  ) {
    this.logger.setContext('StaffController');
  }

  // Método para obtener todos los registros que coinciden con los filtros
  @Get('paginated')
  async getPaginatedStaff(
    @Query() paginationDto: PaginationDto,
    @Query('filters') filters: any 
  ) {
    return this.staffService.findPaginated(filters, paginationDto);
  }

  @Post()
  @ApiOperation({ summary: 'Crear una nuevo miembro del staff' })
  @ApiBody({
    type: StaffDTO,
    description: 'Contenido del miembro del staff',
    required: true,
  })
  @ApiResponse({
    status: 201,
    description: 'Miembro del staff creadao exitosamente',
    type: StaffDTO,
  })
  // Método para dar de alta un nuevo Staff
  async create(@Body() input: StaffDTO): Promise<StaffDTO> {
    return this.staffService.newStaff(input);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener el miembro del staff por ID' })
  @ApiResponse({
    status: 200,
    description: 'Devuelve el miembro por su ID',
    type: StaffDTO,
  })
  @ApiResponse({
    status: 404,
    description: 'No se encuentra el miembro del staff',
  })
  async findOne(@Param('id') id: number): Promise<StaffDTO> {
    this.logger.log('Fetching staff by id');
    return this.staffService.findById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un miembro del staff existente' }) // Descripción de la operación
  @ApiBody({
    type: StaffDTO,
    description: 'Datos para actualizar elmiembro del staff',
    required: true,
  }) // Cuerpo de la solicitud con los datos de actualización
  @ApiResponse({
    status: 200,
    description: 'Miembro del staff actualizado exitosamente',
    type: StaffDTO,
  }) // Respuesta cuando la actualización es exitosa
  @ApiResponse({ status: 404, description: 'Miembro no encontrado' }) // Respuesta cuando no se encuentra la temporada
  async update(
    @Param('id') id: number,
    @Body() dto: StaffDTO,
  ): Promise<StaffDTO | undefined> {
    this.logger.log(`Updating  temp: ${dto}`);
    return this.staffService.updateStaff(id, dto);
  }
}

