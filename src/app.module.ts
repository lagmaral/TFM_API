import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import ormconfig from './ormconfig';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TemporadaModule } from './modules/temporada/temporada.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { LoggingMiddleware } from './middleware/logging.middleware';
import { LoggerService } from './shared/services/logger.service';
import { EquipoModule } from './modules/equipo/equipo.module';
import { UsuariosModule } from './modules/usuarios/usuarios.module';
import { StaffModule } from './modules/staff/staff.module';
import { ConfigurableService } from './shared/services/env.service';
import { staticPaths } from './static.config';
import { EquipoStaffModule } from './modules/equipo-staff/equipo-staff.module';
import { PlantillaModule } from './modules/plantilla/plantilla.module';
import { EquipoChatModule } from './modules/equipo-chat/equipo-chat.module';
import { PosicionesModule } from './modules/posiciones/posiciones.module';
import { JugadorModule } from './modules/jugador/jugador.module';
import { CargoModule } from './modules/cargo/cargo.module';


@Module({
  providers: [AppService, LoggerService,ConfigurableService],
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(ormconfig.options),
    CargoModule,
    EquipoChatModule,
    EquipoModule,
    EquipoStaffModule,
    JugadorModule,
    UsuariosModule ,
    PlantillaModule,
    PosicionesModule,
    StaffModule,
    TemporadaModule,
    ServeStaticModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => staticPaths(configService),
    }),
  ],
  controllers: [AppController],

  exports: [LoggerService,ConfigurableService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}


