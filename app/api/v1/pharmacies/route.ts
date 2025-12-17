/**
 * CRUD Pharmacies
 * POST, GET /api/v1/pharmacies
 */

import { NextRequest, NextResponse } from 'next/server';
import { pharmacyController } from '@/app/api/v1/controllers/index';

export async function POST(request: NextRequest): Promise<NextResponse> {
  return pharmacyController.create(request);
}

export async function GET(): Promise<NextResponse> {
  return pharmacyController.getAll();
}
