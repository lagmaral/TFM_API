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

@Module({
  imports: [TypeOrmModule.forFeature([StaffEntity]),
  ConfigModule,
  EquipoStaffModule,
  // Asegúrate de que ConfigModule esté importado en este módulo
  ], // Esto registra la entidad TemporadaEntity en el contexto del módulo
  controllers: [StaffController], // El controlador de la entidad
  providers: [
    StaffService, // Servicio
    //EquipoStaffService,
    //EquipoStaffRepository,
    StaffMapper, // Mapper
    StaffRepository, // Repositorio (lo agregas aquí para que sea inyectado)
    LoggerService,
    ConfigService
  ],
  exports: [StaffService, StaffRepository, LoggerService,ConfigService], // Si necesitas que TemporadaService esté disponible fuera de este módulo
})
export class StaffModule {}
