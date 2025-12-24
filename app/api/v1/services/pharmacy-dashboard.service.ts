/**
 * PharmacyDashboardService
 * Gère les workflows internes des pharmacies:
 * - Gestion du profil interne
 * - Disponibilités des médicaments
 * - Historique des changements
 * - Analytics
 */

import { ApiError } from '@/types/api';
import { ErrorCode } from '@/types/api';
import { logger } from '@/lib/logger';
import {
  PharmacyProfileDTO,
  PharmacyMedicationManagementDTO,
  AvailabilityChangeDTO,
  UpdateAvailabilityRequestDTO,
  PharmacyAnalyticsDTO,
  UpdatePharmacyProfileRequestDTO,
  TemporaryUnavailabilityDTO,
  UnavailabilityHistoryDTO,
  PharmacySettingsDTO,
  OperatingHoursDTO,
} from '@/types/pharmacy-dashboard';

/**
 * Mock data - À remplacer par Prisma
 */
const pharmacyProfiles: Map<string, PharmacyProfileDTO> = new Map();
const medicationManagement: Map<string, PharmacyMedicationManagementDTO[]> = new Map();
const availabilityHistory: Map<string, AvailabilityChangeDTO[]> = new Map();
const tempUnavailabilities: Map<string, TemporaryUnavailabilityDTO[]> = new Map();
const pharmacySettings: Map<string, PharmacySettingsDTO> = new Map();

export class PharmacyDashboardService {
  /**
   * Récupérer le profil interne d'une pharmacie
   */
  static getPharmacyProfile(pharmacyId: string): PharmacyProfileDTO {
    logger.debug(`[PharmacyDashboard] Fetching profile for pharmacy: ${pharmacyId}`);

    const profile = pharmacyProfiles.get(pharmacyId);
    if (!profile) {
      throw new ApiError(ErrorCode.NOT_FOUND, 'Pharmacy not found');
    }

    return profile;
  }

  /**
   * Mettre à jour le profil interne d'une pharmacie
   */
  static updatePharmacyProfile(
    pharmacyId: string,
    request: UpdatePharmacyProfileRequestDTO,
  ): PharmacyProfileDTO {
    logger.info(`[PharmacyDashboard] Updating profile for pharmacy: ${pharmacyId}`);

    const profile = pharmacyProfiles.get(pharmacyId);
    if (!profile) {
      throw new ApiError(ErrorCode.NOT_FOUND, 'Pharmacy not found');
    }

    // Mettre à jour les champs
    if (request.phone) profile.phone = request.phone;
    if (request.address) profile.address = request.address;
    if (request.location) profile.location = request.location;
    if (request.operatingHours) profile.operatingHours = request.operatingHours;
    if (request.internalNotes) profile.internalNotes = request.internalNotes;

    profile.lastProfileUpdate = new Date();
    pharmacyProfiles.set(pharmacyId, profile);

    logger.info(`[PharmacyDashboard] Profile updated for pharmacy: ${pharmacyId}`);
    return profile;
  }

  /**
   * Récupérer la liste des médicaments gérés par une pharmacie
   */
  static getPharmacyMedications(pharmacyId: string): PharmacyMedicationManagementDTO[] {
    logger.debug(`[PharmacyDashboard] Fetching medications for pharmacy: ${pharmacyId}`);

    const medications = medicationManagement.get(pharmacyId) || [];
    return medications;
  }

  /**
   * Mettre à jour la disponibilité d'un médicament
   */
  static updateMedicationAvailability(
    pharmacyId: string,
    request: UpdateAvailabilityRequestDTO,
  ): PharmacyMedicationManagementDTO {
    logger.info(
      `[PharmacyDashboard] Updating availability for medication: ${request.medicationId}`,
    );

    const medications = medicationManagement.get(pharmacyId) || [];
    const medication = medications.find((m) => m.medicationId === request.medicationId);

    if (!medication) {
      throw new ApiError(ErrorCode.NOT_FOUND, 'Medication not found in pharmacy');
    }

    // Enregistrer le changement dans l'historique
    const changeRecord: AvailabilityChangeDTO = {
      id: `change-${Date.now()}`,
      medicationId: request.medicationId,
      medicationName: medication.medicationName,
      previousStatus: medication.isAvailable,
      newStatus: request.isAvailable,
      changedAt: new Date(),
      reason: request.reason,
    };

    const history = availabilityHistory.get(pharmacyId) || [];
    history.push(changeRecord);
    availabilityHistory.set(pharmacyId, history);

    // Mettre à jour la disponibilité
    medication.isAvailable = request.isAvailable;
    medication.lastUpdated = new Date();
    medicationManagement.set(pharmacyId, medications);

    logger.info(
      `[PharmacyDashboard] Availability updated for medication ${request.medicationId}: ${request.isAvailable}`,
    );

    return medication;
  }

