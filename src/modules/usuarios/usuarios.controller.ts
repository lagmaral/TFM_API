import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Body,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { LoggerService } from 'src/shared/services/logger.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsuariosService } from './usuarios.service';
import { UsuarioDTO } from 'src/shared/dtos/usuario.dto';

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
      // Ajuste para conflicto, ya que no devuelve un UsuarioDTO
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
    description: 'Registra un nuevo usuario si el telefono no existe',
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
  async doLogin(@Body() usuarioDTO: UsuarioDTO): Promise<UsuarioDTO> {
    return await this.usuarioService.doLogin(usuarioDTO);
  }

  @Post('doLogout/:username')
  @ApiOperation({ summary: 'Cerrar sesión del usuario' })
  @ApiResponse({
    status: 200,
    description: 'Sesión cerrada correctamente',
    type: Object,
  })
  @ApiResponse({
    status: 404,
    description: 'Usuario no encontrado',
  })
  async doLogout(
    @Param('username') username: string,
  ): Promise<{ statusCode: number; message: string }> {
    try {
      // Llama al servicio de logout para eliminar el token
      await this.usuarioService.doLogout(username);

      // Si el logout es exitoso, retorna el mensaje con statusCode
      return { statusCode: 200, message: 'Sesión cerrada correctamente' };
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
}