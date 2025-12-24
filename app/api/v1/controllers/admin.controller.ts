/**
 * AdminController
 * Gère les endpoints pour les workflows d'administration
 * - Validation des pharmacies
 * - Suspension/réactivation
 * - Gestion des admins
 * - Dashboard admin
 *
 * Routes protégées: AdminRole.ADMIN ou AdminRole.SUPER_ADMIN
 */

import { NextRequest, NextResponse } from 'next/server';
import AdminService from '../services/admin.service';
import { createSuccessResponse, createErrorResponse } from '@/lib/api-response';
import { logger } from '@/lib/logger';
import {
  SuspensionRequestDTO,
  ReactivationRequestDTO,
  CreateAdminDTO,
} from '@/types/admin';

/**
 * POST /api/v1/admin/validate
 * Valider une pharmacie après review
 *
 * Body:
 * {
 *   "pharmacyId": "pharm-001",
 *   "internalComment": "Tous les documents vérifiés"
 * }
 *
 * Réponse:
 * {
 *   "status": "success",
 *   "data": { ValidationReviewDTO }
 * }
 */
export async function validatePharmacy(_request: NextRequest): Promise<NextResponse> {
  try {
    const body = await _request.json();
    const { pharmacyId, internalComment } = body;

    // TODO: Extraire adminId depuis le JWT token
    const adminId = 'admin-001';

    if (!pharmacyId || !internalComment) {
      return createErrorResponse(
        'Missing required fields: pharmacyId, internalComment',
        'VALIDATION_ERROR',
        400,
      );
    }

    const review = AdminService.validatePharmacy(pharmacyId, adminId, internalComment);

    logger.info(`[AdminController] Pharmacy ${pharmacyId} validated`);
    return createSuccessResponse(review, 'Pharmacy validated successfully', 200);
  } catch (error: unknown) {
    logger.error('[AdminController] Error validating pharmacy:', error);
    return createErrorResponse(
      error instanceof Error ? error.message : 'Internal server error',
      'INTERNAL_ERROR',
      500,
    );
  }
}

/**
 * POST /api/v1/admin/reject
 * Rejeter une demande de pharmacie
 *
 * Body:
 * {
 *   "pharmacyId": "pharm-001",
 *   "reason": "Documents incomplets"
 * }
 */
export async function rejectPharmacy(_request: NextRequest): Promise<NextResponse> {
  try {
    const body = await _request.json();
    const { pharmacyId, reason } = body;
    const adminId = 'admin-001';

    if (!pharmacyId || !reason) {
      return createErrorResponse(
        'Missing required fields: pharmacyId, reason',
        'VALIDATION_ERROR',
        400,
      );
    }

    const review = AdminService.rejectPharmacy(pharmacyId, adminId, reason);

    logger.info(`[AdminController] Pharmacy ${pharmacyId} rejected`);
    return createSuccessResponse(review, 'Pharmacy rejected', 200);
  } catch (error: unknown) {
    logger.error('[AdminController] Error rejecting pharmacy:', error);
    return createErrorResponse(
      error instanceof Error ? error.message : 'Internal server error',
      'INTERNAL_ERROR',
      500,
    );
  }
}

/**
 * POST /api/v1/admin/suspend
 * Suspendre une pharmacie
 *
 * Body:
 * {
 *   "pharmacyId": "pharm-001",
 *   "reason": "VIOLATION",
 *   "comment": "Données de disponibilité manipulées",
 *   "immediate": true
 * }
 */
export async function suspendPharmacy(_request: NextRequest): Promise<NextResponse> {
  try {
    const body = await _request.json() as SuspensionRequestDTO;
    const adminId = 'admin-001';

    if (!body.pharmacyId || !body.reason || !body.comment) {
      return createErrorResponse(
        'Missing required fields: pharmacyId, reason, comment',
        'VALIDATION_ERROR',
        400,
      );
    }

    const record = AdminService.suspendPharmacy(body, adminId);

    logger.warn(`[AdminController] Pharmacy ${body.pharmacyId} suspended`);
    return createSuccessResponse(record, 'Pharmacy suspended', 200);
  } catch (error: unknown) {
    logger.error('[AdminController] Error suspending pharmacy:', error);
    return createErrorResponse(
      error instanceof Error ? error.message : 'Internal server error',
      'INTERNAL_ERROR',
      500,
    );
  }
}

/**
 * POST /api/v1/admin/reactivate
 * Réactiver une pharmacie suspendue
 *
 * Body:
 * {
 *   "pharmacyId": "pharm-001",
 *   "adminComment": "Violations corrigées, réactivation approuvée",
 *   "requiredActions": ["Submit updated documents"]
 * }
 */
export async function reactivatePharmacy(_request: NextRequest): Promise<NextResponse> {
  try {
    const body = await _request.json() as ReactivationRequestDTO;
    const adminId = 'admin-001';

    if (!body.pharmacyId || !body.adminComment) {
      return createErrorResponse(
        'Missing required fields: pharmacyId, adminComment',
        'VALIDATION_ERROR',
        400,
      );
    }

    const record = AdminService.reactivatePharmacy(body, adminId);

    logger.info(`[AdminController] Pharmacy ${body.pharmacyId} reactivated`);
    return createSuccessResponse(record, 'Pharmacy reactivated', 200);
  } catch (error: unknown) {
    logger.error('[AdminController] Error reactivating pharmacy:', error);
    return createErrorResponse(
      error instanceof Error ? error.message : 'Internal server error',
      'INTERNAL_ERROR',
      500,
    );
  }
}

