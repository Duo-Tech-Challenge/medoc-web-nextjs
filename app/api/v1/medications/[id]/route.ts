/**
 * CRUD Medication by ID
 * GET, PUT, DELETE /api/v1/medications/:id
 */

import { NextRequest, NextResponse } from 'next/server';
import { medicationController } from '@/app/api/v1/controllers/medication.controller';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  return medicationController.getById(request, { params });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  return medicationController.update(request, { params });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  return medicationController.delete(request, { params });
}
