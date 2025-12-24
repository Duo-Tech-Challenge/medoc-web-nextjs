/**
 * GET /api/v1/admin/stats
 * Récupérer les statistiques du dashboard admin
 */

import { NextRequest, NextResponse } from 'next/server';
import { getAdminStats } from '@/app/api/v1/controllers/admin.controller';

export async function GET(request: NextRequest): Promise<NextResponse> {
  return getAdminStats(request);
}
