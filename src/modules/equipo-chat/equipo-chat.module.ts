import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerService } from 'src/shared/services/logger.service';
import { EquipoChatService } from './equipo-chat.service';
import { EquipoChatRepository } from 'src/shared/repository/equipo-chat.repository';
import { EquipoChatMapper } from 'src/shared/mappers/equipo-chat.mapper';
import { EquipoChatEntity } from 'src/shared/entities/equipo-chat.entity';
@Module({
    imports: [TypeOrmModule.forFeature([EquipoChatEntity])],
    providers: [EquipoChatService,EquipoChatRepository, EquipoChatMapper,LoggerService],   
    exports: [EquipoChatService,EquipoChatRepository, EquipoChatMapper], // Exportar el servicio para que otros módulos puedan usarlo
  })
export class EquipoChatModule {}