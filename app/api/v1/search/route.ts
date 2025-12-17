/**
 * GET /api/v1/search?medication=...
 * Recherche inversée: médicament → pharmacies
 */

import { NextRequest, NextResponse } from 'next/server';
import { searchController } from '@/app/api/v1/controllers/search.controller';

export async function GET(request: NextRequest): Promise<NextResponse> {
  return searchController.search(request);
}
