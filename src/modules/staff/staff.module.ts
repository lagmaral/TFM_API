import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerService } from 'src/shared/services/logger.service';
import { StaffMapper } from 'src/shared/mappers/staff.mapper';
import { StaffEntity } from 'src/shared/entities/staff.entity';
import { StaffController } from './staff.controller';
import { StaffService } from './staff.service';
import { StaffRepository } from 'src/shared/repository/staff.repository';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';

@Module({
  imports: [TypeOrmModule.forFeature([StaffEntity]),
  ConfigModule, // Asegúrate de que ConfigModule esté importado en este módulo
  ], // Esto registra la entidad TemporadaEntity en el contexto del módulo
  controllers: [StaffController], // El controlador de la entidad
  providers: [
    StaffService, // Servicio
    StaffMapper, // Mapper
    StaffRepository, // Repositorio (lo agregas aquí para que sea inyectado)
    LoggerService,
    ConfigService
  ],
  exports: [StaffService, StaffRepository, LoggerService,ConfigService], // Si necesitas que TemporadaService esté disponible fuera de este módulo
})
export class StaffModule {}
