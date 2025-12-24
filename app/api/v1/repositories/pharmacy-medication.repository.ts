/**
 * PharmacyMedication Repository
 * Gère la relation entre pharmacies et médicaments via PostgreSQL
 */

import type { CreatePharmacyMedicationDTO } from '@/types/medication';
import { PrismaRepository } from './base.repository';

export interface PharmacyMedicationRecord extends CreatePharmacyMedicationDTO {
  id: string;
  lastUpdated: Date;
}

class PharmacyMedicationRepository extends PrismaRepository<PharmacyMedicationRecord> {
  async findById(id: string): Promise<PharmacyMedicationRecord | null> {
    const record = await this.prisma.pharmacyMedication.findUnique({
      where: { id },
      include: {
        pharmacy: {
          select: {
            id: true,
            name: true,
            city: true,
            latitude: true,
            longitude: true,
            phone: true,
            averageRating: true,
          }
        },
        medication: {
          select: {
            id: true,
            name: true,
            genericName: true,
            form: true,
            dosage: true,
            manufacturer: true,
          }
        }
      }
    });
    
    return record ? this.mapToRecord(record) : null;
  }

  async findAll(): Promise<PharmacyMedicationRecord[]> {
    const records = await this.prisma.pharmacyMedication.findMany({
      include: {
        pharmacy: {
          select: {
            id: true,
            name: true,
            city: true,
            latitude: true,
            longitude: true,
            phone: true,
            averageRating: true,
          }
        },
        medication: {
          select: {
            id: true,
            name: true,
            genericName: true,
            form: true,
            dosage: true,
            manufacturer: true,
          }
        }
      }
    });
    
    return records.map(r => this.mapToRecord(r));
  }

  async create(data: Partial<PharmacyMedicationRecord>): Promise<PharmacyMedicationRecord> {
    const record = await this.prisma.pharmacyMedication.create({
      data: {
        pharmacyId: data.pharmacyId!,
        medicationId: data.medicationId!,
        isAvailable: data.isAvailable ?? false,
      },
      include: {
        pharmacy: {
          select: {
            id: true,
            name: true,
            city: true,
            latitude: true,
            longitude: true,
            phone: true,
            averageRating: true,
          }
        },
        medication: {
          select: {
            id: true,
            name: true,
            genericName: true,
            form: true,
            dosage: true,
            manufacturer: true,
          }
        }
      }
    });
    
    return this.mapToRecord(record);
  }

  async update(id: string, data: Partial<PharmacyMedicationRecord>): Promise<PharmacyMedicationRecord | null> {
    const record = await this.prisma.pharmacyMedication.update({
      where: { id },
      data: {
        ...(data.isAvailable !== undefined && { isAvailable: data.isAvailable }),
      },
      include: {
        pharmacy: {
          select: {
            id: true,
            name: true,
            city: true,
            latitude: true,
            longitude: true,
            phone: true,
            averageRating: true,
          }
        },
        medication: {
          select: {
            id: true,
            name: true,
            genericName: true,
            form: true,
            dosage: true,
            manufacturer: true,
          }
        }
      }
    });
    
    return this.mapToRecord(record);
  }

  async delete(id: string): Promise<boolean> {
    try {
      await this.prisma.pharmacyMedication.delete({ where: { id } });
      return true;
    } catch {
      return false;
    }
  }

  async findByPharmacyAndMedication(
    pharmacyId: string,
    medicationId: string
  ): Promise<PharmacyMedicationRecord | null> {
    const record = await this.prisma.pharmacyMedication.findUnique({
      where: {
        pharmacyId_medicationId: {
          pharmacyId,
          medicationId,
        }
      },
      include: {
        pharmacy: {
          select: {
            id: true,
            name: true,
            city: true,
            latitude: true,
            longitude: true,
            phone: true,
            averageRating: true,
          }
        },
        medication: {
          select: {
            id: true,
            name: true,
            genericName: true,
            form: true,
            dosage: true,
            manufacturer: true,
          }
        }
      }
    });
    
    return record ? this.mapToRecord(record) : null;
  }

  async findByPharmacy(pharmacyId: string): Promise<PharmacyMedicationRecord[]> {
    const records = await this.prisma.pharmacyMedication.findMany({
      where: { pharmacyId },
      include: {
        pharmacy: {
          select: {
            id: true,
            name: true,
            city: true,
            latitude: true,
            longitude: true,
            phone: true,
            averageRating: true,
          }
        },
        medication: {
          select: {
            id: true,
            name: true,
            genericName: true,
            form: true,
            dosage: true,
            manufacturer: true,
          }
        }
      }
    });
    
    return records.map(r => this.mapToRecord(r));
  }

  async findByMedication(medicationId: string): Promise<PharmacyMedicationRecord[]> {
    const records = await this.prisma.pharmacyMedication.findMany({
      where: { medicationId },
      include: {
        pharmacy: {
          select: {
            id: true,
            name: true,
            city: true,
            latitude: true,
            longitude: true,
            phone: true,
            averageRating: true,
          }
        },
        medication: {
          select: {
            id: true,
            name: true,
            genericName: true,
            form: true,
            dosage: true,
            manufacturer: true,
          }
        }
      }
    });
    
    return records.map(r => this.mapToRecord(r));
  }

  async findAvailableByMedication(medicationId: string): Promise<PharmacyMedicationRecord[]> {
    const records = await this.prisma.pharmacyMedication.findMany({
      where: { 
        medicationId,
        isAvailable: true
      },
      include: {
        pharmacy: {
          select: {
            id: true,
            name: true,
            city: true,
            latitude: true,
            longitude: true,
            phone: true,
            averageRating: true,
          }
        },
        medication: {
          select: {
            id: true,
            name: true,
            genericName: true,
            form: true,
            dosage: true,
            manufacturer: true,
          }
        }
      }
    });
    
    return records.map(r => this.mapToRecord(r));
  }

  async updateAvailability(
    pharmacyId: string,
    medicationId: string,
    isAvailable: boolean
  ): Promise<PharmacyMedicationRecord | null> {
    const record = await this.prisma.pharmacyMedication.update({
      where: {
        pharmacyId_medicationId: {
          pharmacyId,
          medicationId,
        }
      },
      data: { isAvailable },
      include: {
        pharmacy: {
          select: {
            id: true,
            name: true,
            city: true,
            latitude: true,
            longitude: true,
            phone: true,
            averageRating: true,
          }
        },
        medication: {
          select: {
            id: true,
            name: true,
            genericName: true,
            form: true,
            dosage: true,
            manufacturer: true,
          }
        }
      }
    });
    
    return this.mapToRecord(record);
  }

  async createFromDTO(dto: CreatePharmacyMedicationDTO): Promise<PharmacyMedicationRecord> {
    return this.create({
      ...dto,
      lastUpdated: new Date(),
    });
  }

  private mapToRecord(record: any): PharmacyMedicationRecord {
    return {
      id: record.id,
      pharmacyId: record.pharmacyId,
      medicationId: record.medicationId,
      isAvailable: record.isAvailable,
      lastUpdated: record.updatedAt,
    };
  }
}

export const pharmacyMedicationRepository = new PharmacyMedicationRepository();
