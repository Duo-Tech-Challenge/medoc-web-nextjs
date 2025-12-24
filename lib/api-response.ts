/**
 * Utilitaires de réponse API
 * Garantit le format standardisé pour tous les endpoints
 */

import { NextResponse } from 'next/server';

import { ErrorCode } from '@/types/api';

const getTimestamp = (): string => new Date().toISOString();

export const createSuccessResponse = <T>(
  data: T,
  message: string = 'Success',
  code: number = 200
) => {
  return NextResponse.json({
    status: 'success',
    code,
    message,
    data,
    timestamp: getTimestamp(),
  }, { status: code });
};

export const createErrorResponse = (
  message: string,
  codeOrErrorType: number | string = 500,
  statusCodeOrErrors?: number | Record<string, string[]>
) => {
  let code = 500;
  let errors: Record<string, string[]> | undefined;
  
  if (typeof codeOrErrorType === 'number') {
    code = codeOrErrorType;
    if (typeof statusCodeOrErrors === 'object') {
        errors = statusCodeOrErrors as Record<string, string[]>;
    }
  } else {
    // If second arg is string (Legacy Error Type), we assume third arg might be status code
    if (typeof statusCodeOrErrors === 'number') {
        code = statusCodeOrErrors;
    }
  }

  return NextResponse.json({
    status: 'error',
    code,
    message,
    errors,
    timestamp: getTimestamp(),
  }, { status: code });
};

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
