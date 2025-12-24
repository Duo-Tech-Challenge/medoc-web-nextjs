/**
 * Search Service
 * Logique métier pour la recherche inversée
 * Input: médicament → Output: pharmacies
 */

import type { SearchResultDTO, PharmacySearchResultDTO } from '@/types/medication';
import { medicationRepository } from '@/app/api/v1/repositories/medication.repository';
import { pharmacyRepository } from '@/app/api/v1/repositories/pharmacy.repository';
import { pharmacyMedicationRepository } from '@/app/api/v1/repositories/pharmacy-medication.repository';
import { ApiError, ErrorCode } from '@/types/api';
import { logger } from '@/lib/logger';

export class SearchService {
  /**
   * Recherche inversée : médicament → pharmacies
   * Retourne UNIQUEMENT les données publiques (pas de prix/stock)
   */
  async searchMedicationInPharmacies(
    medicationName: string
  ): Promise<SearchResultDTO> {
    logger.info('Search medications', { query: medicationName });

    // 1. Chercher le médicament
    const medications = await medicationRepository.searchByName(medicationName);
    if (medications.length === 0) {
      throw new ApiError(
        ErrorCode.NOT_FOUND,
        `Medication "${medicationName}" not found`
      );
    }

    const medication = medications[0];

    // 2. Utiliser la requête optimisée du repository pour récupérer les pharmacies
    const pharmacyMedications = await pharmacyMedicationRepository.findAvailableByMedication(medication.id);
    
    // 3. Transformer les résultats en format de recherche
    const pharmacyResults: PharmacySearchResultDTO[] = pharmacyMedications.map(pm => ({
      id: pm.pharmacyId,
      name: (pm as any).pharmacy?.name || '',
      address: (pm as any).pharmacy?.street || '',
      city: (pm as any).pharmacy?.city || '',
      latitude: (pm as any).pharmacy?.latitude || 0,
      longitude: (pm as any).pharmacy?.longitude || 0,
      isAvailable: pm.isAvailable,
      averageRating: (pm as any).pharmacy?.averageRating || 0,
    }));

    logger.info('Search completed', { medicationId: medication.id, pharmaciesCount: pharmacyResults.length });

    return {
      medication,
      pharmacies: pharmacyResults,
    };
  }

  /**
   * Chercher une pharmacie par ID et retourner les données publiques
   */
  async getPharmacyPublic(pharmacyId: string) {
    const pharmacy = await pharmacyRepository.findById(pharmacyId);
    if (!pharmacy) {
      throw new ApiError(ErrorCode.NOT_FOUND, 'Pharmacy not found');
    }

    return {
      id: pharmacy.id,
      name: pharmacy.name,
      address: pharmacy.address,
      location: pharmacy.location,
      phone: pharmacy.phone,
      averageRating: pharmacy.averageRating,
      operatingHours: [],
    };
  }

  /**
   * Chercher les pharmacies disponibles pour un médicament
   */
  async findPharmaciesWithMedication(medicationId: string): Promise<PharmacySearchResultDTO[]> {
    const availabilities = await pharmacyMedicationRepository.findAvailableByMedication(medicationId);
    const pharmacyIds = availabilities.map(a => a.pharmacyId);

    const pharmacyResults: PharmacySearchResultDTO[] = [];

    for (const pharmacyId of pharmacyIds) {
      const pharmacy = await pharmacyRepository.findById(pharmacyId);
      if (pharmacy && pharmacy.isValidated) {
        pharmacyResults.push({
          id: pharmacy.id,
          name: pharmacy.name,
          address: pharmacy.address.street,
          city: pharmacy.address.city,
          latitude: pharmacy.location.latitude,
          longitude: pharmacy.location.longitude,
          isAvailable: true,
          averageRating: pharmacy.averageRating,
        });
      }
    }

    return pharmacyResults;
  }
}

export const searchService = new SearchService();
