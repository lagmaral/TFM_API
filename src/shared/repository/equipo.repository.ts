import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { TemporadaDTO } from '../dtos/temporada.dto';
import { LessThan, MoreThan, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { LoggerService } from '../services/logger.service';
import { EquipoDTO } from '../dtos/equipo.dto';
import { EquipoEntity } from '../entities/equipo.entity';
import { EquipoMapper } from '../mappers/equipo.mapper';
import { UtilsService } from '../services/util.service';
import { TemporadaEntity } from '../entities/temporada.entity';

@Injectable()
export class EquipoRepository extends BaseRepository<
  EquipoEntity,
  EquipoDTO,
  Partial<TemporadaDTO>
> {
  constructor(
    @InjectRepository(EquipoEntity)
    repository: Repository<EquipoEntity>,
    private readonly logger: LoggerService,
  ) {
    super(repository, EquipoMapper.toDTO, EquipoMapper.toEntity);
    logger.setContext('EquipoRepository');
  }

  // Sobrescribir el método findAll
  async findAll(): Promise<EquipoDTO[]> {
    return await super.findAllWithRelations(['temporada']); // Llamada al método findAll de la clase base
  }

  async findAllActiveTeams(): Promise<EquipoDTO[]> {
    const entities = await this.repository.find({
      where: {
        activo: true
      },
      order: {
        orden: 'ASC'
      }
    });
    return entities.map(EquipoMapper.toDTO); // Transformar a DTO
  }

  async findById(id: number): Promise<EquipoDTO | null> {
    return await super.findByIdWithRelations(id, ['temporada']);
  }

  // Método para obtener todos los equipos de una temporada ordenados por el campo 'orden'
  async findByTempId(idTemporada: number): Promise<EquipoDTO[]> {
    // Realizamos la consulta filtrando por el campo 'idtemporada' y ordenando por 'orden' de manera creciente
    const entities = await this.repository.find({
      where: { temporada: { id: idTemporada } }, // Filtramos por el id de la temporada
      order: { orden: 'ASC' }, // Ordenamos de forma creciente por el campo 'orden'
      relations: ['temporada'], // Incluimos la relación con la temporada
    });
    return entities.map(EquipoMapper.toDTO); // Transformar a DTO
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
    
      const queryBuilder = this.repository.createQueryBuilder('equipo')
      .innerJoin('equipo.temporada', 'temporada') // Realiza un JOIN con TemporadaEntity
        .where('temporada.activa = :activa', { activa: true }) // Filtra por temporada activa
        .orderBy('equipo.orden', 'ASC')
        .skip(arg0.skip)
        .take(arg0.take);
    
      // Verifica si whereConditions tiene propiedades
      if (Object.keys(whereConditions).length > 0) {
        this.logger.log('APLICANDO WHERE ' + Object.keys(whereConditions).length);
    
        // Construir condiciones LIKE
        Object.keys(whereConditions).forEach((key) => {
          const value = whereConditions[key];
          if (value) { // Asegúrate de que el valor no sea nulo o vacío
            queryBuilder.andWhere(`equipo.${key} LIKE :${key}`, { [key]: `%${value}%` });
          }
        });
      } else {
        this.logger.log('No se aplicó la cláusula WHERE porque no hay condiciones válidas.');
      }
    
      const [items, count] = await queryBuilder.getManyAndCount();
    
      return [items, count];
  

  }

  async deleteById(id: number): Promise<boolean> {
    return await super.deleteById(id);
    
  }


  async getNextOrdenValueUsingQueryBuilder(): Promise<number> {
    const result = await this.repository.createQueryBuilder('equipo')
      .innerJoin('equipo.temporada', 'temporada') // Realiza un JOIN con TemporadaEntity
      .where('temporada.activa = :activa', { activa: true }) // Filtra por temporadas activas
      .select('MAX(equipo.orden)', 'maxOrden') // Obtiene el valor máximo de la columna 'orden'
      .getRawOne(); // Obtiene el resultado como un objeto

    // Si no hay ningún valor, devuelve 1; de lo contrario, suma 1 al valor máximo encontrado
    return result.maxOrden ? result.maxOrden + 1 : 1;
  }


  async intercambiarOrden(id: number, direccion: 'asc' | 'desc'): Promise<void> {
    
    // Obtener el elemento actual
    const elementoActual = await this.repository.findOne({ where: { id } });
    if (!elementoActual) {
      throw new Error('Elemento no encontrado');
    }
  
    // Configurar la búsqueda según la dirección
    const where = direccion === 'asc' 
      ? { orden: LessThan(elementoActual.orden) }
      : { orden: MoreThan(elementoActual.orden) };
    
    // Obtener el elemento adyacente
    const elementoAdyacente = await this.repository.findOne({
      where,
      order: { orden: direccion === 'asc' ? 'DESC' : 'ASC' }
    });
  
    if (!elementoAdyacente) {
      throw new Error(`No hay elemento ${direccion === 'asc' ? 'anterior' : 'siguiente'}`);
    }
  
    // Intercambiar los valores de orden
    const ordenTemporal = elementoActual.orden;
    elementoActual.orden = elementoAdyacente.orden;
    elementoAdyacente.orden = ordenTemporal;
  
    // Guardar los cambios
    await this.repository.save([elementoActual, elementoAdyacente]);
  }
  
}
