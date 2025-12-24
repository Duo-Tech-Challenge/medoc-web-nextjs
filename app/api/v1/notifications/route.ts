/**
 * GET /api/v1/notifications
 * PUT /api/v1/notifications/:id/read
 * Gestion des notifications utilisateur
 */

import { NextRequest, NextResponse } from 'next/server';
import { getUserNotifications } from '@/app/api/v1/controllers/notification.controller';

export async function GET(request: NextRequest): Promise<NextResponse> {
  return getUserNotifications(request);
}
