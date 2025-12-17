/**
 * Validation de pharmacie (admin)
 * POST /api/v1/pharmacies/:id/validate
 */

import { NextRequest, NextResponse } from 'next/server';
import { pharmacyController } from '@/app/api/v1/controllers/index';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  return pharmacyController.validate(request, { params });
}
