/**
 * PUT /api/v1/admin/alerts/[id]/dismiss
 * Dismisser une alerte admin
 */

import { NextRequest, NextResponse } from 'next/server';
import { dismissAdminAlert } from '@/app/api/v1/controllers/notification.controller';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  return dismissAdminAlert(request, { params });
}
