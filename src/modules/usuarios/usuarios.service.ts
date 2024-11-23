import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoggerService } from 'src/shared/services/logger.service';
import { UsuarioRepository } from 'src/shared/repository/usuarios.repository';
import { UsuarioDTO } from 'src/shared/dtos/usuario.dto';
import * as crypto from 'crypto';
import { UsuarioMapper } from 'src/shared/mappers/usuario.mapper';
import { JwtService } from '@nestjs/jwt/dist/jwt.service';

@Injectable()
export class UsuariosService {
  constructor(
    private usuarioRepository: UsuarioRepository,
    private readonly logger: LoggerService,
    private readonly jwtService: JwtService,
  ) {
    logger.setContext('UsuariosService');
  }

  // Serializar el password usando un hash único
  private hashPassword(password: string): string {
    const salt = crypto.randomBytes(16).toString('hex'); // Generar un salt único
    const hash = crypto
      .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
      .toString('hex'); // Crear el hash
    return `${salt}:${hash}`; // Almacenar salt y hash juntos
  }

  private generateToken(telefono: string): string {
    /*const randomSalt = crypto.randomBytes(16).toString('hex'); // Valor aleatorio
    const baseString = `${telefono}:${randomSalt}`; // Combinar teléfono con salt
    const hash = crypto.createHash('sha256').update(baseString).digest('hex'); // Crear un hash SHA-256
    return hash; // Retorna un hash de 64 caracteres*/
    const payload = { sub: telefono }; // Subjet puede ser el ID del usuario o algún identificador único
    return this.jwtService.sign(payload); // Usa el JwtService de NestJS para generar el token
  
  }

  // Validar el password comparándolo con el almacenado
  private validatePassword(password: string, storedPassword: string): boolean {
    const [salt, storedHash] = storedPassword.split(':');
    const hash = crypto
      .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
      .toString('hex');
    return hash === storedHash;
  }

  // Registrar un nuevo usuario
  async registerUser(input: UsuarioDTO): Promise<UsuarioDTO> {
    // Comprobar si ya existe un usuario con el mismo teléfono
    const existingUser = await this.usuarioRepository.findByPhone(
      input.telefono,
    );
    if (existingUser) {
      throw new ConflictException('El teléfono ya está registrado');
    }

    // Crear el usuario con el password serializado
    const usuario = UsuarioMapper.toEntity(input);
    usuario.password = this.hashPassword(input.password);
    usuario.token = this.generateToken(input.telefono);
    // Guardar el usuario en la base de datos
    return this.usuarioRepository.create(usuario);
  }

  // Registrar un nuevo usuario
  async checkUserToken(token: string): Promise<UsuarioDTO> {
    // Comprobar si ya existe un usuario con el mismo teléfono
    const existingUser = await this.usuarioRepository.findByToken(token);
    if (!existingUser) {
      throw new ConflictException('No existe usaurio activo con el token');
    }
    return this.usuarioRepository.findByToken(token);
  }

  //Realizar logout del usuario
  async doLogout(username: string): Promise<void> {
    const user = await this.usuarioRepository.findByUsername(username);
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${username} no encontrado`);
    }
    // Eliminar el token del usuario
    await this.usuarioRepository.doLogout(user.id);
  }

  // Método de login
  async doLogin(usuarioDTO: UsuarioDTO): Promise<UsuarioDTO> {
    const { username, password } = usuarioDTO;

    // Buscar usuario por username (puedes usar email si prefieres)
    const user = await this.usuarioRepository.findByUsername(username);

    // Si el usuario no existe, lanzar excepción
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    // Verificar si la contraseña coincide
    const isPasswordValid = this.validatePassword(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Contraseña incorrecta');
    }

    // Generar un nuevo token
    const token = this.generateToken(user.telefono);

    // Actualizar el token en la base de datos
    await this.usuarioRepository.update(user.id, { token });

    return await this.usuarioRepository.findById(user.id);

  }
}
