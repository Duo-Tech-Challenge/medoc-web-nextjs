/**
 * Feature Search - Logique de recherche de médicaments
 * Conforme au cahier des charges : recherche inversée (médicament → pharmacies)
 */

export interface MedicationSearch {
  query: string;
  location?: string;
}

export interface PharmacyResult {
  id: string;
  name: string;
  address: string;
  location: {
    lat: number;
    lng: number;
  };
  availability: boolean;
  rating: number;
  hours: string;
}

export interface SearchResult {
  medication: string;
  pharmacies: PharmacyResult[];
}

// Hooks de recherche
export const useSearch = () => {
  // Implémentation future
  return null;
};