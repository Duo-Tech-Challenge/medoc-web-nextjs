/**
 * GET /api/v1/pharmacy/dashboard/medications
 * Récupérer les médicaments gérés par la pharmacie
 */

import { NextRequest, NextResponse } from 'next/server';
import { getPharmacyMedications } from '@/app/api/v1/controllers/pharmacy-dashboard.controller';

export async function GET(request: NextRequest): Promise<NextResponse> {
  return getPharmacyMedications(request);
}
