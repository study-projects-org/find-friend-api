import 'dotenv/config';
import { prisma } from '@/database/prisma';
import { execSync } from 'node:child_process';
import { randomUUID } from 'node:crypto';
import { Environment } from 'vitest';

function generateUniqueDatabaseUrl(schemaId: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error(
      'Por favor forneça uma DATABASE_URL como variável de ambiente',
    );
  }

  const url = new URL(process.env.DATABASE_URL);

  url.searchParams.set('schema', schemaId);

  return url.toString();
}

export default <Environment> {
  name: 'prisma',
  transformMode: 'ssr',

  async setup() {
    const schemaId = randomUUID();

    const databaseUrl = generateUniqueDatabaseUrl(schemaId);

    process.env.DATABASE_URL = databaseUrl;

    execSync('npx prisma migrate deploy');

    return {
      async teardown() {
        await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schemaId}" CASCADE`);
        await prisma.$disconnect();
      }
    };
  }
};
