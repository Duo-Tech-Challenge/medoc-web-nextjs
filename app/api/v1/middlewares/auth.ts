/**
 * Middleware Auth (préparation pour l'authentification)
 * À implémenter après JWT setup
 */

import { NextRequest } from 'next/server';
import type { UserRole } from '@/types/common';
import { ApiError, ErrorCode } from '@/types/api';

export interface AuthContext {
  userId: string;
  email: string;
  role: UserRole;
}

/**
 * À implémenter : vérifier le JWT token
 */
export const verifyAuthToken = async (request: NextRequest): Promise<AuthContext | null> => {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return null;
    }

    // TODO: Vérifier et décoder le JWT token
    // const token = authHeader.slice(7);
    // const decoded = verifyJWT(token);

    // Pour maintenant, retourner null jusqu'à JWT setup
    return null;
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
