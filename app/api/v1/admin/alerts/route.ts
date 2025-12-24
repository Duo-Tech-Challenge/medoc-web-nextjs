/**
 * GET /api/v1/admin/alerts
 * Récupérer les alertes admin
 *
 * PUT /api/v1/admin/alerts/:id/dismiss
 * Dismisser une alerte admin
 */

import { NextRequest, NextResponse } from 'next/server';
import { getAdminAlerts } from '@/app/api/v1/controllers/notification.controller';

export async function GET(request: NextRequest): Promise<NextResponse> {
  return getAdminAlerts(request);
}
