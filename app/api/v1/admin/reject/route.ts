/**
 * POST /api/v1/admin/reject
 * Rejeter une demande de pharmacie
 */

import { NextRequest, NextResponse } from 'next/server';
import { rejectPharmacy } from '@/app/api/v1/controllers/admin.controller';

export async function POST(request: NextRequest): Promise<NextResponse> {
  return rejectPharmacy(request);
}
