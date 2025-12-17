/**
 * Utilitaires de réponse API
 * Garantit le format standardisé pour tous les endpoints
 */

import type { ApiSuccessResponse, ApiErrorResponse } from '@/types/api';
import { ErrorCode } from '@/types/api';

const getTimestamp = (): string => new Date().toISOString();

export const createSuccessResponse = <T>(
  data: T,
  message: string = 'Success',
  code: number = 200
): ApiSuccessResponse<T> => ({
  status: 'success',
  code,
  message,
  data,
  timestamp: getTimestamp(),
});

export const createErrorResponse = (
  message: string,
  code: number = 500,
  errors?: Record<string, string[]>
): ApiErrorResponse => ({
  status: 'error',
  code,
  message,
  errors,
  timestamp: getTimestamp(),
});

export const handleErrorResponse = (error: unknown): { code: number; message: string; errors?: Record<string, string[]> } => {
  if (error instanceof Error) {
    return {
      code: ErrorCode.INTERNAL_SERVER_ERROR,
      message: error.message || 'Internal server error',
    };
  }

  return {
    code: ErrorCode.INTERNAL_SERVER_ERROR,
    message: 'An unexpected error occurred',
  };
};
