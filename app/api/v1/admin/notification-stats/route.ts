/**
 * GET /api/v1/admin/notification-stats
 * Récupérer les statistiques des notifications
 */

import { NextRequest, NextResponse } from 'next/server';
import { getNotificationStats } from '@/app/api/v1/controllers/notification.controller';

export async function GET(request: NextRequest): Promise<NextResponse> {
  return getNotificationStats(request);
}
