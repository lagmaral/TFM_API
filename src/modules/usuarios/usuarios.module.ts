import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerService } from 'src/shared/services/logger.service';
import { UsuarioMapper } from 'src/shared/mappers/usuario.mapper';
import { UsuarioRepository } from 'src/shared/repository/usuarios.repository';
import { UsuarioEntity } from 'src/shared/entities/usuario.entity';
import { UsuariosController } from './usuarios.controller';
import { UsuariosService } from './usuarios.service';
import { JwtModule } from '@nestjs/jwt';
import { StaffModule } from '../staff/staff.module';
import { EquipoStaffModule } from '../equipo-staff/equipo-staff.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsuarioEntity]),
    StaffModule,
    EquipoStaffModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'default_secret', // Usar el secreto desde una variable de entorno
      signOptions: { expiresIn: '30d' }, // Establecer la expiración en 30 días
    }),
  ], // Esto registra la entidad TemporadaEntity en el contexto del módulo
  controllers: [UsuariosController], // El controlador de la entidad
  providers: [
    UsuariosService, // Servicio
    UsuarioMapper, // Mapper
    UsuarioRepository, // Repositorio (lo agregas aquí para que sea inyectado)
    LoggerService,
  ],
  exports: [UsuariosService, UsuarioRepository, LoggerService], // Si necesitas que TemporadaService esté disponible fuera de este módulo
})
export class UsuariosModule {}
