/**
 * POST /api/v1/admin/validate
 * Valider une pharmacie après review
 */

import { NextRequest, NextResponse } from 'next/server';
import {
  validatePharmacy,
} from '@/app/api/v1/controllers/admin.controller';

export async function POST(request: NextRequest): Promise<NextResponse> {
  return validatePharmacy(request);
}
