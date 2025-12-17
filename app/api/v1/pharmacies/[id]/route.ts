/**
 * CRUD Pharmacy by ID
 * GET, PUT, DELETE /api/v1/pharmacies/:id
 */

import { NextRequest, NextResponse } from 'next/server';
import { pharmacyController } from '@/app/api/v1/controllers/index';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  return pharmacyController.getById(request, { params });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  return pharmacyController.update(request, { params });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  return pharmacyController.delete(request, { params });
}
