import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { LoggerService } from '../services/logger.service';

@Injectable()
export abstract class BaseRepository<Entity, OutputDTO, InputDTO> {
  constructor(
    readonly repository: Repository<Entity>,
    private readonly toDTOMapper: (entity: Entity) => OutputDTO, // Función para mapear Entity -> DTO
    private readonly toEntityMapper: (dto: InputDTO) => Entity, // Función para mapear DTO -> Entity
  ) {}

  async findAll(): Promise<OutputDTO[]> {
    const entities = await this.repository.find();
    return entities.map(this.toDTOMapper); // Transformar a DTO
  }

  // Método findAll que acepta relaciones
  async findAllWithRelations(relations: string[] = []): Promise<OutputDTO[]> {
    const entities = await this.repository.find({ relations });
    return entities.map(this.toDTOMapper); // Transformar a DTO
  }

  async findById(id: number): Promise<OutputDTO | null> {
    const entity = await this.repository.findOne({ where: { id } as any });
    return entity ? this.toDTOMapper(entity) : null; // Transformar a DTO
  }

  // Método findById que acepta relaciones
  async findByIdWithRelations(
    id: number,
    relations: string[] = [],
  ): Promise<OutputDTO | null> {
    const entity = await this.repository.findOne({
      where: { id } as any,
      relations,
    });
    return entity ? this.toDTOMapper(entity) : null; // Transformar a DTO
  }



  async save(data: InputDTO): Promise<OutputDTO> {
    let entity = this.toEntityMapper(data); // Transformar DTO -> Entity
    entity = this.repository.create(entity);
    const savedEntity = await this.repository.save(entity);
    return this.toDTOMapper(savedEntity); // Transformar a DTO
  }

  async update(id: number, data: InputDTO): Promise<OutputDTO | null> {
    const existingEntity = await this.repository.findOne({
      where: { id } as any,
    });
    if (!existingEntity) return null;

    const updatedEntity = this.repository.merge(
      existingEntity,
      this.toEntityMapper(data),
    ); // Actualizar Entity
    const savedEntity = await this.repository.save(updatedEntity);
    return this.toDTOMapper(savedEntity); // Transformar a DTO
  }

  async deleteById(id: number): Promise<boolean> {

    const result = await this.repository.delete(id);
    return result.affected > 0;
  }
}
