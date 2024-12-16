import { Module } from '@nestjs/common';
import { EquipoController } from './equipo.controller';
import { EquipoService } from './equipo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EquipoEntity } from 'src/shared/entities/equipo.entity';
import { LoggerService } from 'src/shared/services/logger.service';
import { EquipoRepository } from 'src/shared/repository/equipo.repository';
import { EquipoMapper } from 'src/shared/mappers/equipo.mapper';
import { PlantillaModule } from '../plantilla/plantilla.module';
import { EquipoStaffModule } from '../equipo-staff/equipo-staff.module';
import { EquipoChatModule } from '../equipo-chat/equipo-chat.module';
import { TemporadaModule } from '../temporada/temporada.module';
import { PosicionesModule } from '../posiciones/posiciones.module';
import { MulterModule } from '@nestjs/platform-express';
import { ImageService } from 'src/shared/services/image.service';

@Module({
  imports: [TypeOrmModule.forFeature([EquipoEntity]),
  EquipoChatModule,EquipoStaffModule,PlantillaModule,TemporadaModule, PosicionesModule,
  MulterModule.register({
    limits: {
      fileSize: 20 * 1024 * 1024, // Tamaño máximo: 5MB
    },
  })], // Esto registra la entidad TemporadaEntity en el contexto del módulo
  controllers: [EquipoController], // El controlador de la entidad
  providers: [
    EquipoService, // Servicio
    EquipoMapper, // Mapper
    EquipoRepository, // Repositorio (lo agregas aquí para que sea inyectado)
    LoggerService,
    ImageService,
  ],
  exports: [EquipoService, EquipoRepository, LoggerService], // Si necesitas que TemporadaService esté disponible fuera de este módulo
})
export class EquipoModule {}