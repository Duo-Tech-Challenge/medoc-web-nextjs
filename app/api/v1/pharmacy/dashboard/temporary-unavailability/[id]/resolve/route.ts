/**
 * PUT /api/v1/pharmacy/dashboard/temporary-unavailability/[id]/resolve
 * Résoudre une indisponibilité temporaire
 */

import { NextRequest, NextResponse } from 'next/server';
import { resolveTemporaryUnavailability } from '@/app/api/v1/controllers/pharmacy-dashboard.controller';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  return resolveTemporaryUnavailability(request, { params });
}
