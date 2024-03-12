import { RegisterUseCase } from '../register.use-case';
import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs.repository';

export function registerUseCaseFactory() {
  const orgsRepository = new PrismaOrgsRepository();
  const registerUseCase =  new RegisterUseCase(orgsRepository);

  return registerUseCase;
}
