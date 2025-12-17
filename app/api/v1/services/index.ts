/**
 * Pharmacy Service
 * Logique métier pour les pharmacies
 */

import type { PharmacyDTO, CreatePharmacyDTO, UpdatePharmacyDTO, PharmacyPublicDTO } from '@/types/pharmacy';
import { pharmacyRepository } from '@/app/api/v1/repositories/pharmacy.repository';
import { ApiError, ErrorCode } from '@/types/api';

export class PharmacyService {
  /**
   * Créer une pharmacie (admin uniquement)
   */
  async createPharmacy(dto: CreatePharmacyDTO): Promise<PharmacyDTO> {
    // Vérifier les doublons
    const existingEmail = await pharmacyRepository.findByEmail(dto.email);
    if (existingEmail) {
      throw new ApiError(
        ErrorCode.CONFLICT,
        'A pharmacy with this email already exists'
      );
    }

    const existingName = await pharmacyRepository.findByName(dto.name);
    if (existingName) {
      throw new ApiError(
        ErrorCode.CONFLICT,
        'A pharmacy with this name already exists'
      );
    }

    // TODO: Hasher le password avant de stocker
    return pharmacyRepository.createFromDTO(dto);
  }

  async getPharmacyById(id: string): Promise<PharmacyDTO> {
    const pharmacy = await pharmacyRepository.findById(id);
    if (!pharmacy) {
      throw new ApiError(ErrorCode.NOT_FOUND, 'Pharmacy not found');
    }
    return pharmacy;
  }

  async getPharmacyPublic(id: string): Promise<PharmacyPublicDTO> {
    const pharmacy = await this.getPharmacyById(id);
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

  async getAllPharmacies(): Promise<PharmacyDTO[]> {
    return pharmacyRepository.findAll();
  }

  async getValidatedPharmacies(): Promise<PharmacyDTO[]> {
    return pharmacyRepository.findValidated();
  }

  async updatePharmacy(id: string, dto: UpdatePharmacyDTO): Promise<PharmacyDTO> {
    const pharmacy = await pharmacyRepository.update(id, {
      ...dto,
      updatedAt: new Date(),
    });

    if (!pharmacy) {
      throw new ApiError(ErrorCode.NOT_FOUND, 'Pharmacy not found');
    }

    return pharmacy;
  }

  async validatePharmacy(id: string, isValidated: boolean): Promise<PharmacyDTO> {
    const pharmacy = await pharmacyRepository.update(id, {
      isValidated,
      updatedAt: new Date(),
    });

    if (!pharmacy) {
      throw new ApiError(ErrorCode.NOT_FOUND, 'Pharmacy not found');
    }

    return pharmacy;
  }

  async deletePharmacy(id: string): Promise<void> {
    const deleted = await pharmacyRepository.delete(id);
    if (!deleted) {
      throw new ApiError(ErrorCode.NOT_FOUND, 'Pharmacy not found');
    }
  }

  async searchPharmaciesByCity(city: string): Promise<PharmacyDTO[]> {
    return pharmacyRepository.searchByCity(city);
  }
}

export const pharmacyService = new PharmacyService();

export * from './search.service';
export * from './medication.service';
export * from './user.service';
export * from './review.service';
