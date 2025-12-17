/**
 * Types médicament
 */

export interface MedicationDTO {
  id: string;
  name: string;
  genericName: string;
  form: string; // Comprimé, Gélule, Sirop, etc.
  dosage: string;
  manufacturer: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface MedicationAvailabilityDTO {
  medicationId: string;
  pharmacyId: string;
  isAvailable: boolean; // OUI/NON uniquement
  lastUpdated: Date;
}

export interface CreateMedicationDTO {
  name: string;
  genericName: string;
  form: string;
  dosage: string;
  manufacturer: string;
}

export interface UpdateMedicationDTO {
  name?: string;
  genericName?: string;
  form?: string;
  dosage?: string;
  manufacturer?: string;
}

/**
 * Résultat de recherche (logique inversée)
 * Input: médicament → Output: pharmacies
 */
export interface SearchResultDTO {
  medication: MedicationDTO;
  pharmacies: PharmacySearchResultDTO[];
}

export interface PharmacySearchResultDTO {
  id: string;
  name: string;
  address: string;
  city: string;
  latitude: number;
  longitude: number;
  isAvailable: boolean;
  averageRating: number;
}

export interface CreatePharmacyMedicationDTO {
  pharmacyId: string;
  medicationId: string;
  isAvailable: boolean;
}

export interface UpdatePharmacyMedicationDTO {
  isAvailable: boolean;
}
