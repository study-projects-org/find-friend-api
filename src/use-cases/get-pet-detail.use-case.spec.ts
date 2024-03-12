import { GetPetDetailUseCase } from './get-pet-detail.use-case';
import { PetDetail, PetsRepository } from '../repositories/pets.repository';
import {
  vi, describe, beforeEach, it , expect
} from 'vitest';
import { ResourceNotFoundError } from './errors/resource-not-found.error';

describe('Get Pet Detail Use Case', () => {
  let useCase: GetPetDetailUseCase;
  const petsRepository: PetsRepository = {
    getPetDetail: vi.fn(),
    create: vi.fn(),
    findById: vi.fn(),
    searchMany: vi.fn(),
    update: vi.fn(),
  };

  beforeEach(() => {
    useCase = new GetPetDetailUseCase(petsRepository);
  });

  it('should return the pet detail when it exists', async () => {
    const petId = '123';
    const petDetail: PetDetail = {
      id: petId,
      name: 'Max',
      age: '3',
      about: 'A friendly dog',
      orgId: '1',
      adoptedIn: null,
      energyLevel: 'high',
      environment: 'indoor',
      independenceLevel: 'low',
      size: 'small',
      org: {
        cep: '12345678',
        city: 'Fortaleza',
        latitude: -3.745,
        longitude: -38.523,
        neighborhood: 'Aldeota',
        responsibleName: 'John Doe',
        state: 'Ceará',
        street: 'Av. Santos Dumont',
        whatsapp: '85988945632',
      }
    };

    vi.spyOn(petsRepository, 'getPetDetail').mockResolvedValue(petDetail);

    const result = await useCase.execute({ id: petId });

    expect(petsRepository.getPetDetail).toHaveBeenCalledWith(petId);
    expect(result.pet).toEqual(petDetail);
  });

  it('should throw ResourceNotFoundError when the pet does not exist', async () => {
    const petId = '123';

    vi.spyOn(petsRepository, 'getPetDetail').mockResolvedValue(null);

    expect(async () => {
      await useCase.execute({ id: petId });
    }).rejects.toThrow(ResourceNotFoundError);
  });
});
