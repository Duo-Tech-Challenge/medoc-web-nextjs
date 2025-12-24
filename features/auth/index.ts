/**
 * Feature Auth - Logique d'authentification
 * Conforme au cahier des charges : flows utilisateur et pharmacie
 */

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: 'USER' | 'PHARMACY' | 'ADMIN';
}

// Hooks d'authentification
export const useAuth = () => {
  // Implémentation future
  return null;
};