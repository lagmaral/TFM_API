import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Body,
  ConflictException,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { LoggerService } from 'src/shared/services/logger.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsuariosService } from './usuarios.service';
import { UsuarioDTO } from 'src/shared/dtos/usuario.dto';
import { AuthDTO } from 'src/shared/dtos/auth.dto';

@ApiTags('usuarios') // Etiqueta para el grupo
@Controller('usuarios')
export class UsuariosController {
  constructor(
    private usuarioService: UsuariosService,
    private readonly logger: LoggerService,
  ) {
    this.logger.setContext('UsuariosController');
  }

  @Get(':token')
  @ApiOperation({ summary: 'Obtener el usuario con token' })
  @ApiResponse({
    status: 200,
    description: 'Devuelve el usuario con token',
    type: UsuarioDTO, // UsuarioDTO es correcto para éxito
  })
  @ApiResponse({
    status: 409,
    description: 'Usuario no logado con el token',
    schema: {
      example: {
        statusCode: 409,
        message: 'Usuario no logado con el token',
      },
    },
  })
  async checkActive(@Param('token') token: string): Promise<UsuarioDTO | any> {
    try {
      const loggedUser = await this.usuarioService.checkUserToken(token);

      // Si el usuario está logado, devolvemos el UsuarioDTO
      return loggedUser;
    } catch (error) {
      if (error instanceof ConflictException) {
        return {
          statusCode: 409,
          message: error.message,
        };
      }
      throw error; // Repropaga otros errores
    }
  }

  @Post()
  @ApiOperation({ summary: 'Registra un nuevo usuario' })
  @ApiBody({
    type: UsuarioDTO,
    description: 'Registra un nuevo usuario si el teléfono no existe',
    required: true,
  })
  @ApiResponse({
    status: 201,
    description: 'Usuario registrado existosamente',
    type: UsuarioDTO,
  })
  @ApiResponse({
    status: 409,
    description: 'Usuario existente',
    type: UsuarioDTO,
  })
  async registerUser(@Body() usuarioData: UsuarioDTO) {
    try {
      const newUser = await this.usuarioService.registerUser(usuarioData);
      return {
        statusCode: 201,
        message: 'Usuario registrado exitosamente',
        data: newUser,
      };
    } catch (error) {
      if (error instanceof ConflictException) {
        return {
          statusCode: 409,
          message: error.message,
        };
      }
      throw error;
    }
  }

  @Post('doLogin')
  @ApiOperation({ summary: 'Iniciar sesión de usuario' })
  @ApiResponse({
    status: 200,
    description: 'Inicio de sesión exitoso',
    type: UsuarioDTO,
  })
  @ApiResponse({
    status: 401,
    description: 'Credenciales incorrectas',
  })
  async doLogin(@Body() authDto: AuthDTO):Promise<UsuarioDTO | any> {
    try{
      return await this.usuarioService.doLogin(authDto);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new HttpException('Usuario no encontrado', HttpStatus.UNAUTHORIZED);
      }
      throw error; // Repropaga otros errores
    }

  }

  @Post('doLogout/:username')
  @ApiOperation({ summary: 'Cerrar sesión del usuario' })
  @ApiResponse({
    status: 200,
    description: 'Sesión cerrada correctamente',
    type: UsuarioDTO, // Establecemos el tipo correcto como UsuarioDTO vacío
  })
  @ApiResponse({
    status: 404,
    description: 'Usuario no encontrado',
  })
  async doLogout(
    @Param('username') username: string,
  ): Promise<{ statusCode: number; message: string; user?: UsuarioDTO }> {
    try {
      // Llama al servicio de logout para eliminar el token
      await this.usuarioService.doLogout(username);

      // Si el logout es exitoso, retorna un UsuarioDTO vacío
      return {
        statusCode: 200,
        message: 'Sesión cerrada correctamente',
        user: null,  // En lugar de UsuarioDTO vacío, simplemente devolvemos null
      };
    } catch (error) {
      // Si el error es de usuario no encontrado, responde con 404
      if (error instanceof NotFoundException) {
        return {
          statusCode: 404,
          message: error.message,
        };
      }
      // Lanza cualquier otro error no esperado
      throw error;
    }
  }

  @Put(':token')
  @ApiOperation({ summary: 'Modificar los datos de un usuario' })
  @ApiBody({
    type: UsuarioDTO,
    description: 'Cambia los datos de un usuario',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'Usuario modificado exitosamente',
    type: UsuarioDTO,
  })
  @ApiResponse({
    status: 409,
    description: 'Usuario existente',
    type: UsuarioDTO,
  })
  async modifyUser(@Param('token') token: string, @Body() usuarioData: UsuarioDTO) {
    try {
      const updatedUser = await this.usuarioService.updateUser(token, usuarioData);
      return {
        statusCode: 200,
        message: 'Usuario modificado exitosamente',
        data: updatedUser,
      };
    } catch (error) {
      if (error instanceof ConflictException) {
        return {
          statusCode: 409,
          message: error.message,
        };
      }
      throw error;
    }
  }
}
