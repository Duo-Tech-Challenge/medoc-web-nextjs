/**
 * GET /api/v1/admin/pharmacy/[id]/validation-details
 * Récupérer les détails de validation d'une pharmacie
 */

import { NextRequest, NextResponse } from 'next/server';
import { getPharmacyValidationDetails } from '@/app/api/v1/controllers/admin.controller';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  return getPharmacyValidationDetails(request, { params });
}
