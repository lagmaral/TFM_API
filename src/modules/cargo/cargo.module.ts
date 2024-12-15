import { Module } from '@nestjs/common';
import { CargoService } from './cargo.service';
import { CargoEntity } from 'src/shared/entities/cargo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CargoMapper } from 'src/shared/mappers/cargo.mapper';
import { LoggerService } from 'src/shared/services/logger.service';
import { CargoRepository } from 'src/shared/repository/cargo.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CargoEntity])], // Esto registra la entidad TemporadaEntity en el contexto del módulo
  //controllers: [EquipoController], // El controlador de la entidad
  providers: [
    CargoService, // Servicio
    CargoMapper, // Mapper
    CargoRepository, // Repositorio (lo agregas aquí para que sea inyectado)
    LoggerService,
  ],
  exports: [CargoService, CargoRepository, LoggerService], // Si necesitas que TemporadaService esté disponible fuera de este módulo
})
export class CargoModule {}



