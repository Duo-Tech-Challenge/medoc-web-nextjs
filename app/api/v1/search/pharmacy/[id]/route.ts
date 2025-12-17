/**
 * GET /api/v1/search/pharmacy/:id
 * Infos publiques d'une pharmacie
 */

import { NextRequest, NextResponse } from 'next/server';
import { searchController } from '@/app/api/v1/controllers/search.controller';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  return searchController.getPharmacyPublic(request, { params });
}
