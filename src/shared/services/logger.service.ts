// src/shared/services/logger.service.ts

import { Injectable, Scope, Logger } from '@nestjs/common';
import { apiLogger } from '../../config/logger.config';

@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService extends Logger {
  context: string;

  setContext(context: string) {
    this.context = context;
  }

  log(message: string) {
    apiLogger.info(`[${this.context}] ${message}`);
    super.log(message);
  }

  error(message: string, trace?: string) {
    apiLogger.error(`[${this.context}] ${message}`, trace);
    super.error(message, trace);
  }

  warn(message: string) {
    apiLogger.warn(`[${this.context}] ${message}`);
    super.warn(message);
  }

  debug(message: string) {
    apiLogger.debug(`[${this.context}] ${message}`);
    super.debug(message);
  }

  verbose(message: string) {
    apiLogger.verbose(`[${this.context}] ${message}`);
    super.verbose(message);
  }
}