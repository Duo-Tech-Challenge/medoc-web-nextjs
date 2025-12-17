/**
 * PharmacyMedication Repository
 * Gère la relation entre pharmacies et médicaments
 */

import type { MedicationAvailabilityDTO, CreatePharmacyMedicationDTO, UpdatePharmacyMedicationDTO } from '@/types/medication';
import { MockRepository } from './base.repository';

export interface PharmacyMedicationRecord extends CreatePharmacyMedicationDTO {
  id: string;
  lastUpdated: Date;
}

class PharmacyMedicationRepository extends MockRepository<PharmacyMedicationRecord> {
  async findByPharmacyAndMedication(
    pharmacyId: string,
    medicationId: string
  ): Promise<PharmacyMedicationRecord | null> {
    const all = await this.findAll();
    return all.find(
      pm => pm.pharmacyId === pharmacyId && pm.medicationId === medicationId
    ) || null;
  }

  async findByPharmacy(pharmacyId: string): Promise<PharmacyMedicationRecord[]> {
    const all = await this.findAll();
    return all.filter(pm => pm.pharmacyId === pharmacyId);
  }

  async findByMedication(medicationId: string): Promise<PharmacyMedicationRecord[]> {
    const all = await this.findAll();
    return all.filter(pm => pm.medicationId === medicationId);
  }

  async findAvailableByMedication(medicationId: string): Promise<PharmacyMedicationRecord[]> {
    const all = await this.findByMedication(medicationId);
    return all.filter(pm => pm.isAvailable);
  }

  async updateAvailability(
    pharmacyId: string,
    medicationId: string,
    isAvailable: boolean
  ): Promise<PharmacyMedicationRecord | null> {
    const existing = await this.findByPharmacyAndMedication(pharmacyId, medicationId);
    if (!existing) return null;

    return this.update(existing.id, {
      isAvailable,
      lastUpdated: new Date(),
    });
  }

  async createFromDTO(dto: CreatePharmacyMedicationDTO): Promise<PharmacyMedicationRecord> {
    return this.create({
      ...dto,
      lastUpdated: new Date(),
    });
  }
}

export const pharmacyMedicationRepository = new PharmacyMedicationRepository();
