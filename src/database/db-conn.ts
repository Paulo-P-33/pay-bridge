import { PrismaClient } from '@prisma/client';

type NodeJsGlobal = typeof globalThis;

// add prisma to the NodeJS global type
interface CustomNodeJsGlobal extends NodeJsGlobal {
  db: PrismaClient;
}

// Prevent multiple instances of Prisma Client in development
declare const global: CustomNodeJsGlobal;

const db =
  global.db || new PrismaClient({ log: ['query', 'info', 'warn', 'error'] });

if (process.env.NODE_ENV === 'development') global.db = db;

export { db };