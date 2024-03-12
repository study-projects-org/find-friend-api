import { PetDetail, PetsRepository } from '@/repositories/pets.repository';
import { ResourceNotFoundError } from './errors/resource-not-found.error';

interface Request {
  id: string;
}
interface Response {
  pet: PetDetail;
}

export class GetPetDetailUseCase {
  constructor(private readonly petsRepository: PetsRepository) {}

  async execute(request: Request): Promise<Response> {
    const pet = await this.petsRepository.getPetDetail(request.id);

    if (!pet) {
      throw new ResourceNotFoundError();
    }

    return { pet };
  }
}
