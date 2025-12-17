/**
 * Search Controller
 * Gère les endpoints de recherche
 */

import { NextRequest, NextResponse } from 'next/server';
import { searchService } from '@/app/api/v1/services/search.service';
import { createSuccessResponse, handleErrorResponse } from '@/lib/api-response';
import { ApiError, ErrorCode } from '@/types/api';
import { logger } from '@/lib/logger';

export class SearchController {
  /**
   * GET /api/v1/search?medication=...
   * Recherche inversée: médicament → pharmacies
   */
  async search(request: NextRequest): Promise<NextResponse> {
    try {
      const url = new URL(request.url);
      const medicationName = url.searchParams.get('medication');

      if (!medicationName) {
        throw new ApiError(
          ErrorCode.BAD_REQUEST,
          'medication parameter is required'
        );
      }

      logger.info('Search request', { medicationName });

      const result = await searchService.searchMedicationInPharmacies(medicationName);
      const response = createSuccessResponse(result, 'Search results', 200);

      return NextResponse.json(response, { status: 200 });
    } catch (error) {
      const errorResponse = handleErrorResponse(error);
      return NextResponse.json(errorResponse, { status: errorResponse.code });
    }
  }

  /**
   * GET /api/v1/search/pharmacy/:id
   * Récupère les infos publiques d'une pharmacie
   */
  async getPharmacyPublic(
    _request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
  ): Promise<NextResponse> {
    try {
      const { id } = await params;
      logger.info('Fetch pharmacy public', { pharmacyId: id });

      const result = await searchService.getPharmacyPublic(id);
      const response = createSuccessResponse(result, 'Pharmacy information', 200);

      return NextResponse.json(response, { status: 200 });
    } catch (error) {
      const errorResponse = handleErrorResponse(error);
      return NextResponse.json(errorResponse, { status: errorResponse.code });
    }
  }
}

export const searchController = new SearchController();
