/**
 * Pharmacy Repository
 * Gère l'accès aux données de pharmacies
 */

import type { PharmacyDTO, CreatePharmacyDTO } from '@/types/pharmacy';
import { MockRepository } from './base.repository';

export interface PharmacyRecord extends PharmacyDTO {
  id: string;
}

class PharmacyRepository extends MockRepository<PharmacyRecord> {
  async findByEmail(email: string): Promise<PharmacyRecord | null> {
    const all = await this.findAll();
    return all.find(p => p.email.toLowerCase() === email.toLowerCase()) || null;
  }

  async findByName(name: string): Promise<PharmacyRecord | null> {
    const all = await this.findAll();
    return all.find(p => p.name.toLowerCase() === name.toLowerCase()) || null;
  }

  async findValidated(): Promise<PharmacyRecord[]> {
    const all = await this.findAll();
    return all.filter(p => p.isValidated);
  }

  async searchByCity(city: string): Promise<PharmacyRecord[]> {
    const all = await this.findAll();
    const lowerCity = city.toLowerCase();
    return all.filter(p => 
      p.address.city.toLowerCase().includes(lowerCity)
    );
  }

  async createFromDTO(dto: CreatePharmacyDTO): Promise<PharmacyRecord> {
    return this.create({
      ...dto,
      isValidated: false,
      averageRating: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
}

export const pharmacyRepository = new PharmacyRepository();
