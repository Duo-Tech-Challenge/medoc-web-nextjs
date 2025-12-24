/**
 * POST /api/v1/admin/suspend
 * Suspendre une pharmacie
 */

import { NextRequest, NextResponse } from 'next/server';
import { suspendPharmacy } from '@/app/api/v1/controllers/admin.controller';

export async function POST(request: NextRequest): Promise<NextResponse> {
  return suspendPharmacy(request);
}
