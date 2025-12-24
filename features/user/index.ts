/**
 * Feature User - Espace utilisateur connecté
 * Conforme au cahier des charges : favoris et profil simple
 */

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  favorites: {
    pharmacies: string[];
    medications: string[];
  };
}

export interface FavoritePharmacy {
  id: string;
  name: string;
  address: string;
  rating: number;
}

// Hooks user
export const useUser = () => {
  // Implémentation future
  return null;
};