/**
 * Feature Admin - Espace administrateur
 * Conforme au cahier des charges : supervision et validation pharmacies
 */

export interface AdminStats {
  totalPharmacies: number;
  activePharmacies: number;
  pendingValidations: number;
  suspendedPharmacies: number;
}

export interface PharmacyValidation {
  id: string;
  name: string;
  email: string;
  status: 'PENDING' | 'VALIDATED' | 'SUSPENDED';
  submittedAt: string;
  internalNotes?: string;
}

// Hooks admin
export const useAdmin = () => {
  // Implémentation future
  return null;
};