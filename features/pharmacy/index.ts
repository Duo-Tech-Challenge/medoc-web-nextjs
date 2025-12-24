/**
 * Feature Pharmacy - Espace pharmacie
 * Conforme au cahier des charges : dashboard interne simplifié
 */

export interface PharmacyProfile {
  id: string;
  name: string;
  address: string;
  email: string;
  phone: string;
  hours: Record<string, string>;
}

export interface PharmacyMedication {
  id: string;
  name: string;
  available: boolean;
  lastUpdated: string;
}

export interface PharmacyStats {
  totalMedications: number;
  availableCount: number;
  unavailableCount: number;
  recentSearches: string[];
}

// Hooks pharmacy
export const usePharmacy = () => {
  // Implémentation future
  return null;
};