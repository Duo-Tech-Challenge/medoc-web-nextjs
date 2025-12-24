/**
 * GET /api/v1/admin/audit-logs
 * Récupérer les audit logs
 *
 * GET /api/v1/admin/notification-stats
 * Récupérer les statistiques des notifications
 */

import { NextRequest, NextResponse } from 'next/server';
import { getAuditLogs, getNotificationStats } from '@/app/api/v1/controllers/notification.controller';

export async function GET(request: NextRequest): Promise<NextResponse> {
  // const { searchParams } = new URL(request.url);
  
  // Vérifier si c'est une requête pour les stats
  if (request.url.includes('/notification-stats')) {
    return getNotificationStats(request);
  }
  
  // Sinon, retourner les audit logs
  return getAuditLogs(request);
}
