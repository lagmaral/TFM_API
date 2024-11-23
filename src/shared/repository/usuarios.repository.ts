import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { LoggerService } from '../services/logger.service';
import { UsuarioEntity } from '../entities/usuario.entity';
import { UsuarioDTO } from '../dtos/usuario.dto';
import { UsuarioMapper } from '../mappers/usuario.mapper';

@Injectable()
export class UsuarioRepository extends BaseRepository<
  UsuarioEntity,
  UsuarioDTO,
  Partial<UsuarioDTO>
> {

  constructor(
    @InjectRepository(UsuarioEntity)
    repository: Repository<UsuarioEntity>,
    private readonly logger: LoggerService,
  ) {
    super(repository, UsuarioMapper.toDTO, UsuarioMapper.toEntity);
    logger.setContext('UsuarioRepository');
  }

  // Verificar si ya existe un usuario con el mismo teléfono
  async findByPhone(telefono: string): Promise<UsuarioEntity | null> {
    return await this.repository.findOne({ where: { telefono } });
  }

  // Verificar si ya existe un usuario con el token
  async findByToken(token: string): Promise<UsuarioDTO | null> {
    const entity = await this.repository.findOne({ where: { token } });
    return entity ? UsuarioMapper.toDTO(entity) : null; // Transformar a DTO
  }

  // Crear un nuevo usuario
  async create(usuario: UsuarioEntity): Promise<UsuarioDTO> {
    const entity = await this.repository.save(usuario);
    return entity ? UsuarioMapper.toDTO(entity) : null; // Transformar a DTO
  }

  async findByUsername(username: string): Promise<UsuarioDTO | null> {
    const entity = await this.repository.findOne({
      where: { username } as any,
    });
    return entity ? UsuarioMapper.toDTO(entity) : null; // Transformar a DTO
  }

  async doLogout(id: number): Promise<void> {
    const result = await this.repository
      .createQueryBuilder()
      .update()
      .set({ token: () => 'NULL' }) 
      .where('id = :id', { id })
      .execute();

    if (result.affected === 0) {
      throw new NotFoundException(`Registro con ID ${id} no encontrado`);
    }
  }
}
