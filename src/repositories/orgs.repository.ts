import { Org, Prisma } from '@prisma/client';

export abstract class OrgsRepository {
  abstract findByEmail(email: string): Promise<Org | null>;
  abstract create(data: Prisma.OrgCreateInput): Promise<Org>;
}