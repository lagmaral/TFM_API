import { Controller, Get, Post, Put, Param, Body, Query, UseInterceptors, UploadedFile, Delete } from '@nestjs/common';
import { LoggerService } from 'src/shared/services/logger.service';
import { ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { EquipoService } from './equipo.service';
import { EquipoDTO } from 'src/shared/dtos/equipo.dto';
import { PaginationDto } from 'src/shared/dtos/pagination.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { ConfigurableService } from 'src/shared/services/env.service';
import { existsSync, mkdirSync } from 'fs';
import { extname, join } from 'path';
import { diskStorage } from 'multer';
import { UtilsService } from 'src/shared/services/util.service';
import { PosicionDTO } from 'src/shared/dtos/posicion.dto';

@ApiTags('equipo') // Etiqueta para el grupo
@Controller('equipo')
export class EquipoController {
  constructor(
    private equipoService: EquipoService,
    private readonly logger: LoggerService,
  ) {
    this.logger.setContext('EquipoController');
  }

  @Get('paginated')
  @ApiOperation({ summary: 'Obtener todos los equipos' })
  @ApiResponse({
    status: 200,
    description: 'Devuelve todos los equipos activos de la temporada activa.',
    type: [EquipoDTO],
  })
  async getPaginatedTeam(
    @Query() paginationDto: PaginationDto,
    @Query('filters') filters: any 
  ) {
    this.logger.log('Fetching teams by getPaginatedTeeam');
    return this.equipoService.findPaginated(filters, paginationDto);
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


  @Post()
  @ApiOperation({ summary: 'Crear una nuevo equipo' })
  @ApiConsumes('multipart/form-data') // Indica que el endpoint consume FormData
  @ApiBody({
    description: 'Contenido del equipo con imagen',
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary', // Swagger interpreta este campo como un archivo
        },
        id: { type: 'number' },
        nombre: { type: 'string' },
        descripcion: { type: 'string' },
        activo: { type: 'boolean' },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Equipo creado exitosamente',
    type: EquipoDTO,
  })
  @UseInterceptors(FileInterceptor('image', { 
    storage: diskStorage({
      destination: (req, file, cb) => {
        const uploadPath = join(ConfigurableService.getConfigPlayerPath());
        if (!existsSync(uploadPath)) {
          mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
      },
      filename: (req, file, cb) => {
        const equipoData: EquipoDTO = req.body;
        const newFileName = `${UtilsService.calculateTeamKey(equipoData)}${extname(file.originalname)}`;
        cb(null, newFileName);
      },
    }),
  }))
  async newTeam(@Body() object: EquipoDTO,@UploadedFile() file?: Express.Multer.File) { // Hacer el archivo opcional
    // Intentar persistir el objeto en la base de datos
    try {
      const savedObject = await this.equipoService.newTeam(object); // Método para guardar el objeto
      return {
        msg: file ? `Archivo ${file.filename} cargado` : 'No se ha cargado ningún archivo.',
        additionalData: savedObject,
        filePath: file ? file.path : null // Solo incluir la ruta si hay un archivo
      };
    } catch (error) {
      // Manejo de error si la persistencia falla
      throw new Error('Error al guardar el objeto: ' + error.message);
    }
  }

   @Put('/cambiar-orden/:id')
  @ApiOperation({ summary: 'Intercambiar el orden de un equipo por ID' })
  @ApiResponse({
    status: 200,
    description: 'Devuelve el equipo con el orden',
    type: EquipoDTO,
  })
  @ApiResponse({
    status: 404,
    description: 'No se encuentra el equipo',
  })
  async cambiarOrden(
    @Param('id') id: number,
    @Query('direccion') direccion: 'asc' | 'desc'
  ): Promise<{ message: string }> {
  
    await this.equipoService.intercambiarOrden(id, direccion);
    return { message: `Orden intercambiado con éxito (movido ${direccion === 'asc' ? 'arriba' : 'abajo'})` };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un equipo existente' }) // Descripción de la operación
  @ApiConsumes('multipart/form-data') // Indica que el endpoint consume FormData
  @ApiBody({
    description: 'Contenido del equipo con imagen',
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary', // Swagger interpreta este campo como un archivo
        },
        id: { type: 'number' },
        nombre: { type: 'string' },
        descripcion: { type: 'string' },
        activo: { type: 'boolean' },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Equipo actualizado exitosamente',
    type:EquipoDTO,
  })
  @UseInterceptors(FileInterceptor('image', { // Cambié 'file' a 'image'
    storage: diskStorage({
      destination: (req, file, cb) => {
        const uploadPath = join(ConfigurableService.getURLPlayersPath());
        if (!existsSync(uploadPath)) {
          mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
      },
      filename: (req, file, cb) => {
        const equipoData: EquipoDTO = req.body;
        const newFileName = `${UtilsService.calculateTeamKey(equipoData)}${extname(file.originalname)}`;
        cb(null, newFileName);
      },
    }),
  }))
  async updateTeam(@Param('id') id: number, @Body() object: EquipoDTO, @UploadedFile() file?: Express.Multer.File) {
  
    // Intentar persistir el objeto en la base de datos
    try {
      this.logger.log(JSON.stringify(object));
      const savedObject = await this.equipoService.updateTeam(object); // Método para guardar el objeto
  
      return {
        msg: file ? `Archivo ${file.filename} cargado` : 'No se ha cargado ningún archivo.',
        additionalData: savedObject,
        filePath: file ? file.path : null // Solo incluir la ruta si hay un archivo
      };
    } catch (error) {
      // Manejo de error si la persistencia falla
      throw new Error('Error al guardar el objeto: ' + error.message);
    }
  }                

  @Delete(':id')
  @ApiOperation({ summary: 'Elimina un miembro del staff existente' })
  @ApiResponse({
    status: 200,
    description: 'Miembro del staff eliminado exitosamente',
    type: EquipoDTO,
  })
  async deleteStaff(@Param('id') id: number) {
  
    // Intentar persistir el objeto en la base de datos
    try {
      
      await this.equipoService.deleteTeam(id); // Método para guardar el objeto
  
 
    } catch (error) {
      // Manejo de error si la persistencia falla
      throw new Error('Error al guardar el objeto: ' + error.message);
    }
  }

  
  
  // Endpoint para obtener todos los equipos de una temporada ordenados por 'orden'
  @Get('/all/teams')
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
  async findAllByTemporada(): Promise<EquipoDTO[]> {
    return this.equipoService.findAllByTemporadaOrdenada();
  }

  @Get('/all/positions')
  @ApiOperation({ summary: 'Obtener todas las posiciones' })
  @ApiResponse({
    status: 200,
    description: 'Devuelve todas las posiciones',
    type: EquipoDTO,
  })
  @ApiResponse({
    status: 404,
    description: 'No se encuentra el equipo',
  })
  async findAllPositions(): Promise<PosicionDTO[]> {
    return this.equipoService.findAllPositions();
  }


}
