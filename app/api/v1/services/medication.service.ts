/**
 * Medication Service
 * Logique métier pour les médicaments
 */

import type { MedicationDTO, CreateMedicationDTO, UpdateMedicationDTO } from '@/types/medication';
import { medicationRepository } from '@/app/api/v1/repositories/medication.repository';
import { ApiError, ErrorCode } from '@/types/api';

export class MedicationService {
  async createMedication(dto: CreateMedicationDTO): Promise<MedicationDTO> {
    // Vérifier les doublons
    const existing = await medicationRepository.findByName(dto.name);
    if (existing) {
      throw new ApiError(
        ErrorCode.CONFLICT,
        `Medication "${dto.name}" already exists`
      );
    }

    return medicationRepository.createFromDTO(dto);
  }

  async getMedicationById(id: string): Promise<MedicationDTO> {
    const medication = await medicationRepository.findById(id);
    if (!medication) {
      throw new ApiError(ErrorCode.NOT_FOUND, 'Medication not found');
    }
    return medication;
  }

  async getAllMedications(): Promise<MedicationDTO[]> {
    return medicationRepository.findAll();
  }

  async updateMedication(id: string, dto: UpdateMedicationDTO): Promise<MedicationDTO> {
    const medication = await medicationRepository.update(id, {
      ...dto,
      updatedAt: new Date(),
    });

    if (!medication) {
      throw new ApiError(ErrorCode.NOT_FOUND, 'Medication not found');
    }

    return medication;
  }

  async deleteMedication(id: string): Promise<void> {
    const deleted = await medicationRepository.delete(id);
    if (!deleted) {
      throw new ApiError(ErrorCode.NOT_FOUND, 'Medication not found');
    }
  }

  async searchMedications(query: string): Promise<MedicationDTO[]> {
    return medicationRepository.searchByName(query);
  }
}

export const medicationService = new MedicationService();
