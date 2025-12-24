/**
 * PharmacyDashboardController
 * Gère les endpoints pour le dashboard interne des pharmacies
 * - Profil pharmacie
 * - Gestion médicaments
 * - Disponibilités
 * - Analytics
 *
 * Routes protégées: Pharmacy role uniquement
 */

import { NextRequest, NextResponse } from 'next/server';
import PharmacyDashboardService from '../services/pharmacy-dashboard.service';
import { createSuccessResponse, createErrorResponse } from '@/lib/api-response';
import { logger } from '@/lib/logger';
import {
  UpdatePharmacyProfileRequestDTO,
  UpdateAvailabilityRequestDTO,
} from '@/types/pharmacy-dashboard';

/**
 * GET /api/v1/pharmacy/dashboard/profile
 * Récupérer le profil interne de la pharmacie
 */
export async function getPharmacyProfile(_request: NextRequest): Promise<NextResponse> {
  try {
    // TODO: Extraire pharmacyId depuis le JWT token
    const pharmacyId = 'pharm-001';

    const profile = PharmacyDashboardService.getPharmacyProfile(pharmacyId);

    logger.debug(`[PharmacyDashboard] Profile fetched for pharmacy: ${pharmacyId}`);
    return createSuccessResponse(profile, 'Profile retrieved successfully', 200);
  } catch (error: unknown) {
    logger.error('[PharmacyDashboard] Error fetching profile:', error);
    return createErrorResponse(
      error instanceof Error ? error.message : 'Internal server error',
      'INTERNAL_ERROR',
      500,
    );
  }
}

/**
 * PUT /api/v1/pharmacy/dashboard/profile
 * Mettre à jour le profil interne de la pharmacie
 */
export async function updatePharmacyProfile(_request: NextRequest): Promise<NextResponse> {
  try {
    const body = await _request.json() as UpdatePharmacyProfileRequestDTO;
    const pharmacyId = 'pharm-001'; // TODO: Extraire du JWT

    const profile = PharmacyDashboardService.updatePharmacyProfile(pharmacyId, body);

    logger.info(`[PharmacyDashboard] Profile updated for pharmacy: ${pharmacyId}`);
    return createSuccessResponse(profile, 'Profile updated successfully', 200);
  } catch (error: unknown) {
    logger.error('[PharmacyDashboard] Error updating profile:', error);
    return createErrorResponse(
      error instanceof Error ? error.message : 'Internal server error',
      'INTERNAL_ERROR',
      500,
    );
  }
}

/**
 * GET /api/v1/pharmacy/dashboard/medications
 * Récupérer la liste des médicaments gérés par la pharmacie
 */
export async function getPharmacyMedications(_request: NextRequest): Promise<NextResponse> {
  try {
    const pharmacyId = 'pharm-001'; // TODO: Extraire du JWT

    const medications = PharmacyDashboardService.getPharmacyMedications(pharmacyId);

    logger.debug(`[PharmacyDashboard] Medications fetched for pharmacy: ${pharmacyId}`);
    return createSuccessResponse(medications, 'Medications retrieved successfully', 200);
  } catch (error: unknown) {
    logger.error('[PharmacyDashboard] Error fetching medications:', error);
    return createErrorResponse(
      error instanceof Error ? error.message : 'Internal server error',
      'INTERNAL_ERROR',
      500,
    );
  }
}

/**
 * PUT /api/v1/pharmacy/dashboard/medications/availability
 * Mettre à jour la disponibilité d'un médicament
 *
 * Body:
 * {
 *   "medicationId": "med-001",
 *   "isAvailable": false,
 *   "reason": "Stock épuisé"
 * }
 */
export async function updateMedicationAvailability(_request: NextRequest): Promise<NextResponse> {
  try {
    const body = await _request.json() as UpdateAvailabilityRequestDTO;
    const pharmacyId = 'pharm-001'; // TODO: Extraire du JWT

    if (!body.medicationId) {
      return createErrorResponse('Missing required field: medicationId', 'VALIDATION_ERROR', 400);
    }

    const medication = PharmacyDashboardService.updateMedicationAvailability(
      pharmacyId,
      body,
    );

    logger.info(`[PharmacyDashboard] Availability updated for medication: ${body.medicationId}`);
    return createSuccessResponse(medication, 'Availability updated successfully', 200);
  } catch (error: unknown) {
    logger.error('[PharmacyDashboard] Error updating availability:', error);
    return createErrorResponse(
      error instanceof Error ? error.message : 'Internal server error',
      'INTERNAL_ERROR',
      500,
    );
  }
}

/**
 * GET /api/v1/pharmacy/dashboard/availability-history
 * Récupérer l'historique des changements de disponibilité
 */
export async function getAvailabilityHistory(_request: NextRequest): Promise<NextResponse> {
  try {
    const pharmacyId = 'pharm-001'; // TODO: Extraire du JWT

    const history = PharmacyDashboardService.getAvailabilityHistory(pharmacyId);

    logger.debug(`[PharmacyDashboard] Availability history fetched for pharmacy: ${pharmacyId}`);
    return createSuccessResponse(history, 'History retrieved successfully', 200);
  } catch (error: unknown) {
    logger.error('[PharmacyDashboard] Error fetching history:', error);
    return createErrorResponse(
      error instanceof Error ? error.message : 'Internal server error',
      'INTERNAL_ERROR',
      500,
    );
  }
}

