/**
 * Auth Service
 * Logique d'authentification avec PostgreSQL
 * Gère les 3 types d'utilisateurs : USER, PHARMACY, ADMIN
 */

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ApiError, ErrorCode } from '@/types/api';
import { logger } from '@/lib/logger';
import { prisma } from '@/lib/prisma';

interface AuthTokens {
  accessToken: string;
  refreshToken?: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'USER' | 'PHARMACY' | 'ADMIN';
}

export class AuthService {
  private readonly jwtSecret = process.env.JWT_SECRET!;
  private readonly jwtExpiresIn = process.env.JWT_EXPIRES_IN || '7d';

  /**
   * Authentification universelle (tente les 3 types d'utilisateurs)
   */
  async login(credentials: LoginCredentials): Promise<{ user: UserProfile; tokens: AuthTokens }> {
    const { email, password } = credentials;
    
    logger.info('Login attempt', { email });

    // 1. Essayer User
    let user = await this.authenticateUser(email, password);
    let role: 'USER' | 'PHARMACY' | 'ADMIN' = 'USER';

    // 2. Si échec, essayer Pharmacy
    if (!user) {
      user = await this.authenticatePharmacy(email, password);
      role = 'PHARMACY';
    }

    // 3. Si échec, essayer Admin
    if (!user) {
      user = await this.authenticateAdmin(email, password);
      role = 'ADMIN';
    }

    // 4. Si toujours échec, erreur
    if (!user) {
      throw new ApiError(ErrorCode.UNAUTHORIZED, 'Invalid credentials');
    }

    // 5. Générer les tokens
    const tokens = this.generateTokens({ ...user, role });

    logger.info('Login successful', { email, role });

    return {
      user: { ...user, role },
      tokens,
    };
  }

  /**
   * Inscription utilisateur standard
   */
  async registerUser(userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }): Promise<{ user: UserProfile; tokens: AuthTokens }> {
    logger.info('User registration', { email: userData.email });

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { email: userData.email.toLowerCase() },
    });

    if (existingUser) {
      throw new ApiError(ErrorCode.CONFLICT, 'User already exists');
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    // Créer l'utilisateur
    const user = await prisma.user.create({
      data: {
        email: userData.email.toLowerCase(),
        password: hashedPassword,
        firstName: userData.firstName,
        lastName: userData.lastName,
      },
    });

    const userProfile: UserProfile = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: 'USER',
    };

    const tokens = this.generateTokens(userProfile);

    logger.info('User registration successful', { email: user.email });

    return { user: userProfile, tokens };
  }

  /**
   * Vérifier un token JWT
   */
  verifyToken(token: string): UserProfile {
    try {
      const decoded = jwt.verify(token, this.jwtSecret) as UserProfile;
      return decoded;
    } catch (error) {
      throw new ApiError(ErrorCode.UNAUTHORIZED, 'Invalid token');
    }
  }

  /**
   * Rafraîchir un token
   */
  refreshToken(refreshToken: string): AuthTokens {
    const user = this.verifyToken(refreshToken);
    return this.generateTokens(user);
  }

  /**
   * Authentification User
   */
  private async authenticateUser(email: string, password: string): Promise<Omit<UserProfile, 'role'> | null> {
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user) return null;

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return null;

    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    };
  }

  /**
   * Authentification Pharmacy
   */
  private async authenticatePharmacy(email: string, password: string): Promise<Omit<UserProfile, 'role'> | null> {
    const pharmacy = await prisma.pharmacy.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!pharmacy) return null;

    const isValid = await bcrypt.compare(password, pharmacy.password);
    if (!isValid) return null;

    // Extraire firstName/lastName depuis le nom (logique simplifiée)
    const [firstName, ...lastNameParts] = pharmacy.name.split(' ');
    const lastName = lastNameParts.join(' ') || '';

    return {
      id: pharmacy.id,
      email: pharmacy.email,
      firstName,
      lastName,
    };
  }

  /**
   * Authentification Admin
   */
  private async authenticateAdmin(email: string, password: string): Promise<Omit<UserProfile, 'role'> | null> {
    const admin = await prisma.admin.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!admin) return null;

    const isValid = await bcrypt.compare(password, admin.password);
    if (!isValid) return null;

    return {
      id: admin.id,
      email: admin.email,
      firstName: admin.firstName,
      lastName: admin.lastName,
    };
  }

  /**
   * Générer les tokens JWT
   */
  private generateTokens(user: UserProfile): AuthTokens {
    const payload = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
    };

    const accessToken = jwt.sign(payload, this.jwtSecret, {
      expiresIn: this.jwtExpiresIn,
    });

    return {
      accessToken,
    };
  }

  /**
   * Middleware pour vérifier les rôles
   */
  requireRole(requiredRole: 'USER' | 'PHARMACY' | 'ADMIN') {
    return (user: UserProfile): boolean => {
      if (requiredRole === 'ADMIN') {
        return user.role === 'ADMIN';
      }
      if (requiredRole === 'PHARMACY') {
        return user.role === 'PHARMACY' || user.role === 'ADMIN';
      }
      return user.role === 'USER' || user.role === 'PHARMACY' || user.role === 'ADMIN';
    };
  }
}

export const authService = new AuthService();