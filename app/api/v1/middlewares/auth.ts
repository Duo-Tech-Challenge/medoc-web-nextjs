/**
 * Middleware Auth (préparation pour l'authentification)
 * À implémenter après JWT setup
 */

import { NextRequest } from 'next/server';
import type { UserRole } from '@/types/common';
import { ApiError, ErrorCode } from '@/types/api';
import { extractTokenFromHeader, verifyToken } from '@/lib/jwt';

export interface AuthContext {
  userId: string;
  email: string;
  role: UserRole;
}

/**
 * Vérifier le JWT token et retourner le contexte d'auth
 */
export const verifyAuthToken = async (request: NextRequest): Promise<AuthContext | null> => {
  try {
    const authHeader = request.headers.get('authorization');
    const token = extractTokenFromHeader(authHeader || undefined);

    if (!token) {
      return null;
    }

    const payload = verifyToken(token);
    if (!payload) {
      return null;
    }

    return {
      userId: payload.userId,
      email: payload.email,
      role: payload.role,
    };
  } catch {
    return null;
  }
};

export const requireAuth = async (request: NextRequest): Promise<AuthContext> => {
  const auth = await verifyAuthToken(request);
  if (!auth) {
    throw new ApiError(
      ErrorCode.UNAUTHORIZED,
      'Authentication required'
    );
  }
  return auth;
};

export const requireRole = (allowedRoles: UserRole[]) => {
  return (auth: AuthContext): void => {
    if (!allowedRoles.includes(auth.role)) {
      throw new ApiError(
        ErrorCode.FORBIDDEN,
        'Insufficient permissions'
      );
    }
  };
};