/**
 * GET /api/v1/admin/pharmacy/:id/audit
 * Récupérer l'historique d'audit d'une pharmacie
 */
export async function getPharmacyAuditTrail(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  try {
    const { id: pharmacyId } = await params;

    const auditTrail = AdminService.getPharmacyAuditTrail(pharmacyId);

    logger.debug(`[AdminController] Fetched audit trail for pharmacy ${pharmacyId}`);
    return createSuccessResponse(auditTrail, 'Audit trail retrieved', 200);
  } catch (error: unknown) {
    logger.error('[AdminController] Error fetching audit trail:', error);
    return createErrorResponse(
      error instanceof Error ? error.message : 'Internal server error',
      'INTERNAL_ERROR',
      500,
    );
  }
}

/**
 * GET /api/v1/admin/pharmacy/:id/validation-details
 * Récupérer les détails de validation d'une pharmacie
 */
export async function getPharmacyValidationDetails(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  try {
    const { id: pharmacyId } = await params;

    const details = AdminService.getPharmacyValidationDetails(pharmacyId);

    logger.debug(`[AdminController] Fetched validation details for pharmacy ${pharmacyId}`);
    return createSuccessResponse(details, 'Validation details retrieved', 200);
  } catch (error: unknown) {
    logger.error('[AdminController] Error fetching validation details:', error);
    return createErrorResponse(
      error instanceof Error ? error.message : 'Internal server error',
      'INTERNAL_ERROR',
      500,
    );
  }
}

/**
 * POST /api/v1/admin/create-admin
 * Créer un nouvel admin (SUPER_ADMIN uniquement)
 *
 * Body:
 * {
 *   "email": "newadmin@medoc.fr",
 *   "password": "SecurePassword123!",
 *   "firstName": "Jean",
 *   "lastName": "Dupont",
 *   "role": "ADMIN"
 * }
 */
export async function createAdmin(_request: NextRequest): Promise<NextResponse> {
  try {
    const body = await _request.json() as CreateAdminDTO;
    const createdByAdminId = 'admin-001'; // TODO: Extraire du JWT

    if (!body.email || !body.password || !body.firstName || !body.lastName || !body.role) {
      return createErrorResponse(
        'Missing required fields: email, password, firstName, lastName, role',
        'VALIDATION_ERROR',
        400,
      );
    }

    const newAdmin = AdminService.createAdmin(body, createdByAdminId);

    logger.info(`[AdminController] New admin created: ${newAdmin.id}`);
    return createSuccessResponse(newAdmin, 'Admin created successfully', 201);
  } catch (error: unknown) {
    logger.error('[AdminController] Error creating admin:', error);
    return createErrorResponse(
      error instanceof Error ? error.message : 'Internal server error',
      'INTERNAL_ERROR',
      500,
    );
  }
}

/**
 * GET /api/v1/admin/stats
 * Récupérer les statistiques du dashboard admin
 */
export async function getAdminStats(_request: NextRequest): Promise<NextResponse> {
  try {
    const stats = AdminService.getAdminStats();

    logger.debug('[AdminController] Fetched admin dashboard statistics');
    return createSuccessResponse(stats, 'Admin statistics retrieved', 200);
  } catch (error: unknown) {
    logger.error('[AdminController] Error fetching admin statistics:', error);
    return createErrorResponse(
      error instanceof Error ? error.message : 'Internal server error',
      'INTERNAL_ERROR',
      500,
    );
  }
}

/**
 * GET /api/v1/admin/all-admins
 * Récupérer la liste de tous les admins
 * (SUPER_ADMIN uniquement)
 */
export async function getAllAdmins(_request: NextRequest): Promise<NextResponse> {
  try {
    const admins = AdminService.getAllAdmins();

    logger.debug('[AdminController] Fetched all admins');
    return createSuccessResponse(admins, 'All admins retrieved', 200);
  } catch (error: unknown) {
    logger.error('[AdminController] Error fetching admins:', error);
    return createErrorResponse(
      error instanceof Error ? error.message : 'Internal server error',
      'INTERNAL_ERROR',
      500,
    );
  }
}

/**
 * POST /api/v1/admin/deactivate-admin
 * Désactiver un admin (SUPER_ADMIN uniquement)
 *
 * Body:
 * {
 *   "adminId": "admin-002"
 * }
 */
export async function deactivateAdmin(_request: NextRequest): Promise<NextResponse> {
  try {
    const body = await _request.json();
    const { adminId } = body;
    const deactivatedByAdminId = 'admin-001'; // TODO: Extraire du JWT

    if (!adminId) {
      return createErrorResponse('Missing required field: adminId', 'VALIDATION_ERROR', 400);
    }

    const admin = AdminService.deactivateAdmin(adminId, deactivatedByAdminId);

    logger.warn(`[AdminController] Admin ${adminId} deactivated`);
    return createSuccessResponse(admin, 'Admin deactivated successfully', 200);
  } catch (error: unknown) {
    logger.error('[AdminController] Error deactivating admin:', error);
    return createErrorResponse(
      error instanceof Error ? error.message : 'Internal server error',
      'INTERNAL_ERROR',
      500,
    );
  }
}
