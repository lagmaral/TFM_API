import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerService } from 'src/shared/services/logger.service';
import { PlantillaEntity } from 'src/shared/entities/plantilla.entity';
import { PlantillaMapper } from 'src/shared/mappers/plantilla.mapper';
import { PlantillaRepository } from 'src/shared/repository/plantilla.repository';
import { PlantillaService } from './plantilla.service';
@Module({
    imports: [TypeOrmModule.forFeature([PlantillaEntity])],
    providers: [PlantillaService,PlantillaRepository, PlantillaMapper,LoggerService],   
    exports: [PlantillaService,PlantillaRepository], // Exportar el servicio para que otros módulos puedan usarlo
  })
export class PlantillaModule {}



