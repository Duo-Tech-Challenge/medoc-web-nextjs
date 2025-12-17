/**
 * Medication Repository
 * Gère l'accès aux données de médicaments
 */

import type { MedicationDTO, CreateMedicationDTO } from '@/types/medication';
import { MockRepository } from './base.repository';

export interface MedicationRecord extends MedicationDTO {
  id: string;
}

class MedicationRepository extends MockRepository<MedicationRecord> {
  async findByName(name: string): Promise<MedicationRecord | null> {
    const all = await this.findAll();
    return all.find(m => m.name.toLowerCase() === name.toLowerCase()) || null;
  }

  async searchByName(query: string): Promise<MedicationRecord[]> {
    const all = await this.findAll();
    const lowerQuery = query.toLowerCase();
    return all.filter(
      m => m.name.toLowerCase().includes(lowerQuery) || 
           m.genericName.toLowerCase().includes(lowerQuery)
    );
  }

  async createFromDTO(dto: CreateMedicationDTO): Promise<MedicationRecord> {
    return this.create({
      ...dto,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
}

export const medicationRepository = new MedicationRepository();
