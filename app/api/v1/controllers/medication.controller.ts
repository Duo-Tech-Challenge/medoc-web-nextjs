/**
 * Medication Controller
 * Gère les endpoints CRUD médicaments (admin)
 */

import { NextRequest, NextResponse } from 'next/server';
import { medicationService } from '@/app/api/v1/services/medication.service';
import { createSuccessResponse, handleErrorResponse } from '@/lib/api-response';
import type { CreateMedicationDTO, UpdateMedicationDTO } from '@/types/medication';
import { ApiError, ErrorCode } from '@/types/api';
import { logger } from '@/lib/logger';

export class MedicationController {
  /**
   * POST /api/v1/medications
   */
  async create(request: NextRequest): Promise<NextResponse> {
    try {
      const body = await request.json() as CreateMedicationDTO;

      // Validation basique
      if (!body.name || !body.genericName || !body.dosage) {
        throw new ApiError(ErrorCode.BAD_REQUEST, 'Missing required fields');
      }

      logger.info('Create medication', { name: body.name });

      const result = await medicationService.createMedication(body);
      const response = createSuccessResponse(result, 'Medication created successfully', 201);

      return NextResponse.json(response, { status: 201 });
    } catch (error) {
      const errorResponse = handleErrorResponse(error);
      return NextResponse.json(errorResponse, { status: errorResponse.code });
    }
  }

  /**
   * GET /api/v1/medications
   */
  async getAll(): Promise<NextResponse> {
    try {
      logger.info('Fetch all medications');

      const result = await medicationService.getAllMedications();
      const response = createSuccessResponse(result, 'Medications retrieved successfully', 200);

      return NextResponse.json(response, { status: 200 });
    } catch (error) {
      const errorResponse = handleErrorResponse(error);
      return NextResponse.json(errorResponse, { status: errorResponse.code });
    }
  }

  /**
   * GET /api/v1/medications/:id
   */
  async getById(
    _request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
  ): Promise<NextResponse> {
    try {
      const { id } = await params;
      logger.info('Fetch medication', { id });

      const result = await medicationService.getMedicationById(id);
      const response = createSuccessResponse(result, 'Medication retrieved successfully', 200);

      return NextResponse.json(response, { status: 200 });
    } catch (error) {
      const errorResponse = handleErrorResponse(error);
      return NextResponse.json(errorResponse, { status: errorResponse.code });
    }
  }

  /**
   * PUT /api/v1/medications/:id
   */
  async update(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
  ): Promise<NextResponse> {
    try {
      const { id } = await params;
      const body = await request.json() as UpdateMedicationDTO;

      logger.info('Update medication', { id });

      const result = await medicationService.updateMedication(id, body);
      const response = createSuccessResponse(result, 'Medication updated successfully', 200);

      return NextResponse.json(response, { status: 200 });
    } catch (error) {
      const errorResponse = handleErrorResponse(error);
      return NextResponse.json(errorResponse, { status: errorResponse.code });
    }
  }

  /**
   * DELETE /api/v1/medications/:id
   */
  async delete(
    _request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
  ): Promise<NextResponse> {
    try {
      const { id } = await params;
      logger.info('Delete medication', { id });

      await medicationService.deleteMedication(id);
      const response = createSuccessResponse(null, 'Medication deleted successfully', 200);

      return NextResponse.json(response, { status: 200 });
    } catch (error) {
      const errorResponse = handleErrorResponse(error);
      return NextResponse.json(errorResponse, { status: errorResponse.code });
    }
  }
}

export const medicationController = new MedicationController();
