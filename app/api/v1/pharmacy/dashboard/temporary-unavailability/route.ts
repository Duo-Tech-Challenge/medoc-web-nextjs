/**
 * POST /api/v1/pharmacy/dashboard/temporary-unavailability
 * Créer une indisponibilité temporaire
 *
 * PUT /api/v1/pharmacy/dashboard/temporary-unavailability/:id/resolve
 * Résoudre une indisponibilité temporaire
 */

import { NextRequest, NextResponse } from 'next/server';
import { createTemporaryUnavailability } from '@/app/api/v1/controllers/pharmacy-dashboard.controller';

export async function POST(request: NextRequest): Promise<NextResponse> {
  return createTemporaryUnavailability(request);
}
