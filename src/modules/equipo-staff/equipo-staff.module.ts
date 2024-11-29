import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EquipoStaffEntity } from 'src/shared/entities/equipo-staff.entity';
import { EquipoStaffService } from './equipo-staff.service';
import { LoggerService } from 'src/shared/services/logger.service';
import { EquipoStaffRepository } from 'src/shared/repository/equipo-staff.repository';
import { EquipoStaffMapper } from 'src/shared/mappers/equipo-staff.mapper';
@Module({
    imports: [TypeOrmModule.forFeature([EquipoStaffEntity])],
    providers: [EquipoStaffService,EquipoStaffRepository, EquipoStaffMapper,LoggerService],   
    exports: [EquipoStaffService,EquipoStaffRepository], // Exportar el servicio para que otros módulos puedan usarlo
  })
export class EquipoStaffModule {}