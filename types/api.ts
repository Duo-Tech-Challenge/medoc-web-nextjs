/**
 * Types API - Format standardisé de réponse
 * OBLIGATOIRE pour tous les endpoints
 */

export type ApiStatus = 'success' | 'error';

export interface ApiResponse<T = unknown> {
  status: ApiStatus;
  code: number;
  message: string;
  data?: T;
  errors?: Record<string, string[]>;
  timestamp: string;
}

export interface ApiErrorResponse {
  status: 'error';
  code: number;
  message: string;
  errors?: Record<string, string[]>;
  timestamp: string;
}

export interface ApiSuccessResponse<T> {
  status: 'success';
  code: number;
  message: string;
  data: T;
  timestamp: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  pages: number;
}

/**
 * Codes d'erreur standardisés
 */
export enum ErrorCode {
  // Client errors (4xx)
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  UNPROCESSABLE_ENTITY = 422,

  // Server errors (5xx)
  INTERNAL_SERVER_ERROR = 500,
  SERVICE_UNAVAILABLE = 503,
}

export interface ValidationError {
  field: string;
  message: string;
  code?: string;
}

export class ApiError extends Error {
  constructor(
    public code: number = ErrorCode.INTERNAL_SERVER_ERROR,
    message: string = 'Internal server error',
    public errors?: Record<string, string[]>
  ) {
    super(message);
    this.name = 'ApiError';
  }
}
