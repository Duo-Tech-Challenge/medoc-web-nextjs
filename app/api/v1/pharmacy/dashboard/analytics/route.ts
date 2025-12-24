/**
 * GET /api/v1/pharmacy/dashboard/analytics
 * Récupérer les analytics de la pharmacie
 */

import { NextRequest, NextResponse } from 'next/server';
import { getPharmacyAnalytics } from '@/app/api/v1/controllers/pharmacy-dashboard.controller';

export async function GET(request: NextRequest): Promise<NextResponse> {
  return getPharmacyAnalytics(request);
}
