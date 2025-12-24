/**
 * GET /api/v1/admin/pharmacy/[id]/audit
 * Récupérer l'historique d'audit d'une pharmacie
 */

import { NextRequest, NextResponse } from 'next/server';
import { getPharmacyAuditTrail } from '@/app/api/v1/controllers/admin.controller';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  return getPharmacyAuditTrail(request, { params });
}
