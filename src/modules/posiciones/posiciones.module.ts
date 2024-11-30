import { Module } from '@nestjs/common';
import { PosicionesService } from './posiciones.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerService } from 'src/shared/services/logger.service';
import { PosicionEntity } from 'src/shared/entities/posicion.entity';
import { PosicionMapper } from 'src/shared/mappers/posicion.mapper';
import { PosicionRepository } from 'src/shared/repository/posicion.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PosicionEntity]),], 
  controllers: [], 
  providers: [
    PosicionesService, 
    PosicionMapper, 
    PosicionRepository, 
    LoggerService,
  ],
  exports: [PosicionesService, PosicionRepository, LoggerService], 
})
export class PosicionesModule {}