/**
 * PUT /api/v1/notifications/[id]/read
 * Marquer une notification comme lue
 */

import { NextRequest, NextResponse } from 'next/server';
import { markNotificationAsRead } from '@/app/api/v1/controllers/notification.controller';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  return markNotificationAsRead(request, { params });
}
