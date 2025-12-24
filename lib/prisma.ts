import { PrismaClient } from '@prisma/client';

// Singleton pattern pour Prisma Client
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const prisma = global.prisma ?? new PrismaClient({
  log: ['query'], // Activer les logs en développement
});

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

export default prisma;