/**
 * Pharmacy Controller
 * Gère les endpoints CRUD pharmacies (admin) et infos publiques
 */

import { NextRequest, NextResponse } from 'next/server';
import { pharmacyService } from '@/app/api/v1/services/index';
import { createSuccessResponse, handleErrorResponse } from '@/lib/api-response';
import type { CreatePharmacyDTO, UpdatePharmacyDTO } from '@/types/pharmacy';
import { ApiError, ErrorCode } from '@/types/api';
import { logger } from '@/lib/logger';

export class PharmacyController {
  /**
   * POST /api/v1/pharmacies (admin only)
   */
  async create(request: NextRequest): Promise<NextResponse> {
    try {
      const body = await request.json() as CreatePharmacyDTO;

      if (!body.name || !body.email) {
        throw new ApiError(ErrorCode.BAD_REQUEST, 'Missing required fields');
      }

      logger.info('Create pharmacy', { name: body.name, email: body.email });

      const result = await pharmacyService.createPharmacy(body);
      const response = createSuccessResponse(result, 'Pharmacy created successfully', 201);

      return NextResponse.json(response, { status: 201 });
    } catch (error) {
      const errorResponse = handleErrorResponse(error);
      return NextResponse.json(errorResponse, { status: errorResponse.code });
    }
  }

  /**
   * GET /api/v1/pharmacies (admin: all, public: validated only)
   */
  async getAll(): Promise<NextResponse> {
    try {
      logger.info('Fetch all pharmacies');

      // TODO: Vérifier le rôle
      // Pour maintenant, retourner uniquement validées (public view)
      const result = await pharmacyService.getValidatedPharmacies();
      const response = createSuccessResponse(result, 'Pharmacies retrieved successfully', 200);

      return NextResponse.json(response, { status: 200 });
    } catch (error) {
      const errorResponse = handleErrorResponse(error);
      return NextResponse.json(errorResponse, { status: errorResponse.code });
    }
  }

  /**
   * GET /api/v1/pharmacies/:id (public)
   */
  async getById(
    _request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
  ): Promise<NextResponse> {
    try {
      const { id } = await params;
      logger.info('Fetch pharmacy', { id });

      const result = await pharmacyService.getPharmacyPublic(id);
      const response = createSuccessResponse(result, 'Pharmacy retrieved successfully', 200);

      return NextResponse.json(response, { status: 200 });
    } catch (error) {
      const errorResponse = handleErrorResponse(error);
      return NextResponse.json(errorResponse, { status: errorResponse.code });
    }
  }

  /**
   * PUT /api/v1/pharmacies/:id (admin or self)
   */
  async update(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
  ): Promise<NextResponse> {
    try {
      const { id } = await params;
      const body = await request.json() as UpdatePharmacyDTO;

      logger.info('Update pharmacy', { id });

      const result = await pharmacyService.updatePharmacy(id, body);
      const response = createSuccessResponse(result, 'Pharmacy updated successfully', 200);

      return NextResponse.json(response, { status: 200 });
    } catch (error) {
      const errorResponse = handleErrorResponse(error);
      return NextResponse.json(errorResponse, { status: errorResponse.code });
    }
  }

  /**
   * DELETE /api/v1/pharmacies/:id (admin only)
   */
  async delete(
    _request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
  ): Promise<NextResponse> {
    try {
      const { id } = await params;
      logger.info('Delete pharmacy', { id });

      await pharmacyService.deletePharmacy(id);
      const response = createSuccessResponse(null, 'Pharmacy deleted successfully', 200);

      return NextResponse.json(response, { status: 200 });
    } catch (error) {
      const errorResponse = handleErrorResponse(error);
      return NextResponse.json(errorResponse, { status: errorResponse.code });
    }
  }

  /**
   * POST /api/v1/pharmacies/:id/validate (admin only)
   */
  async validate(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
  ): Promise<NextResponse> {
    try {
      const { id } = await params;
      const body = await request.json() as { isValidated: boolean };

      logger.info('Validate pharmacy', { id, isValidated: body.isValidated });

      const result = await pharmacyService.validatePharmacy(id, body.isValidated);
      const response = createSuccessResponse(result, 'Pharmacy validated successfully', 200);

      return NextResponse.json(response, { status: 200 });
    } catch (error) {
      const errorResponse = handleErrorResponse(error);
      return NextResponse.json(errorResponse, { status: errorResponse.code });
    }
  }
}

export const pharmacyController = new PharmacyController();
