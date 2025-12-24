/**
 * Pharmacy Repository
 * Gère l'accès aux données de pharmacies via PostgreSQL
 */

import type { PharmacyDTO, CreatePharmacyDTO } from '@/types/pharmacy';
import { PharmacyStatus } from '@prisma/client';
import { PrismaRepository } from './base.repository';

export interface PharmacyRecord extends PharmacyDTO {
  id: string;
  status?: PharmacyStatus;
  operatingHours?: any;
  reviewCount?: number;
  password?: string;
}

class PharmacyRepository extends PrismaRepository<PharmacyRecord> {
  async findById(id: string): Promise<PharmacyRecord | null> {
    const pharmacy = await this.prisma.pharmacy.findUnique({
      where: { id },
      include: {
        _count: {
          select: { reviews: true }
        }
      }
    });
    
    return pharmacy ? this.mapToRecord(pharmacy) : null;
  }

  async findAll(): Promise<PharmacyRecord[]> {
    const pharmacies = await this.prisma.pharmacy.findMany({
      include: {
        _count: {
          select: { reviews: true }
        }
      }
    });
    
    return pharmacies.map(p => this.mapToRecord(p));
  }

  async create(data: Partial<PharmacyRecord>): Promise<PharmacyRecord> {
    const pharmacy = await this.prisma.pharmacy.create({
      data: {
        email: data.email!,
        password: data.password || 'temp', // Sera hashé au niveau service
        name: data.name!,
        street: data.address!.street,
        city: data.address!.city,
        zipCode: data.address!.zipCode,
        country: data.address!.country,
        latitude: data.location!.latitude,
        longitude: data.location!.longitude,
        phone: data.phone!,
        status: PharmacyStatus.PENDING,
        averageRating: 0,
        operatingHours: data.operatingHours,
      },
    });
    
    return this.mapToRecord(pharmacy);
  }

  async update(id: string, data: Partial<PharmacyRecord>): Promise<PharmacyRecord | null> {
    const pharmacy = await this.prisma.pharmacy.update({
      where: { id },
      data: {
        ...(data.name && { name: data.name }),
        ...(data.phone && { phone: data.phone }),
        ...(data.address && {
          street: data.address.street,
          city: data.address.city,
          zipCode: data.address.zipCode,
          country: data.address.country,
        }),
        ...(data.location && {
          latitude: data.location.latitude,
          longitude: data.location.longitude,
        }),
        ...(data.operatingHours && { operatingHours: data.operatingHours }),
        ...(data.status && { status: data.status as PharmacyStatus }),
      },
    });
    
    return this.mapToRecord(pharmacy);
  }

  async delete(id: string): Promise<boolean> {
    try {
      await this.prisma.pharmacy.delete({ where: { id } });
      return true;
    } catch {
      return false;
    }
  }

  async findByEmail(email: string): Promise<PharmacyRecord | null> {
    const pharmacy = await this.prisma.pharmacy.findUnique({
      where: { email: email.toLowerCase() },
    });
    
    return pharmacy ? this.mapToRecord(pharmacy) : null;
  }

  async findByName(name: string): Promise<PharmacyRecord | null> {
    const pharmacy = await this.prisma.pharmacy.findFirst({
      where: { name: { contains: name, mode: 'insensitive' } },
    });
    
    return pharmacy ? this.mapToRecord(pharmacy) : null;
  }

  async findValidated(): Promise<PharmacyRecord[]> {
    const pharmacies = await this.prisma.pharmacy.findMany({
      where: { status: PharmacyStatus.VALIDATED },
      include: {
        _count: {
          select: { reviews: true }
        }
      }
    });
    
    return pharmacies.map(p => this.mapToRecord(p));
  }

  async searchByCity(city: string): Promise<PharmacyRecord[]> {
    const pharmacies = await this.prisma.pharmacy.findMany({
      where: { 
        city: { contains: city, mode: 'insensitive' },
        status: PharmacyStatus.VALIDATED
      },
      include: {
        _count: {
          select: { reviews: true }
        }
      }
    });
    
    return pharmacies.map(p => this.mapToRecord(p));
  }

  async findPending(): Promise<PharmacyRecord[]> {
    const pharmacies = await this.prisma.pharmacy.findMany({
      where: { status: PharmacyStatus.PENDING },
      include: {
        _count: {
          select: { reviews: true }
        }
      }
    });
    
    return pharmacies.map(p => this.mapToRecord(p));
  }

  async updateStatus(id: string, status: PharmacyStatus): Promise<PharmacyRecord | null> {
    const pharmacy = await this.prisma.pharmacy.update({
      where: { id },
      data: { status },
    });
    
    return this.mapToRecord(pharmacy);
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

  private mapToRecord(pharmacy: any): PharmacyRecord {
    return {
      id: pharmacy.id,
      email: pharmacy.email,
      name: pharmacy.name,
      address: {
        street: pharmacy.street,
        city: pharmacy.city,
        zipCode: pharmacy.zipCode,
        country: pharmacy.country,
      },
      location: {
        latitude: pharmacy.latitude,
        longitude: pharmacy.longitude,
      },
      phone: pharmacy.phone,
      averageRating: pharmacy.averageRating,
      isValidated: pharmacy.status === PharmacyStatus.VALIDATED,
      status: pharmacy.status,
      operatingHours: pharmacy.operatingHours,
      reviewCount: pharmacy._count?.reviews || 0,
      createdAt: pharmacy.createdAt,
      updatedAt: pharmacy.updatedAt,
    };
  }
}

export const pharmacyRepository = new PharmacyRepository();
