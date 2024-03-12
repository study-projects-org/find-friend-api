import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets.repository';
import { CreatePetUseCase } from '../create-pet.use-case';

export function createPetUseCaseFactory() {
  const petsRepository = new PrismaPetsRepository();
  const createPetUseCase =  new CreatePetUseCase(petsRepository);

  return createPetUseCase;
}
