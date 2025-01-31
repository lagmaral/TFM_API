import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerService } from 'src/shared/services/logger.service';
import { PlantillaModule } from '../plantilla/plantilla.module';
import { PosicionesModule } from '../posiciones/posiciones.module';
import { JugadorEntity } from 'src/shared/entities/jugador.entity';
import { JugadorController } from './jugador.controller';
import { JugadorService } from './jugador.service';
import { JugadorMapper } from 'src/shared/mappers/jugador.mapper';
import { JugadorRepository } from 'src/shared/repository/jugador.repository';
import { EquipoModule } from '../equipo/equipo.module';
import { MulterModule } from '@nestjs/platform-express';
import { ImageService } from 'src/shared/services/image.service';

@Module({
  imports: [TypeOrmModule.forFeature([JugadorEntity]),
 PlantillaModule, PosicionesModule, EquipoModule, PosicionesModule,  MulterModule.register({
     limits: {
       fileSize: 20 * 1024 * 1024, // Tamaño máximo: 5MB
     },
   }),], // Esto registra la entidad TemporadaEntity en el contexto del módulo
  controllers: [JugadorController], // El controlador de la entidad
  providers: [
    JugadorService, // Servicio
    JugadorMapper, // Mapper
    JugadorRepository, // Repositorio (lo agregas aquí para que sea inyectado)
    LoggerService,
    ImageService,
  ],
  exports: [JugadorService, JugadorRepository, LoggerService], // Si necesitas que TemporadaService esté disponible fuera de este módulo
})
export class JugadorModule {}