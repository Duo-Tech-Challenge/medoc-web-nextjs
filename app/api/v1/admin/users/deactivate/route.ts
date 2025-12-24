/**
 * POST /api/v1/admin/deactivate-admin
 * Désactiver un admin
 */

import { NextRequest, NextResponse } from 'next/server';
import { deactivateAdmin } from '@/app/api/v1/controllers/admin.controller';

export async function POST(request: NextRequest): Promise<NextResponse> {
  return deactivateAdmin(request);
}
