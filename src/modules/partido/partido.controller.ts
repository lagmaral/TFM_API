import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PartidoService } from './partido.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PartidoDTO } from 'src/shared/dtos/partido.dto';

@Controller('partido')
export class PartidoController {

    constructor(private readonly partidoService: PartidoService) {}
    
    @Get(':id')
  @ApiOperation({ summary: 'Obtener un partido por ID' })
  @ApiResponse({
    status: 200,
    description: 'Devuelve un partido por su ID',
    type: PartidoDTO,
  })
  @ApiResponse({
    status: 404,
    description: 'No se encuentra el partido',
  })
  async findOne(@Param('id') id: number): Promise<PartidoDTO> {
    return this.partidoService.findById(id);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los partidos de los 7 últimos días' })
  @ApiResponse({
    status: 200,
    description: 'Obtener todos los partidos de los 7 últimos días',
    type: [PartidoDTO],
  })
  async findLastSevenDays(): Promise<PartidoDTO[]> {
    return this.partidoService.findLastSevenDays();
  }

  @Get('/team/:id')
  @ApiOperation({ summary: 'Obtener todos los partidos de un equipo por ID' })
  @ApiResponse({
    status: 200,
    description: 'Devuelve todos los partidos de un equipo',
    type: [PartidoDTO],
  })
  @ApiResponse({
    status: 404,
    description: 'No se encuentra el equipo',
  })
  async findAllByTeamId(@Param('id') id: number): Promise<PartidoDTO[]> {
    return this.partidoService.findAllByTeamId(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo partido' })
  @ApiResponse({ status: 201, description: 'Partido creado exitosamente', type: PartidoDTO })
  async createPartido(@Body() createPartidoDTO: PartidoDTO): Promise<PartidoDTO> {
    return this.partidoService.createPartido(createPartidoDTO);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un partido existente' })
  @ApiResponse({ status: 200, description: 'Partido actualizado exitosamente', type: PartidoDTO })
  @ApiResponse({ status: 404, description: 'No se encuentra el partido' })
  async updatePartido(@Param('id') id: number, @Body() updatePartidoDTO: PartidoDTO): Promise<PartidoDTO> {
    return this.partidoService.updatePartido(id, updatePartidoDTO);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un partido' })
  @ApiResponse({ status: 204, description: 'Partido eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'No se encuentra el partido' })
  async deletePartido(@Param('id') id: number): Promise<void> {
    await this.partidoService.deletePartido(id);
  }

  @Put(':id/goals')
  @ApiOperation({ summary: 'Actualizar los goles de un partido' })
  @ApiResponse({ status: 200, description: 'Goles actualizados exitosamente', type: PartidoDTO })
  @ApiResponse({ status: 404, description: 'No se encuentra el partido' })
  async updateGoals(@Param('id') id: number, @Body() updateGoalsDTO: PartidoDTO): Promise<PartidoDTO> {
    return this.partidoService.updateGoals(id, updateGoalsDTO.goleslocal, updateGoalsDTO.golesvisitante);
  }
}
