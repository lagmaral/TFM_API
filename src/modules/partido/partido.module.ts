import { Module } from '@nestjs/common';
import { PartidoController } from './partido.controller';
import { PartidoService } from './partido.service';
import { PartidoEntity } from 'src/shared/entities/partido.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PartidoMapper } from 'src/shared/mappers/partido.mapper';
import { PartidoRepository } from 'src/shared/repository/partido.repository';
import { LoggerService } from 'src/shared/services/logger.service';

@Module({
  imports: [TypeOrmModule.forFeature([PartidoEntity])],
  controllers: [PartidoController],
  providers: [PartidoService,
    PartidoMapper, // Mapper
    PartidoRepository, // Repositorio (lo agregas aquí para que sea inyectado)
    LoggerService,
  ],
  exports: [PartidoService, PartidoRepository, LoggerService], 
})
export class PartidoModule {}

