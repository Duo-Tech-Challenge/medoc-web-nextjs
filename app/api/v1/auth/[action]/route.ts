/**
 * Auth Routes
 */

import { NextRequest, NextResponse } from 'next/server';
import { authController } from '@/app/api/v1/controllers/auth.controller';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ action: string }> }
): Promise<NextResponse> {
  const { action } = await params;

  switch (action) {
    case 'register':
      return authController.register(request);
    case 'login':
      return authController.login(request);
    case 'pharmacy-login':
      return authController.pharmacyLogin(request);
    default:
      return NextResponse.json(
        {
          status: 'error',
          code: 404,
          message: 'Action not found',
          timestamp: new Date().toISOString(),
        },
        { status: 404 }
      );
  }
}
