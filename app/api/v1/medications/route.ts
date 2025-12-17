/**
 * CRUD Medications
 * POST, GET /api/v1/medications
 */

import { NextRequest, NextResponse } from 'next/server';
import { medicationController } from '@/app/api/v1/controllers/medication.controller';

export async function POST(request: NextRequest): Promise<NextResponse> {
  return medicationController.create(request);
}

export async function GET(): Promise<NextResponse> {
  return medicationController.getAll();
}
