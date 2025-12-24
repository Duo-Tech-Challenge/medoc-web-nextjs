/**
 * GET /api/v1/pharmacy/dashboard/availability-history
 * Récupérer l'historique des changements de disponibilité
 */

import { NextRequest, NextResponse } from 'next/server';
import { getAvailabilityHistory } from '@/app/api/v1/controllers/pharmacy-dashboard.controller';

export async function GET(request: NextRequest): Promise<NextResponse> {
  return getAvailabilityHistory(request);
}
