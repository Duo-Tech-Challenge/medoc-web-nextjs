/**
 * POST /api/v1/admin/create-admin
 * Créer un nouvel admin
 *
 * GET /api/v1/admin/all-admins
 * Récupérer la liste de tous les admins
 */

import { NextRequest, NextResponse } from 'next/server';
import { createAdmin, getAllAdmins } from '@/app/api/v1/controllers/admin.controller';

export async function POST(request: NextRequest): Promise<NextResponse> {
  return createAdmin(request);
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  return getAllAdmins(request);
}
