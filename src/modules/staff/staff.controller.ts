
import { Controller, Get, Post, Put, Param, Body, Query, UseInterceptors, UploadedFile, Delete } from '@nestjs/common';
import { LoggerService } from 'src/shared/services/logger.service';
import { ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { StaffService } from './staff.service';
import { StaffDTO } from 'src/shared/dtos/staff.dto';
import { PaginationDto } from 'src/shared/dtos/pagination.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { ConfigurableService } from 'src/shared/services/env.service';
import { existsSync, mkdirSync } from 'fs';
import { extname, join } from 'path';
import { diskStorage } from 'multer';
import { UtilsService } from 'src/shared/services/util.service';
import { CargoDTO } from 'src/shared/dtos/cargo.dto';
import { EquipoStaffDTO } from 'src/shared/dtos/equipo-staff.dto';
import { ImageService } from 'src/shared/services/image.service';


@ApiTags('staff') // Etiqueta para el grupo
@Controller('staff')
export class StaffController {
   
  constructor(
    private staffService: StaffService,
    private readonly logger: LoggerService,
    private readonly imageService: ImageService
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

  @Post('')
  @ApiOperation({ summary: 'Crear un nuevo miembro del staff' })
  @ApiConsumes('multipart/form-data') // Indica que el endpoint consume FormData
  @ApiBody({
    description: 'Contenido del miembro del staff con imagen',
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary', // Swagger interpreta este campo como un archivo
        },
        id: { type: 'number' },
        telefono: { type: 'string' },
        internalkey: { type: 'string' },
        admin: { type: 'boolean' },
        fechanacimiento: { type: 'string', format: 'date' },
        nombre: { type: 'string' },
        apellido1: { type: 'string' },
        apellido2: { type: 'string' },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Miembro del staff creado exitosamente',
    type: StaffDTO,
  })
  @UseInterceptors(FileInterceptor('image', { // Cambié 'file' a 'image'
    storage: diskStorage({
      destination: (req, file, cb) => {
        const uploadPath = join(ConfigurableService.getConfigStaffPath());
        if (!existsSync(uploadPath)) {
          mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
      },
      filename: (req, file, cb) => {
        const staffData: StaffDTO = req.body;
        const newFileName = `${UtilsService.calculateStaffInternalKey(staffData)}${extname(file.originalname)}`.toUpperCase();
        cb(null, newFileName);
      },
    }),
  }))
  async newStaff(@Body() object: StaffDTO,@UploadedFile() file?: Express.Multer.File) { // Hacer el archivo opcional
    this.logger.log("NUEVO STAFF: ")+JSON.stringify(object);  
    // Intentar persistir el objeto en la base de datos
    try {
      // Procesar la imagen con el servicio
      const processedImages = await this.imageService.processAndSaveImage(ConfigurableService.getConfigStaffPath(),file.filename);

      const savedObject = await this.staffService.newStaff(object); // Método para guardar el objeto

      return {
        msg: file ? `Archivo ${file.filename} cargado` : 'No se ha cargado ningún archivo.',
        sizes: Object.keys(processedImages), // small, medium, large
        images: processedImages, // Buffers de las imágenes procesadas
      };
    } catch (error) {
      // Manejo de error si la persistencia falla
      throw new Error('Error al guardar el objeto: ' + error.message);
    }
  }

  @Post('/equipo')
  @ApiOperation({ summary: 'Crear un nueva relacion stff equipo' })
    @ApiBody({
      type: EquipoStaffDTO,
      description: 'Registra un nuevo usuario si el teléfono no existe',
      required: true,
    })
    @ApiResponse({
      status: 201,
      description: 'Usuario registrado existosamente',
      type: StaffDTO,
    })
  async newStaffTeam(@Body() object: EquipoStaffDTO): Promise<StaffDTO>  { // Hacer el archivo opcional
    // Intentar persistir el objeto en la base de datos
    try {
      await this.staffService.newStaffTeam(object); // Método para guardar el objeto
      return await this.staffService.findById(object.idstaff);
    } catch (error) {
      // Manejo de error si la persistencia falla
      throw new Error('Error al guardar el objeto: ' + error.message);
    }
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
@ApiOperation({ summary: 'Actualizar un miembro del staff existente' })
@ApiConsumes('multipart/form-data') // Indica que el endpoint consume FormData
@ApiBody({
  description: 'Contenido del miembro del staff con imagen',
  schema: {
    type: 'object',
    properties: {
      image: {
        type: 'string',
        format: 'binary', // Swagger interpreta este campo como un archivo
      },
      id: { type: 'number' },
      telefono: { type: 'string' },
      internalkey: { type: 'string' },
      admin: { type: 'boolean' },
      fechanacimiento: { type: 'string', format: 'date' },
      nombre: { type: 'string' },
      apellido1: { type: 'string' },
      apellido2: { type: 'string' },
    },
  },
})
@ApiResponse({
  status: 200,
  description: 'Miembro del staff actualizado exitosamente',
  type: StaffDTO,
})
@UseInterceptors(FileInterceptor('image', { // Cambié 'file' a 'image'
  storage: diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = join(ConfigurableService.getConfigStaffPath());
      if (!existsSync(uploadPath)) {
        mkdirSync(uploadPath, { recursive: true });
      }
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      const staffData: StaffDTO = req.body;
      const newFileName = `${UtilsService.calculateStaffInternalKey(staffData)}${extname(file.originalname)}`.toUpperCase();
      cb(null, newFileName);
    },
  }),
}))
async updateStaff(@Param('id') id: number, @Body() object: StaffDTO, @UploadedFile() file?: Express.Multer.File) {

  // Intentar persistir el objeto en la base de datos
  try {
    const processedImages = await this.imageService.processAndSaveImage(ConfigurableService.getConfigStaffPath(),file.filename);
    const savedObject = await this.staffService.updateStaff(id, object); // Método para guardar el objeto

    return {
      msg: file ? `Archivo ${file.filename} cargado` : 'No se ha cargado ningún archivo.',
      sizes: Object.keys(processedImages), // small, medium, large
      images: processedImages, // Buffers de las imágenes procesadas
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
    type: StaffDTO,
  })
  async deleteStaff(@Param('id') id: number) {
  
    // Intentar persistir el objeto en la base de datos
    try {
      
      await this.staffService.deleteStaff(id); // Método para guardar el objeto
  
 
    } catch (error) {
      // Manejo de error si la persistencia falla
      throw new Error('Error al guardar el objeto: ' + error.message);
    }
  }
  
  @Delete('/equipo/:id')
  @ApiOperation({ summary: 'Elimina un staff team  existente' })
  @ApiResponse({
    status: 200,
    description: 'Jugador team eliminado exitosamente',
    type: StaffDTO,
  })
  async deleteStaffTeamById(@Param('id') id: number) {

    // Intentar persistir el objeto en la base de datos
    try {
      await this.staffService.deleteStaffTeamById(id); // Método para guardar el objeto
    } catch (error) {
      // Manejo de error si la persistencia falla
      throw new Error('Error al guardar el objeto: ' + error.message);
    }
  }  

 @Get('/all/cargos')
  @ApiOperation({ summary: 'Obtener todos los cargos' })
  @ApiResponse({
    status: 200,
    description: 'Devuelve todos los cargos',
    type: CargoDTO,
  })
  @ApiResponse({
    status: 404,
    description: 'No se encuentra el equipo',
  })
  async findAllCargos(): Promise<CargoDTO[]> {
    return this.staffService.findAllCargos();
  } 
}



