import { PetsRepository } from '@/repositories/pets.repository';
import { Pet } from '@prisma/client';
interface Request {
  name: string;
  about: string;
  age: string;
  size: string;
  energyLevel: string;
  independenceLevel: string;
  environment: string;
  orgId: string;
}
interface Response {
  pet: Pet;
}
export class CreatePetUseCase {
  constructor(private readonly petsRepository: PetsRepository) { }

  async execute({
    name,
    age,
    about,
    energyLevel,
    environment,
    independenceLevel,
    orgId,
    size
  }: Request): Promise<Response> {

    const pet = await this.petsRepository.create({
      name,
      age,
      about,
      energyLevel,
      environment,
      independenceLevel,
      size,
      org: { connect: { id: orgId } }
    });

    return { pet };
  }
}
