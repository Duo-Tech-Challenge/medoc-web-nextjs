/**
 * Types pour le dashboard interne des pharmacies
 * Gestion des médicaments, disponibilités, historiques
 */

/**
 * DTO: Profil interne pharmacie
 * Infos modifiables par la pharmacie elle-même
 */
export interface PharmacyProfileDTO {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    zipCode: string;
    country: string;
  };
  location: {
    latitude: number;
    longitude: number;
  };
  operatingHours: OperatingHoursDTO[];
  internalNotes?: string; // Notes internes non visibles public
  lastProfileUpdate: Date;
  publicRating: number;
}

/**
 * DTO: Horaires d'ouverture
 */
export interface OperatingHoursDTO {
  day: 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY';
  openTime: string; // HH:mm
  closeTime: string; // HH:mm
  isOpen: boolean;
}

/**
 * DTO: Gestion d'un médicament pour une pharmacie
 */
export interface PharmacyMedicationManagementDTO {
  id: string;
  medicationId: string;
  medicationName: string;
  medicationForm: string;
  medicationDosage: string;
  isAvailable: boolean;
  lastUpdated: Date;
  notes?: string; // Notes internes sur ce médicament
}

/**
 * DTO: Changement de disponibilité (historique)
 */
export interface AvailabilityChangeDTO {
  id: string;
  medicationId: string;
  medicationName: string;
  previousStatus: boolean;
  newStatus: boolean;
  changedAt: Date;
  reason?: string; // ex: "Stock épuisé", "Rétablissement stock"
}

/**
 * DTO: Request pour mettre à jour la disponibilité
 */
export interface UpdateAvailabilityRequestDTO {
  medicationId: string;
  isAvailable: boolean;
  reason?: string;
}

/**
 * DTO: Analytics pharmacie (vue interne)
 */
export interface PharmacyAnalyticsDTO {
  pharmacyId: string;
  periodStart: Date;
  periodEnd: Date;
  
  // Recherches
  totalSearches: number;
  medicationsSearched: {
    medicationName: string;
    searchCount: number;
  }[];
  
  // Tendances
  topSearchedMedications: {
    medicationName: string;
    count: number;
  }[];
  peakSearchHours: number[]; // Heures 0-23
  
  // Disponibilité
  averageAvailabilityRate: number; // 0-100 %
  mostRequestedMedications: {
    medicationName: string;
    requestCount: number;
    availabilityRate: number;
  }[];
  
  // Performance
  averageUserRating: number;
  totalReviews: number;
  reviewsTrend: {
    date: Date;
    rating: number;
    reviewCount: number;
  }[];
}

/**
 * DTO: Request de modification profil pharmacie
 */
export interface UpdatePharmacyProfileRequestDTO {
  phone?: string;
  address?: {
    street: string;
    city: string;
    zipCode: string;
    country: string;
  };
  location?: {
    latitude: number;
    longitude: number;
  };
  operatingHours?: OperatingHoursDTO[];
  internalNotes?: string;
}

/**
 * DTO: Indisponibilité temporaire
 * Permet à une pharmacie de marquer un médicament comme temporairement indisponible
 */
export interface TemporaryUnavailabilityDTO {
  id: string;
  medicationId: string;
  medicationName: string;
  startDate: Date;
  expectedReturnDate: Date;
  reason: string; // "Rupture stock", "Délai réapprovisionnement", etc.
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * DTO: Historique d'indisponibilités
 */
export interface UnavailabilityHistoryDTO {
  medicationId: string;
  medicationName: string;
  totalUnavailabilityDays: number;
  occurrences: TemporaryUnavailabilityDTO[];
}

/**
 * DTO: Settings internes pharmacie
 */
export interface PharmacySettingsDTO {
  pharmacyId: string;
  allowAutoUnavailability: boolean; // Auto-marquer comme indisponible après X jours sans MAJ
  enableAnalytics: boolean;
  notifyAdminOnAvailabilityChange: boolean;
  maxTempUnavailabilityDays: number;
}
