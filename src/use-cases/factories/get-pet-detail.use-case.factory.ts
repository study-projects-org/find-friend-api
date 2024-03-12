import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets.repository';
import { GetPetDetailUseCase } from '../get-pet-detail.use-case';

export function getPetDetailUseCaseFactory() {
  const petsRepository = new PrismaPetsRepository();
  const useCase = new GetPetDetailUseCase(petsRepository);

  return useCase;
}
