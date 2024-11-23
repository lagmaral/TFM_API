import { ConfigModule } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { TypeOrmLogger } from './config/typeorm-logger';

ConfigModule.forRoot();

const config = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: false,
  migrations: [__dirname + '/../migrations/**/*{.ts,.js}'],
  migrationsRun: true,
  logger: new TypeOrmLogger(),
  logging: true, 
});

export default config;