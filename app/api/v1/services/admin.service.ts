/**
 * AdminService
 * Gère les workflows d'administration avec PostgreSQL
 * Simplifié selon le cahier des charges
 */

import bcrypt from 'bcrypt';
import { ApiError, ErrorCode } from '@/types/api';
import { PharmacyStatus } from '@prisma/client';
import { logger } from '@/lib/logger';
import { prisma } from '@/lib/prisma';
import { pharmacyRepository } from '../repositories/pharmacy.repository';

interface AdminStats {
  totalPharmacies: number;
  activePharmacies: number;
  pendingValidations: number;
  suspendedPharmacies: number;
}

interface PharmacyValidation {
  pharmacyId: string;
  status: PharmacyStatus;
  adminId: string;
  internalComment?: string;
}

export class AdminService {
  /**
   * Valider une pharmacie
   */
  async validatePharmacy(
    pharmacyId: string,
    adminId: string,
    internalComment?: string,
  ): Promise<{ success: boolean; message: string }> {
    logger.info(`Validating pharmacy: ${pharmacyId} by admin: ${adminId}`);

    // Vérifier que l'admin existe
    const admin = await prisma.admin.findUnique({ where: { id: adminId } });
    if (!admin) {
      throw new ApiError(ErrorCode.NOT_FOUND, 'Admin not found');
    }

    // Mettre à jour le statut de la pharmacie
    const pharmacy = await pharmacyRepository.updateStatus(pharmacyId, PharmacyStatus.VALIDATED);
    if (!pharmacy) {
      throw new ApiError(ErrorCode.NOT_FOUND, 'Pharmacy not found');
    }

    logger.info(`Pharmacy ${pharmacyId} validated successfully`);
    return { success: true, message: 'Pharmacy validated' };
  }

  /**
   * Rejeter une pharmacie
   */
  async rejectPharmacy(
    pharmacyId: string,
    adminId: string,
    reason: string,
  ): Promise<{ success: boolean; message: string }> {
    logger.info(`Rejecting pharmacy: ${pharmacyId} by admin: ${adminId}`);

    const admin = await prisma.admin.findUnique({ where: { id: adminId } });
    if (!admin) {
      throw new ApiError(ErrorCode.NOT_FOUND, 'Admin not found');
    }

    const pharmacy = await pharmacyRepository.updateStatus(pharmacyId, PharmacyStatus.REJECTED);
    if (!pharmacy) {
      throw new ApiError(ErrorCode.NOT_FOUND, 'Pharmacy not found');
    }

    logger.info(`Pharmacy ${pharmacyId} rejected`);
    return { success: true, message: 'Pharmacy rejected' };
  }

  /**
   * Suspendre une pharmacie
   */
  async suspendPharmacy(
    pharmacyId: string,
    adminId: string,
    reason: string,
  ): Promise<{ success: boolean; message: string }> {
    logger.warn(`Suspending pharmacy: ${pharmacyId} by admin: ${adminId}`);

    const admin = await prisma.admin.findUnique({ where: { id: adminId } });
    if (!admin) {
      throw new ApiError(ErrorCode.NOT_FOUND, 'Admin not found');
    }

    const pharmacy = await pharmacyRepository.updateStatus(pharmacyId, PharmacyStatus.SUSPENDED);
    if (!pharmacy) {
      throw new ApiError(ErrorCode.NOT_FOUND, 'Pharmacy not found');
    }

    logger.warn(`Pharmacy ${pharmacyId} suspended`);
    return { success: true, message: 'Pharmacy suspended' };
  }

  /**
   * Réactiver une pharmacie
   */
  async reactivatePharmacy(
    pharmacyId: string,
    adminId: string,
    comment?: string,
  ): Promise<{ success: boolean; message: string }> {
    logger.info(`Reactivating pharmacy: ${pharmacyId} by admin: ${adminId}`);

    const admin = await prisma.admin.findUnique({ where: { id: adminId } });
    if (!admin) {
      throw new ApiError(ErrorCode.NOT_FOUND, 'Admin not found');
    }

    const pharmacy = await pharmacyRepository.updateStatus(pharmacyId, PharmacyStatus.VALIDATED);
    if (!pharmacy) {
      throw new ApiError(ErrorCode.NOT_FOUND, 'Pharmacy not found');
    }

    logger.info(`Pharmacy ${pharmacyId} reactivated`);
    return { success: true, message: 'Pharmacy reactivated' };
  }

