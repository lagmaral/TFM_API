import { Logger } from 'typeorm';
import { sqlLogger } from './logger.config';

export class TypeOrmLogger implements Logger {
  logQuery(query: string, parameters?: any[]) {
    sqlLogger.info(`Query: ${query}`);
    if (parameters && parameters.length) {
      sqlLogger.info(`Parameters: ${JSON.stringify(parameters)}`);
    }
  }

  logQueryError(error: string, query: string, parameters?: any[]) {
    sqlLogger.error(`Query Error: ${error}`);
    sqlLogger.error(`Query: ${query}`);
    if (parameters && parameters.length) {
      sqlLogger.error(`Parameters: ${JSON.stringify(parameters)}`);
    }
  }

  logQuerySlow(time: number, query: string, parameters?: any[]) {
    sqlLogger.warn(`Slow Query (${time}ms): ${query}`);
    if (parameters && parameters.length) {
      sqlLogger.warn(`Parameters: ${JSON.stringify(parameters)}`);
    }
  }

  logMigration(message: string) {
    sqlLogger.info(`Migration: ${message}`);
  }

  logSchemaBuild(message: string) {
    sqlLogger.info(`Schema Build: ${message}`);
  }

  log(level: 'log' | 'info' | 'warn', message: any) {
    switch (level) {
      case 'log':
        sqlLogger.info(message);
        break;
      case 'info':
        sqlLogger.info(message);
        break;
      case 'warn':
        sqlLogger.warn(message);
        break;
    }
  }
}