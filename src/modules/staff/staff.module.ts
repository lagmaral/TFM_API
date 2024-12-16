import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerService } from 'src/shared/services/logger.service';
import { StaffMapper } from 'src/shared/mappers/staff.mapper';
import { StaffEntity } from 'src/shared/entities/staff.entity';
import { StaffController } from './staff.controller';
import { StaffService } from './staff.service';
import { StaffRepository } from 'src/shared/repository/staff.repository';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EquipoStaffService } from '../equipo-staff/equipo-staff.service';
import { EquipoStaffRepository } from 'src/shared/repository/equipo-staff.repository';
import { EquipoStaffModule } from '../equipo-staff/equipo-staff.module';
import { CargoModule } from '../cargo/cargo.module';
import { CargoService } from '../cargo/cargo.service';
import { MulterModule } from '@nestjs/platform-express';
import { ImageService } from 'src/shared/services/image.service';

@Module({
  imports: [TypeOrmModule.forFeature([StaffEntity]),
  ConfigModule,
  EquipoStaffModule,
  CargoModule,
  MulterModule.register({
    limits: {
      fileSize: 20 * 1024 * 1024, // Tamaño máximo: 5MB
    },
  }),
  
  // Asegúrate de que ConfigModule esté importado en este módulo
  ], // Esto registra la entidad TemporadaEntity en el contexto del módulo
  controllers: [StaffController], // El controlador de la entidad
  providers: [
    StaffService, // Servicio
    CargoService,
    ImageService,
    //EquipoStaffService,
    //EquipoStaffRepository,
    StaffMapper, // Mapper
    StaffRepository, // Repositorio (lo agregas aquí para que sea inyectado)
    LoggerService,
    ConfigService
  ],
  exports: [StaffService, StaffRepository, LoggerService,ConfigService,CargoService], // Si necesitas que TemporadaService esté disponible fuera de este módulo
})
export class StaffModule {}
