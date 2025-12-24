/**
 * Auth Controller
 * Endpoints pour l'authentification
 */

import { NextRequest, NextResponse } from 'next/server';
import { userService } from '@/app/api/v1/services/user.service';
import { createSuccessResponse, handleErrorResponse } from '@/lib/api-response';
import { createToken } from '@/lib/jwt';
import type { CreateUserDTO, LoginUserDTO, AuthResponseDTO } from '@/types/user';
import { ApiError, ErrorCode } from '@/types/api';
import { logger } from '@/lib/logger';

export class AuthController {
  /**
   * POST /api/v1/auth/register
   * Inscription utilisateur
   */
  async register(request: NextRequest): Promise<NextResponse> {
    try {
      const body = await request.json() as CreateUserDTO;

      if (!body.email || !body.password || !body.firstName || !body.lastName) {
        throw new ApiError(ErrorCode.BAD_REQUEST, 'Missing required fields');
      }

      logger.info('User registration', { email: body.email });

      const user = await userService.registerUser(body);

      // Créer le token
      const token = createToken({
        userId: user.id,
        email: user.email,
        role: user.role,
      });

      const response: AuthResponseDTO = {
        user,
        tokens: {
          accessToken: token,
          refreshToken: token, // TODO: Implémenter refresh tokens
        },
      };

      const apiResponse = createSuccessResponse(response, 'User registered successfully', 201);
      return NextResponse.json(apiResponse, { status: 201 });
    } catch (error) {
      const errorResponse = handleErrorResponse(error);
      return NextResponse.json(errorResponse, { status: errorResponse.code });
    }
  }

  /**
   * POST /api/v1/auth/login
   * Connexion utilisateur
   */
  async login(request: NextRequest): Promise<NextResponse> {
    try {
      const body = await request.json() as LoginUserDTO;

      if (!body.email || !body.password) {
        throw new ApiError(ErrorCode.BAD_REQUEST, 'Email and password are required');
      }

      logger.info('User login', { email: body.email });

      const user = await userService.loginUser(body);

      // Créer le token
      const token = createToken({
        userId: user.id,
        email: user.email,
        role: user.role,
      });

      const response: AuthResponseDTO = {
        user,
        tokens: {
          accessToken: token,
          refreshToken: token,
        },
      };

      const apiResponse = createSuccessResponse(response, 'Logged in successfully', 200);
      return NextResponse.json(apiResponse, { status: 200 });
    } catch (error) {
      const errorResponse = handleErrorResponse(error);
      return NextResponse.json(errorResponse, { status: errorResponse.code });
    }
  }

  /**
   * POST /api/v1/auth/pharmacy-login
   * Connexion pharmacie (Admin Controlled Account Creation)
   */
  async pharmacyLogin(request: NextRequest): Promise<NextResponse> {
    try {
      const body = await request.json() as LoginUserDTO;

      if (!body.email || !body.password) {
        throw new ApiError(ErrorCode.BAD_REQUEST, 'Email and password are required');
      }

      logger.info('Pharmacy login attempt', { email: body.email });

      // TODO: Implémenter la logique de connexion pharmacie
      // - Vérifier email/password
      // - Vérifier que la pharmacie est validée

      throw new ApiError(ErrorCode.UNAUTHORIZED, 'Pharmacy authentication not yet implemented');
    } catch (error) {
      const errorResponse = handleErrorResponse(error);
      return NextResponse.json(errorResponse, { status: errorResponse.code });
    }
  }
}

export const authController = new AuthController();
