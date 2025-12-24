/**
 * Types pour le système d'administration avancé
 * Gestion des pharmacies, validations, suspensions
 */



/**
 * Rôles admin granulaires
 * - SUPER_ADMIN: Tous les droits
 * - ADMIN: Gestion pharmacies et médicaments
 */
export enum AdminRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
}

/**
 * Statut de validation d'une pharmacie
 * - PENDING: En attente de validation admin
 * - VALIDATED: Approuvée par admin
 * - REJECTED: Rejetée (raison en commentaire)
 * - SUSPENDED: Suspendue temporairement
 */
export enum PharmacyStatus {
  PENDING = 'PENDING',
  VALIDATED = 'VALIDATED',
  REJECTED = 'REJECTED',
  SUSPENDED = 'SUSPENDED',
  REACTIVATION_PENDING = 'REACTIVATION_PENDING',
}

/**
 * DTO: Audit trail pour les actions admin
 * Trace chaque action effectuée sur une pharmacie
 */
export interface AdminAuditDTO {
  id: string;
  adminId: string;
  adminEmail: string;
  pharmacyId: string;
  pharmacyName: string;
  action: 'CREATED' | 'VALIDATED' | 'REJECTED' | 'SUSPENDED' | 'REACTIVATED';
  comment: string;
  previousStatus: PharmacyStatus;
  newStatus: PharmacyStatus;
  timestamp: Date;
  ipAddress?: string;
}

/**
 * DTO: Validation review (avis de validation admin)
 */
export interface ValidationReviewDTO {
  id: string;
  pharmacyId: string;
  adminId: string;
  status: PharmacyStatus;
  internalComment: string; // Visible admin uniquement
  validationDate: Date;
  expiresAt?: Date; // Pour les validations temporaires
}

/**
 * DTO: Request de suspension pharmacie
 */
export interface SuspensionRequestDTO {
  pharmacyId: string;
  reason: 'VIOLATION' | 'FRAUD' | 'INACTIVE' | 'OTHER';
  comment: string;
  immediate: boolean; // Suspension immédiate ou graceful shutdown
}

/**
 * DTO: Request de réactivation pharmacie
 */
export interface ReactivationRequestDTO {
  pharmacyId: string;
  adminComment: string;
  requiredActions?: string[]; // Actions que la pharmacie doit faire
}

/**
 * DTO: Suspension record (historique)
 */
export interface SuspensionRecordDTO {
  id: string;
  pharmacyId: string;
  suspendedBy: string; // admin id
  suspendedAt: Date;
  reason: string;
  reactivatedAt?: Date;
  reactivatedBy?: string;
}

/**
 * DTO: Admin dashboard statistics
 */
export interface AdminStatsDTO {
  totalPharmacies: number;
  pendingValidations: number;
  validatedPharmacies: number;
  rejectedPharmacies: number;
  suspendedPharmacies: number;
  recentValidations: ValidationReviewDTO[];
  recentSuspensions: SuspensionRecordDTO[];
}

/**
 * DTO: Admin user (avec rôle granulaire)
 */
export interface AdminUserDTO {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: AdminRole;
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt?: Date;
  isActive: boolean;
}

/**
 * DTO: Create admin (admin uniquement)
 */
export interface CreateAdminDTO {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: AdminRole;
}

/**
 * DTO: Pharmacy validation details (pour admin review)
 */
export interface PharmacyValidationDetailsDTO {
  pharmacyId: string;
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
  createdAt: Date;
  status: PharmacyStatus;
  previousValidations?: ValidationReviewDTO[];
  suspensionHistory?: SuspensionRecordDTO[];
  auditTrail?: AdminAuditDTO[];
}
