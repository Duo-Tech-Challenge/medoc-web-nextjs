/**
 * Repository Pattern Base
 * Couche d'abstraction pour accès aux données (via Prisma)
 * Connecté à PostgreSQL réelle
 */

import { prisma } from '@/lib/prisma';

export abstract class BaseRepository<T> {
  abstract findById(id: string): Promise<T | null>;
  abstract findAll(): Promise<T[]>;
  abstract create(data: Partial<T>): Promise<T>;
  abstract update(id: string, data: Partial<T>): Promise<T | null>;
  abstract delete(id: string): Promise<boolean>;
}

/**
 * Repository Prisma de base
 */
export abstract class PrismaRepository<T> extends BaseRepository<T> {
  protected prisma = prisma;
}

/**
 * Mock Repository pour les tests
 */
export class MockRepository<T extends { id: string }> extends BaseRepository<T> {
  protected data: Map<string, T> = new Map();

  async findById(id: string): Promise<T | null> {
    return this.data.get(id) || null;
  }

  async findAll(): Promise<T[]> {
    return Array.from(this.data.values());
  }

  async create(data: Partial<T>): Promise<T> {
    const id = crypto.randomUUID();
    const item = { ...data, id } as T;
    this.data.set(id, item);
    return item;
  }

  async update(id: string, data: Partial<T>): Promise<T | null> {
    const item = this.data.get(id);
    if (!item) return null;

    const updated = { ...item, ...data } as T;
    this.data.set(id, updated);
    return updated;
  }

  async delete(id: string): Promise<boolean> {
    return this.data.delete(id);
  }
}
