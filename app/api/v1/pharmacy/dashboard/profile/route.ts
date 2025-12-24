/**
 * GET /api/v1/pharmacy/dashboard/profile
 * PUT /api/v1/pharmacy/dashboard/profile
 * Gestion du profil interne pharmacie
 */

import { NextRequest, NextResponse } from 'next/server';
import {
  getPharmacyProfile,
  updatePharmacyProfile,
} from '@/app/api/v1/controllers/pharmacy-dashboard.controller';

export async function GET(request: NextRequest): Promise<NextResponse> {
  return getPharmacyProfile(request);
}

export async function PUT(request: NextRequest): Promise<NextResponse> {
  return updatePharmacyProfile(request);
}
