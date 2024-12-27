import { Body, Controller, Delete, Get, Param, Post, Put, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JugadorService } from './jugador.service';
import { LoggerService } from 'src/shared/services/logger.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { join, extname } from 'path';

import { PaginationDto } from 'src/shared/dtos/pagination.dto';

import { ConfigurableService } from 'src/shared/services/env.service';
import { UtilsService } from 'src/shared/services/util.service';
import { JugadorDTO } from 'src/shared/dtos/jugador.dto';
import { PlantillaDTO } from 'src/shared/dtos/plantilla.dto';
import { ImageService } from 'src/shared/services/image.service';
@ApiTags('jugador') // Etiqueta para el grupo
@Controller('jugador')
export class JugadorController {
    constructor(
        private jugadorService: JugadorService,
        private readonly logger: LoggerService,
        private readonly imageService: ImageService
      ) {
        this.logger.setContext('JugadorController');
      }

  @Get('paginated')
  @ApiOperation({ summary: 'Obtener todos los jugadores' })
  @ApiResponse({
    status: 200,
    description: 'Devuelve todos los jugadores de la temporada activa.',
    type: [JugadorDTO],
  })
  async getPaginatedTeam(
    @Query() paginationDto: PaginationDto,
    @Query('filters') filters: any 
  ) {
    this.logger.log('Fetching players by getPaginated');
    return this.jugadorService.findPaginated(filters, paginationDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un jugador por ID' })
  @ApiResponse({
    status: 200,
    description: 'Devuelve un jugador por su ID',
    type: JugadorDTO,
  })
  @ApiResponse({
    status: 404,
    description: 'No se encuentra el jugador',
  })
  async findOne(@Param('id') id: number): Promise<JugadorDTO> {
    this.logger.log('Fetching teams by id');
    return this.jugadorService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo jugador' })
  @ApiConsumes('multipart/form-data') // Indica que el endpoint consume FormData
  @ApiBody({
    description: 'Contenido del jugador con imagen',
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary', // Swagger interpreta este campo como un archivo
        },
        id: { type: 'number' },
        nombre: { type: 'string' },
        apellido1: { type: 'string' },
        apellido2: { type: 'string' },
        descripcion: { type: 'string' },
        consentimiento: { type: 'boolean' },
        fechanacimiento: { type: 'string', format: 'date' },
        idposicion: { type: 'number' },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Jugador creado exitosamente',
    type: JugadorDTO,
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
        const jugadorData: JugadorDTO = req.body;
        const newFileName = `${UtilsService.calculatePlayerInternalKey(jugadorData)}${extname(file.originalname)}`.toUpperCase();
        cb(null, newFileName);
      },
    }),
  }))
  async newJugador(@Body() object: JugadorDTO,@UploadedFile() file?: Express.Multer.File) { // Hacer el archivo opcional
    // Intentar persistir el objeto en la base de datos
    try {
      // Procesar la imagen con el servicio
      if(file){
        const processedImages = await this.imageService.processAndSaveImage(ConfigurableService.getConfigPlayerPath(),file.filename);
        const savedObject = await this.jugadorService.newPlayer(object); // Método para guardar el objeto

        return {
          msg: file ? `Archivo ${file.filename} cargado` : 'No se ha cargado ningún archivo.',
          sizes: Object.keys(processedImages), // small, medium, large
          images: processedImages, // Buffers de las imágenes procesadas
        };
      }else{
        const savedObject = await this.jugadorService.newPlayer(object); // Método para guardar el objeto
        return {
          msg: file ? `Archivo ${file.filename} cargado` : 'No se ha cargado ningún archivo.',
          sizes: null, // small, medium, large
          images: null, // Buffers de las imágenes procesadas
        };
      }

    } catch (error) {
      // Manejo de error si la persistencia falla
      throw new Error('Error al guardar el objeto: ' + error.message);
    }
  }

  @Post('/plantilla')
  @ApiOperation({ summary: 'Crear un nuevo jugador en equipo' })
    @ApiBody({
      type: PlantillaDTO,
      description: 'Registra un nuevo usuario si el teléfono no existe',
      required: true,
    })
    @ApiResponse({
      status: 201,
      description: 'Usuario registrado existosamente',
      type: JugadorDTO,
    })
  async newJugadorTeam(@Body() object: PlantillaDTO): Promise<JugadorDTO>  { // Hacer el archivo opcional
    // Intentar persistir el objeto en la base de datos
    try {
      await this.jugadorService.newPlayerTeam(object); // Método para guardar el objeto
      return await this.jugadorService.findById(object.idjugador);
    } catch (error) {
      // Manejo de error si la persistencia falla
      throw new Error('Error al guardar el objeto: ' + error.message);
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un jugador existente' }) // Descripción de la operación
  @ApiConsumes('multipart/form-data') // Indica que el endpoint consume FormData
  @ApiBody({
    description: 'Contenido del jugador con imagen',
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary', // Swagger interpreta este campo como un archivo
        },
        id: { type: 'number' },
        nombre: { type: 'string' },
        apellido1: { type: 'string' },
        apellido2: { type: 'string' },
        descripcion: { type: 'string' },
        consentimiento: { type: 'boolean' },
        fechanacimiento: { type: 'string', format: 'date' },
        idposicion: { type: 'number' },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Jugador actualizado exitosamente',
    type:JugadorDTO,
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
        const jugadorData: JugadorDTO = req.body;
        const newFileName = `${UtilsService.calculatePlayerInternalKey(jugadorData)}${extname(file.originalname)}`.toUpperCase();
        cb(null, newFileName);
      },
    }),
  }))
  async updatePlayer(@Param('id') id: number, @Body() object: JugadorDTO, @UploadedFile() file?: Express.Multer.File) {
  
    // Intentar persistir el objeto en la base de datos
    try {
      // Procesar la imagen con el servicio
      if(file){
        const processedImages = await this.imageService.processAndSaveImage(ConfigurableService.getConfigPlayerPath(),file.filename);
        const savedObject = await this.jugadorService.updatePlayer(id,object); // Método para guardar el objeto
    
        return {
          msg: file ? `Archivo ${file.filename} cargado` : 'No se ha cargado ningún archivo.',
          sizes: Object.keys(processedImages), // small, medium, large
          images: processedImages, // Buffers de las imágenes procesadas
        };
      }else{
        const savedObject = await this.jugadorService.updatePlayer(id,object); // Método para guardar el objeto
        return {
          msg: file ? `Archivo ${file.filename} cargado` : 'No se ha cargado ningún archivo.',
          sizes: null, // small, medium, large
          images: null, // Buffers de las imágenes procesadas
        };
      }

    } catch (error) {
      // Manejo de error si la persistencia falla
      throw new Error('Error al guardar el objeto: ' + error.message);
    }

  }                

  @Delete(':id')
  @ApiOperation({ summary: 'Elimina un jugador  existente' })
  @ApiResponse({
    status: 200,
    description: 'Jugador eliminado exitosamente',
    type: JugadorDTO,
  })
  async deletePlayer(@Param('id') id: number) {

    // Intentar persistir el objeto en la base de datos
    try {
      
      await this.jugadorService.deletePlayer(id); // Método para guardar el objeto
    } catch (error) {
      // Manejo de error si la persistencia falla
      throw new Error('Error al guardar el objeto: ' + error.message);
    }
  }

  @Delete('/plantilla/:id')
  @ApiOperation({ summary: 'Elimina un jugador team  existente' })
  @ApiResponse({
    status: 200,
    description: 'Jugador team eliminado exitosamente',
    type: JugadorDTO,
  })
  async deletePlayerTeamById(@Param('id') id: number) {

    // Intentar persistir el objeto en la base de datos
    try {
      await this.jugadorService.deletePlayerTeamById(id); // Método para guardar el objeto
    } catch (error) {
      // Manejo de error si la persistencia falla
      throw new Error('Error al guardar el objeto: ' + error.message);
    }
  }

}