/**
 * POST /api/v1/pharmacy/dashboard/temporary-unavailability
 * Créer une indisponibilité temporaire
 *
 * Body:
 * {
 *   "medicationId": "med-001",
 *   "medicationName": "Aspirin 500mg",
 *   "expectedReturnDate": "2025-12-24T00:00:00Z",
 *   "reason": "Rupture stock, réapprovisionnement prévu"
 * }
 */
export async function createTemporaryUnavailability(_request: NextRequest): Promise<NextResponse> {
  try {
    const body = await _request.json();
    const { medicationId, medicationName, expectedReturnDate, reason } = body;
    const pharmacyId = 'pharm-001'; // TODO: Extraire du JWT

    if (!medicationId || !medicationName || !expectedReturnDate || !reason) {
      return createErrorResponse(
        'Missing required fields: medicationId, medicationName, expectedReturnDate, reason',
        'VALIDATION_ERROR',
        400,
      );
    }

    const unavailability = PharmacyDashboardService.createTemporaryUnavailability(
      pharmacyId,
      medicationId,
      medicationName,
      new Date(expectedReturnDate),
      reason,
    );

    logger.info(`[PharmacyDashboard] Temporary unavailability created for ${medicationId}`);
    return createSuccessResponse(unavailability, 'Unavailability created successfully', 201);
  } catch (error: unknown) {
    logger.error('[PharmacyDashboard] Error creating unavailability:', error);
    return createErrorResponse(
      error instanceof Error ? error.message : 'Internal server error',
      'INTERNAL_ERROR',
      500,
    );
  }
}

/**
 * PUT /api/v1/pharmacy/dashboard/temporary-unavailability/:id/resolve
 * Résoudre une indisponibilité temporaire
 */
export async function resolveTemporaryUnavailability(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  try {
    const { id: unavailabilityId } = await params;
    const pharmacyId = 'pharm-001'; // TODO: Extraire du JWT

    const unavailability = PharmacyDashboardService.resolveTemporaryUnavailability(
      pharmacyId,
      unavailabilityId,
    );

    logger.info(`[PharmacyDashboard] Unavailability resolved: ${unavailabilityId}`);
    return createSuccessResponse(unavailability, 'Unavailability resolved successfully', 200);
  } catch (error: unknown) {
    logger.error('[PharmacyDashboard] Error resolving unavailability:', error);
    return createErrorResponse(
      error instanceof Error ? error.message : 'Internal server error',
      'INTERNAL_ERROR',
      500,
    );
  }
}

/**
 * GET /api/v1/pharmacy/dashboard/analytics
 * Récupérer les analytics de la pharmacie
 *
 * Query params:
 * - period: nombre de jours (default: 30)
 */
export async function getPharmacyAnalytics(_request: NextRequest): Promise<NextResponse> {
  try {
    const pharmacyId = 'pharm-001'; // TODO: Extraire du JWT
    const { searchParams } = new URL(_request.url);
    const periodDays = parseInt(searchParams.get('period') || '30');

    const analytics = PharmacyDashboardService.getPharmacyAnalytics(pharmacyId, periodDays);

    logger.debug(`[PharmacyDashboard] Analytics fetched for pharmacy: ${pharmacyId}`);
    return createSuccessResponse(analytics, 'Analytics retrieved successfully', 200);
  } catch (error: unknown) {
    logger.error('[PharmacyDashboard] Error fetching analytics:', error);
    return createErrorResponse(
      error instanceof Error ? error.message : 'Internal server error',
      'INTERNAL_ERROR',
      500,
    );
  }
}

/**
 * GET /api/v1/pharmacy/dashboard/settings
 * Récupérer les settings de la pharmacie
 */
export async function getPharmacySettings(_request: NextRequest): Promise<NextResponse> {
  try {
    const pharmacyId = 'pharm-001'; // TODO: Extraire du JWT

    const settings = PharmacyDashboardService.getPharmacySettings(pharmacyId);

    logger.debug(`[PharmacyDashboard] Settings fetched for pharmacy: ${pharmacyId}`);
    return createSuccessResponse(settings, 'Settings retrieved successfully', 200);
  } catch (error: unknown) {
    logger.error('[PharmacyDashboard] Error fetching settings:', error);
    return createErrorResponse(
      error instanceof Error ? error.message : 'Internal server error',
      'INTERNAL_ERROR',
      500,
    );
  }
}

/**
 * PUT /api/v1/pharmacy/dashboard/settings
 * Mettre à jour les settings de la pharmacie
 */
export async function updatePharmacySettings(_request: NextRequest): Promise<NextResponse> {
  try {
    const body = await _request.json();
    const pharmacyId = 'pharm-001'; // TODO: Extraire du JWT

    const settings = PharmacyDashboardService.updatePharmacySettings(pharmacyId, body);

    logger.info(`[PharmacyDashboard] Settings updated for pharmacy: ${pharmacyId}`);
    return createSuccessResponse(settings, 'Settings updated successfully', 200);
  } catch (error: unknown) {
    logger.error('[PharmacyDashboard] Error updating settings:', error);
    return createErrorResponse(
      error instanceof Error ? error.message : 'Internal server error',
      'INTERNAL_ERROR',
      500,
    );
  }
}
