/**
 * PUT /api/v1/pharmacy/dashboard/medications/availability
 * Mettre à jour la disponibilité d'un médicament
 */

import { NextRequest, NextResponse } from 'next/server';
import { updateMedicationAvailability } from '@/app/api/v1/controllers/pharmacy-dashboard.controller';

export async function PUT(request: NextRequest): Promise<NextResponse> {
  return updateMedicationAvailability(request);
}