  /**
   * Créer une pharmacie (flow admin-controlled)
   */
  async createPharmacy(
    pharmacyData: {
      name: string;
      email: string;
      password: string;
      address: {
        street: string;
        city: string;
        zipCode: string;
        country: string;
      };
      location: {
        latitude: number;
        longitude: number;
      };
      phone: string;
    },
    adminId: string,
  ): Promise<{ success: boolean; message: string; pharmacyId?: string }> {
    logger.info(`Creating pharmacy: ${pharmacyData.email} by admin: ${adminId}`);

    const admin = await prisma.admin.findUnique({ where: { id: adminId } });
    if (!admin) {
      throw new ApiError(ErrorCode.NOT_FOUND, 'Admin not found');
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(pharmacyData.password, 10);

    // Créer la pharmacie
    const pharmacy = await pharmacyRepository.create({
      ...pharmacyData,
      password: hashedPassword,
    });

    logger.info(`Pharmacy ${pharmacy.id} created successfully`);
    return { 
      success: true, 
      message: 'Pharmacy created and pending validation', 
      pharmacyId: pharmacy.id 
    };
  }

  /**
   * Récupérer les pharmacies en attente de validation
   */
  async getPendingPharmacies(): Promise<any[]> {
    logger.debug('Fetching pending pharmacies');
    return pharmacyRepository.findPending();
  }

  /**
   * Récupérer toutes les pharmacies
   */
  async getAllPharmacies(): Promise<any[]> {
    logger.debug('Fetching all pharmacies');
    return pharmacyRepository.findAll();
  }

  /**
   * Récupérer les statistiques admin
   */
  async getAdminStats(): Promise<AdminStats> {
    logger.debug('Fetching admin statistics');

    const [total, validated, pending, suspended] = await Promise.all([
      prisma.pharmacy.count(),
      prisma.pharmacy.count({ where: { status: PharmacyStatus.VALIDATED } }),
      prisma.pharmacy.count({ where: { status: PharmacyStatus.PENDING } }),
      prisma.pharmacy.count({ where: { status: PharmacyStatus.SUSPENDED } }),
    ]);

    return {
      totalPharmacies: total,
      activePharmacies: validated,
      pendingValidations: pending,
      suspendedPharmacies: suspended,
    };
  }

  /**
   * Créer un admin (pour le premier admin ou création par super admin)
   */
  async createAdmin(
    adminData: {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
    },
    createdByAdminId?: string,
  ): Promise<{ success: boolean; message: string; adminId?: string }> {
    logger.info(`Creating admin: ${adminData.email}`);

    // Si createdByAdminId est fourni, vérifier que c'est un admin existant
    if (createdByAdminId) {
      const creator = await prisma.admin.findUnique({ where: { id: createdByAdminId } });
      if (!creator) {
        throw new ApiError(ErrorCode.NOT_FOUND, 'Admin not found');
      }
    }

    // Vérifier que l'email n'existe pas
    const existing = await prisma.admin.findUnique({ 
      where: { email: adminData.email.toLowerCase() } 
    });
    if (existing) {
      throw new ApiError(ErrorCode.CONFLICT, 'Admin email already exists');
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(adminData.password, 10);

    // Créer l'admin
    const admin = await prisma.admin.create({
      data: {
        email: adminData.email.toLowerCase(),
        password: hashedPassword,
        firstName: adminData.firstName,
        lastName: adminData.lastName,
      },
    });

    logger.info(`Admin ${admin.id} created successfully`);
    return { 
      success: true, 
      message: 'Admin created', 
      adminId: admin.id 
    };
  }
}

export const adminService = new AdminService();
