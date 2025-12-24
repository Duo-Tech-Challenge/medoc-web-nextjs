/**
 * JWT Utilities
 * Gestion des tokens JWT
 * 
 * TODO: Remplacer par une vraie librairie (jsonwebtoken, etc.)
 */

export interface JWTPayload {
  userId: string;
  email: string;
  role: 'user' | 'pharmacy' | 'admin';
  iat: number;
  exp: number;
}

// const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-key-change-in-production';
const TOKEN_EXPIRY = 24 * 60 * 60 * 1000; // 24 heures

/**
 * Créer un JWT token (mock implementation)
 * TODO: Utiliser jsonwebtoken en production
 */
export function createToken(payload: Omit<JWTPayload, 'iat' | 'exp'>): string {
  // Mock: retourner un base64 du payload
  // En prod: utiliser jsonwebtoken
  const fullPayload: JWTPayload = {
    ...payload,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + TOKEN_EXPIRY / 1000,
  };

  const encoded = Buffer.from(JSON.stringify(fullPayload)).toString('base64');
  return `${encoded}.signature`;
}

/**
 * Vérifier et décoder un JWT token (mock implementation)
 */
export function verifyToken(token: string): JWTPayload | null {
  try {
    // Mock: décoder le base64
    // En prod: utiliser jsonwebtoken
    const [encoded] = token.split('.');
    const decoded = Buffer.from(encoded, 'base64').toString('utf-8');
    const payload = JSON.parse(decoded) as JWTPayload;

    // Vérifier expiration
    if (payload.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

/**
 * Extraire le token du header Authorization
 */
export function extractTokenFromHeader(authHeader?: string): string | null {
  if (!authHeader?.startsWith('Bearer ')) {
    return null;
  }

  return authHeader.slice(7);
}
