/**
 * GET /api/v1/notifications/preferences
 * PUT /api/v1/notifications/preferences
 * Gestion des préférences de notification
 */

import { NextRequest, NextResponse } from 'next/server';
import {
  getUserPreferences,
  updateUserPreferences,
} from '@/app/api/v1/controllers/notification.controller';

export async function GET(request: NextRequest): Promise<NextResponse> {
  return getUserPreferences(request);
}

export async function PUT(request: NextRequest): Promise<NextResponse> {
  return updateUserPreferences(request);
}
