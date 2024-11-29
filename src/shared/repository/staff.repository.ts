import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { TemporadaDTO } from '../dtos/temporada.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { LoggerService } from '../services/logger.service';

import { StaffEntity } from '../entities/staff.entity';
import { StaffDTO } from '../dtos/staff.dto';
import { StaffMapper } from '../mappers/staff.mapper';


@Injectable()
export class StaffRepository extends BaseRepository<
  StaffEntity,
  StaffDTO,
  Partial<StaffDTO>
> {
  constructor(
    @InjectRepository(StaffEntity)
    repository: Repository<StaffEntity>,
    private readonly logger: LoggerService,
  ) {
    super(repository, StaffMapper.toDTO, StaffMapper.toEntity);
    logger.setContext('StaffRepository');
  }

  // Crear un nuevo usuario
  async create(staff: StaffEntity): Promise<StaffDTO> {
    const entity = await this.repository.save(staff);
    return entity ? StaffMapper.toDTO(entity) : null; // Transformar a DTO
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
          this.logger.log('WHERE conditions parsed successfully:'+ whereConditions);
        } catch (error) {
          this.logger.error('Error parsing WHERE conditions:', error);
          whereConditions = {}; // Inicializa como objeto vacío en caso de error
        }
      } else if (typeof arg0.where === 'object' && arg0.where !== null) {
        // Si ya es un objeto, simplemente lo asignamos
        whereConditions = arg0.where;
      }
    
      const queryBuilder = this.repository.createQueryBuilder('staff')
        .orderBy('staff.apellido1', 'ASC')
        .addOrderBy('staff.apellido2', 'ASC')
        .addOrderBy('staff.nombre', 'ASC')
        .skip(arg0.skip)
        .take(arg0.take);
    
      // Verifica si whereConditions tiene propiedades
      if (Object.keys(whereConditions).length > 0) {
        this.logger.log('APLICANDO WHERE ' + Object.keys(whereConditions).length);
    
        // Construir condiciones LIKE
        Object.keys(whereConditions).forEach((key) => {
          const value = whereConditions[key];
          if (value) { // Asegúrate de que el valor no sea nulo o vacío
            queryBuilder.andWhere(`staff.${key} LIKE :${key}`, { [key]: `%${value}%` });
          }
        });
      } else {
        this.logger.log('No se aplicó la cláusula WHERE porque no hay condiciones válidas.');
      }
    
      const [items, count] = await queryBuilder.getManyAndCount();
    
      return [items, count];
  

  }

  async deleteById(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected > 0;
  }
  

}
