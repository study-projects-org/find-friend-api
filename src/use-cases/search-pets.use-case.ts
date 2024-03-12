import { PetsRepository } from '@/repositories/pets.repository';
import { Pet } from '@prisma/client';

interface Request {
  city: string;
  age?: string;
  size?: string;
  energyLevel?: string;
  independenceLevel?: string;
}

interface Response {
  pets: Pet[],
}

export class SearchPetsUseCase {
  constructor(private readonly petsRepository: PetsRepository) { }

  async execute({
    city, age, energyLevel, independenceLevel, size
  }: Request): Promise<Response> {
    const pets = await this.petsRepository.searchMany(city, {
      size, age, energyLevel, independenceLevel
    });

    return { pets };
  }
}
