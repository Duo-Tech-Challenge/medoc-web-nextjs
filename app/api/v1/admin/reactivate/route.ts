/**
 * POST /api/v1/admin/reactivate
 * Réactiver une pharmacie suspendue
 */

import { NextRequest, NextResponse } from 'next/server';
import { reactivatePharmacy } from '@/app/api/v1/controllers/admin.controller';

export async function POST(request: NextRequest): Promise<NextResponse> {
  return reactivatePharmacy(request);
}
