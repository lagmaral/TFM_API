import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { LoggerService } from '../services/logger.service';
import { JugadorEntity } from '../entities/jugador.entity';
import { JugadorDTO } from '../dtos/jugador.dto';
import { JugadorMapper } from '../mappers/jugador.mapper';

@Injectable()
export class JugadorRepository extends BaseRepository<
  JugadorEntity,
  JugadorDTO,
  Partial<JugadorDTO>
> {

  constructor(
    @InjectRepository(JugadorEntity)
    repository: Repository<JugadorEntity>,
    private readonly logger: LoggerService,
  ) {
    super(repository, JugadorMapper.toDTO, JugadorMapper.toEntity);
    logger.setContext('JugadorRepository');
  }

  async findById(id: number): Promise<JugadorDTO | null> {
    return await super.findByIdWithRelations(id, ['posicion']);
  }
  
  async findAndCount(arg0: { where: any; skip: number; take: number; }): Promise<[any[], number]> {
    this.logger.log('SKIP: '+arg0.skip);
    this.logger.log('TAKE: '+arg0.take);
    this.logger.log('WHERE: '+JSON.stringify(arg0.where));
    let whereConditions = {};

      // Verifica si arg0.where es un string y trata de parsearlo
      if (typeof arg0.where === 'string') {
        try {
          whereConditions = JSON.parse(arg0.where);
        } catch (error) {
          whereConditions = {}; // Inicializa como objeto vacío en caso de error
        }
      } else if (typeof arg0.where === 'object' && arg0.where !== null) {
        // Si ya es un objeto, simplemente lo asignamos
        whereConditions = arg0.where;
      }
    
      const queryBuilder = this.repository.createQueryBuilder('jugador')
      .innerJoin('jugador.posicion', 'posicion') // Realiza un JOIN con TemporadaEntity
        //.where('temporada.activa = :activa', { activa: true }) // Filtra por temporada activa
        .orderBy('jugador.apellido1', 'ASC')
        .addOrderBy('jugador.apellido2', 'ASC')
        .addOrderBy('jugador.nombre', 'ASC')
        .skip(arg0.skip)
        .take(arg0.take);
    
      // Verifica si whereConditions tiene propiedades
      if (Object.keys(whereConditions).length > 0) {
        this.logger.log('APLICANDO WHERE ' + Object.keys(whereConditions).length);
    
        // Construir condiciones LIKE
        Object.keys(whereConditions).forEach((key) => {
          const value = whereConditions[key];
          if (value) { // Asegúrate de que el valor no sea nulo o vacío
            queryBuilder.andWhere(`jugador.${key} LIKE :${key}`, { [key]: `%${value}%` });
          }
        });
      } else {
        this.logger.log('No se aplicó la cláusula WHERE porque no hay condiciones válidas.');
      }
    
      const [items, count] = await queryBuilder.getManyAndCount();
    
      return [items, count];
  

  }

  async create(jugador: JugadorEntity): Promise<JugadorDTO> {
    const entity = await this.repository.save(jugador);
    return entity ? JugadorMapper.toDTO(entity) : null; // Transformar a DTO
  }
}
