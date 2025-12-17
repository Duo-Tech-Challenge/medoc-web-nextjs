/**
 * Utilitaires logger
 */

export enum LogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
}

const log = (level: LogLevel, message: string, data?: unknown): void => {
  const timestamp = new Date().toISOString();
  const prefix = `[${timestamp}] [${level}]`;

  if (data) {
    console.log(`${prefix} ${message}`, data);
  } else {
    console.log(`${prefix} ${message}`);
  }
};

export const logger = {
  debug: (message: string, data?: unknown): void => log(LogLevel.DEBUG, message, data),
  info: (message: string, data?: unknown): void => log(LogLevel.INFO, message, data),
  warn: (message: string, data?: unknown): void => log(LogLevel.WARN, message, data),
  error: (message: string, data?: unknown): void => log(LogLevel.ERROR, message, data),
};