  /**
   * Récupérer l'historique des changements de disponibilité
   */
  static getAvailabilityHistory(pharmacyId: string): AvailabilityChangeDTO[] {
    logger.debug(`[PharmacyDashboard] Fetching availability history for pharmacy: ${pharmacyId}`);

    return availabilityHistory.get(pharmacyId) || [];
  }

  /**
   * Créer une indisponibilité temporaire pour un médicament
   */
  static createTemporaryUnavailability(
    pharmacyId: string,
    medicationId: string,
    medicationName: string,
    expectedReturnDate: Date,
    reason: string,
  ): TemporaryUnavailabilityDTO {
    logger.info(
      `[PharmacyDashboard] Creating temporary unavailability for medication: ${medicationId}`,
    );

    const unavailability: TemporaryUnavailabilityDTO = {
      id: `unavail-${Date.now()}`,
      medicationId,
      medicationName,
      startDate: new Date(),
      expectedReturnDate,
      reason,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const unavails = tempUnavailabilities.get(pharmacyId) || [];
    unavails.push(unavailability);
    tempUnavailabilities.set(pharmacyId, unavails);

    // Marquer comme indisponible automatiquement
    const medications = medicationManagement.get(pharmacyId) || [];
    const med = medications.find((m) => m.medicationId === medicationId);
    if (med) {
      med.isAvailable = false;
      med.notes = `Temporarily unavailable: ${reason}`;
    }

    logger.info(`[PharmacyDashboard] Temporary unavailability created for ${medicationId}`);
    return unavailability;
  }

  /**
   * Résoudre une indisponibilité temporaire
   */
  static resolveTemporaryUnavailability(
    pharmacyId: string,
    unavailabilityId: string,
  ): TemporaryUnavailabilityDTO {
    logger.info(
      `[PharmacyDashboard] Resolving temporary unavailability: ${unavailabilityId}`,
    );

    const unavails = tempUnavailabilities.get(pharmacyId) || [];
    const unavail = unavails.find((u) => u.id === unavailabilityId);

    if (!unavail) {
      throw new ApiError(ErrorCode.NOT_FOUND, 'Unavailability record not found');
    }

    unavail.isActive = false;
    unavail.updatedAt = new Date();

    logger.info(`[PharmacyDashboard] Unavailability resolved: ${unavailabilityId}`);
    return unavail;
  }

  /**
   * Récupérer l'historique des indisponibilités pour un médicament
   */
  static getUnavailabilityHistory(
    pharmacyId: string,
    medicationId: string,
  ): UnavailabilityHistoryDTO {
    logger.debug(
      `[PharmacyDashboard] Fetching unavailability history for medication: ${medicationId}`,
    );

    const unavails = tempUnavailabilities.get(pharmacyId) || [];
    const medicationUnavails = unavails.filter((u) => u.medicationId === medicationId);

    const totalDays = medicationUnavails.reduce((sum, u) => {
      const days = Math.floor(
        (u.expectedReturnDate.getTime() - u.startDate.getTime()) / (1000 * 60 * 60 * 24),
      );
      return sum + days;
    }, 0);

    return {
      medicationId,
      medicationName: medicationUnavails[0]?.medicationName || 'Unknown',
      totalUnavailabilityDays: totalDays,
      occurrences: medicationUnavails,
    };
  }

  /**
   * Récupérer les analytics d'une pharmacie
   * Tendances de recherche, périodes de forte demande, etc.
   */
  static getPharmacyAnalytics(
    pharmacyId: string,
    periodDays: number = 30,
  ): PharmacyAnalyticsDTO {
    logger.debug(
      `[PharmacyDashboard] Fetching analytics for pharmacy: ${pharmacyId} (${periodDays} days)`,
    );

    const now = new Date();
    const periodStart = new Date(now.getTime() - periodDays * 24 * 60 * 60 * 1000);

    // Mock data - à remplacer par vraies requêtes Prisma avec agrégation
    const analytics: PharmacyAnalyticsDTO = {
      pharmacyId,
      periodStart,
      periodEnd: now,
      totalSearches: 245,
      medicationsSearched: [
        { medicationName: 'Aspirin 500mg', searchCount: 42 },
        { medicationName: 'Paracetamol 1000mg', searchCount: 38 },
        { medicationName: 'Ibuprofen 200mg', searchCount: 35 },
      ],
      topSearchedMedications: [
        { medicationName: 'Aspirin 500mg', count: 42 },
        { medicationName: 'Paracetamol 1000mg', count: 38 },
        { medicationName: 'Ibuprofen 200mg', count: 35 },
      ],
      peakSearchHours: [9, 12, 18, 20], // Heures de forte demande
      averageAvailabilityRate: 87.5,
      mostRequestedMedications: [
        {
          medicationName: 'Aspirin 500mg',
          requestCount: 42,
          availabilityRate: 95,
        },
        {
          medicationName: 'Paracetamol 1000mg',
          requestCount: 38,
          availabilityRate: 89,
        },
      ],
      averageUserRating: 4.7,
      totalReviews: 23,
      reviewsTrend: [
        { date: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000), rating: 4.6, reviewCount: 5 },
        { date: new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000), rating: 4.5, reviewCount: 8 },
      ],
    };

