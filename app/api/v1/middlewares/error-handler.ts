/**
 * Middleware Error Handler
 * Capture tous les erreurs et retourne le format API standardisé
 */

import type { ApiErrorResponse } from '@/types/api';
import { ErrorCode, ApiError } from '@/types/api';
import { logger } from '@/lib/logger';

export const createErrorResponse = (error: unknown): ApiErrorResponse => {
  const timestamp = new Date().toISOString();

  if (error instanceof ApiError) {
    logger.warn(`API Error: ${error.message}`, { code: error.code });
    return {
      status: 'error',
      code: error.code,
      message: error.message,
      errors: error.errors,
      timestamp,
    };
  }

  if (error instanceof Error) {
    logger.error(`Unexpected Error: ${error.message}`);
    return {
      status: 'error',
      code: ErrorCode.INTERNAL_SERVER_ERROR,
      message: 'An unexpected error occurred',
      timestamp,
    };
  }

  logger.error('Unknown error occurred');
  return {
    status: 'error',
    code: ErrorCode.INTERNAL_SERVER_ERROR,
    message: 'An unexpected error occurred',
    timestamp,
  };
}
