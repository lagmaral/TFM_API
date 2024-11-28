import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import ormconfig from './ormconfig';
import { AppController } from './app.controller';
import { AppService } from './app.service';
//import { AuthModule } from './auth/auth.module';
//import { CategoriesModule } from './categories/categories.module';
//import { PostsModule } from './posts/posts.module';
//import { UsersModule } from './users/users.module';
import { TemporadaModule } from './modules/temporada/temporada.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { LoggingMiddleware } from './middleware/logging.middleware';
import { LoggerService } from './shared/services/logger.service';
import { EquipoModule } from './modules/equipo/equipo.module';
import { UsuariosModule } from './modules/usuarios/usuarios.module';
import { StaffModule } from './modules/staff/staff.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(ormconfig.options),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'), // Cambia la ruta a tu carpeta "public"
    }),
    //UsersModule,
    TemporadaModule,
    EquipoModule,
    UsuariosModule ,
    StaffModule/*
    CategoriesModule,
    PostsModule,
    AuthModule,*/,
  ],
  controllers: [AppController],
  providers: [AppService, LoggerService],
  exports: [LoggerService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
