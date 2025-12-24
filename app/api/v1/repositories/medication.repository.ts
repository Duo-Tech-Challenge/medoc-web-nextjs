/**
 * Medication Repository
 * Gère l'accès aux données de médicaments via PostgreSQL
 */

import type { MedicationDTO, CreateMedicationDTO } from '@/types/medication';
import { PrismaRepository } from './base.repository';

export interface MedicationRecord extends MedicationDTO {
  id: string;
}

class MedicationRepository extends PrismaRepository<MedicationRecord> {
  async findById(id: string): Promise<MedicationRecord | null> {
    const medication = await this.prisma.medication.findUnique({
      where: { id },
    });
    
    return medication ? this.mapToRecord(medication) : null;
  }

  async findAll(): Promise<MedicationRecord[]> {
    const medications = await this.prisma.medication.findMany();
    return medications.map(m => this.mapToRecord(m));
  }

  async create(data: Partial<MedicationRecord>): Promise<MedicationRecord> {
    const medication = await this.prisma.medication.create({
      data: {
        name: data.name!,
        genericName: data.genericName!,
        form: data.form!,
        dosage: data.dosage!,
        manufacturer: data.manufacturer!,
      },
    });
    
    return this.mapToRecord(medication);
  }

  async update(id: string, data: Partial<MedicationRecord>): Promise<MedicationRecord | null> {
    const medication = await this.prisma.medication.update({
      where: { id },
      data: {
        ...(data.name && { name: data.name }),
        ...(data.genericName && { genericName: data.genericName }),
        ...(data.form && { form: data.form }),
        ...(data.dosage && { dosage: data.dosage }),
        ...(data.manufacturer && { manufacturer: data.manufacturer }),
      },
    });
    
    return this.mapToRecord(medication);
  }

  async delete(id: string): Promise<boolean> {
    try {
      await this.prisma.medication.delete({ where: { id } });
      return true;
    } catch {
      return false;
    }
  }

  async findByName(name: string): Promise<MedicationRecord | null> {
    const medication = await this.prisma.medication.findFirst({
      where: { 
        OR: [
          { name: { equals: name, mode: 'insensitive' } },
          { name: { contains: name, mode: 'insensitive' } }
        ]
      },
    });
    
    return medication ? this.mapToRecord(medication) : null;
  }

  async searchByName(query: string): Promise<MedicationRecord[]> {
    const medications = await this.prisma.medication.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { genericName: { contains: query, mode: 'insensitive' } }
        ]
      },
    });
    
    return medications.map(m => this.mapToRecord(m));
  }

  async createFromDTO(dto: CreateMedicationDTO): Promise<MedicationRecord> {
    return this.create({
      ...dto,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  private mapToRecord(medication: any): MedicationRecord {
    return {
      id: medication.id,
      name: medication.name,
      genericName: medication.genericName,
      form: medication.form,
      dosage: medication.dosage,
      manufacturer: medication.manufacturer,
      createdAt: medication.createdAt,
      updatedAt: medication.updatedAt,
    };
  }
}

export const medicationRepository = new MedicationRepository();
