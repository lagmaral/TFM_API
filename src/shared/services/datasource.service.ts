import { DataSource } from 'typeorm';
import { TypeOrmLogger } from 'src/config/typeorm-logger';

export const AppDataSource = new DataSource({
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

// Inicializa el DataSource
AppDataSource.initialize()
    .then(() => {
        console.log('Data Source has been initialized!');
    })
    .catch((err) => {
        console.error('Error during Data Source initialization', err);
    });