import { createLogger, format, transports } from 'winston';

const sqlLogger = createLogger({
  format: format.combine(
    format.timestamp(),
    format.printf(({ timestamp, message }) => {
      return `${timestamp} ${message}`;
    })
  ),
  transports: [
    new transports.File({ filename: 'logs/sql.log' }),
  ],
});

const apiLogger = createLogger({
  format: format.combine(
    format.timestamp(),
    format.printf(({ timestamp, level, message }) => {
      return `${timestamp} ${level}: ${message}`;
    })
  ),
  transports: [
    new transports.File({ filename: 'logs/api.log' }),
  ],
});

export { sqlLogger, apiLogger };