    logger.debug(`[PharmacyDashboard] Analytics fetched for pharmacy: ${pharmacyId}`);
    return analytics;
  }

  /**
   * Récupérer les settings d'une pharmacie
   */
  static getPharmacySettings(pharmacyId: string): PharmacySettingsDTO {
    logger.debug(`[PharmacyDashboard] Fetching settings for pharmacy: ${pharmacyId}`);

    const settings = pharmacySettings.get(pharmacyId);
    if (!settings) {
      // Créer les settings par défaut
      const defaultSettings: PharmacySettingsDTO = {
        pharmacyId,
        allowAutoUnavailability: false,
        enableAnalytics: true,
        notifyAdminOnAvailabilityChange: true,
        maxTempUnavailabilityDays: 30,
      };
      pharmacySettings.set(pharmacyId, defaultSettings);
      return defaultSettings;
    }

    return settings;
  }

  /**
   * Mettre à jour les settings d'une pharmacie
   */
  static updatePharmacySettings(
    pharmacyId: string,
    updates: Partial<PharmacySettingsDTO>,
  ): PharmacySettingsDTO {
    logger.info(`[PharmacyDashboard] Updating settings for pharmacy: ${pharmacyId}`);

    let settings = pharmacySettings.get(pharmacyId);
    if (!settings) {
      settings = {
        pharmacyId,
        allowAutoUnavailability: false,
        enableAnalytics: true,
        notifyAdminOnAvailabilityChange: true,
        maxTempUnavailabilityDays: 30,
      };
    }

    // Mettre à jour les champs fournis
    Object.assign(settings, updates);
    pharmacySettings.set(pharmacyId, settings);

    logger.info(`[PharmacyDashboard] Settings updated for pharmacy: ${pharmacyId}`);
    return settings;
  }

  /**
   * Initialiser un profil pharmacie (appelé lors de la validation)
   */
  static initializePharmacyProfile(
    pharmacyId: string,
    name: string,
    email: string,
    phone: string,
    address: { street: string; city: string; zipCode: string; country: string },
    location: { latitude: number; longitude: number },
  ): PharmacyProfileDTO {
    logger.info(`[PharmacyDashboard] Initializing profile for pharmacy: ${pharmacyId}`);

    const profile: PharmacyProfileDTO = {
      id: pharmacyId,
      name,
      email,
      phone,
      address,
      location,
      operatingHours: this.getDefaultOperatingHours(),
      lastProfileUpdate: new Date(),
      publicRating: 0,
    };

    pharmacyProfiles.set(pharmacyId, profile);
    return profile;
  }

  /**
   * Obtenir les horaires par défaut (9h-19h tous les jours)
   */
  private static getDefaultOperatingHours(): OperatingHoursDTO[] {
    return [
      { day: 'MONDAY', openTime: '09:00', closeTime: '19:00', isOpen: true },
      { day: 'TUESDAY', openTime: '09:00', closeTime: '19:00', isOpen: true },
      { day: 'WEDNESDAY', openTime: '09:00', closeTime: '19:00', isOpen: true },
      { day: 'THURSDAY', openTime: '09:00', closeTime: '19:00', isOpen: true },
      { day: 'FRIDAY', openTime: '09:00', closeTime: '19:00', isOpen: true },
      { day: 'SATURDAY', openTime: '09:00', closeTime: '13:00', isOpen: true },
      { day: 'SUNDAY', openTime: '00:00', closeTime: '00:00', isOpen: false },
    ];
  }
}

export default PharmacyDashboardService;
