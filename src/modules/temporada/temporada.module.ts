import { Module } from '@nestjs/common';
import { TemporadaService } from './temporada.service';
import { TemporadaController } from './temporada.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TemporadaEntity } from '../../shared/entities/temporada.entity';
import { TemporadaMapper } from '../../shared/mappers/temporada.mapper';
import { TemporadaRepository } from '../../shared/repository/temporada.repository';
import { LoggerService } from 'src/shared/services/logger.service';

@Module({
  imports: [TypeOrmModule.forFeature([TemporadaEntity])], // Esto registra la entidad TemporadaEntity en el contexto del módulo
  controllers: [TemporadaController], // El controlador de la entidad
  providers: [
    TemporadaService, // Servicio
    TemporadaMapper, // Mapper
    TemporadaRepository, // Repositorio (lo agregas aquí para que sea inyectado)
    LoggerService,
  ],
  exports: [TemporadaService, TemporadaRepository, LoggerService], // Si necesitas que TemporadaService esté disponible fuera de este módulo
})
export class TemporadaModule {}
