/**
 * User Repository
 * Gère l'accès aux données d'utilisateurs
 */

import type { UserDTO, CreateUserDTO } from '@/types/user';
import { MockRepository } from './base.repository';

export interface UserRecord extends UserDTO {
  id: string;
  passwordHash: string; // Stocké en mémoire pour le mock
}

class UserRepository extends MockRepository<UserRecord> {
  async findByEmail(email: string): Promise<UserRecord | null> {
    const all = await this.findAll();
    return all.find(u => u.email.toLowerCase() === email.toLowerCase()) || null;
  }

  async createFromDTO(dto: CreateUserDTO, passwordHash: string): Promise<UserRecord> {
    return this.create({
      ...dto,
      role: 'user' as const,
      passwordHash,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
}

export const userRepository = new UserRepository();
