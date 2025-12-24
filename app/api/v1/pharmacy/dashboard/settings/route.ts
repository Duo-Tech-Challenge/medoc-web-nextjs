/**
 * GET /api/v1/pharmacy/dashboard/settings
 * PUT /api/v1/pharmacy/dashboard/settings
 * Gestion des settings de la pharmacie
 */

import { NextRequest, NextResponse } from 'next/server';
import {
  getPharmacySettings,
  updatePharmacySettings,
} from '@/app/api/v1/controllers/pharmacy-dashboard.controller';

export async function GET(request: NextRequest): Promise<NextResponse> {
  return getPharmacySettings(request);
}

export async function PUT(request: NextRequest): Promise<NextResponse> {
  return updatePharmacySettings(request);
}
