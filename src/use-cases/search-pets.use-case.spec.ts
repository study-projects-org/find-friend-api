import { SearchPetsUseCase } from './search-pets.use-case';
import { PetsRepository } from '../repositories/pets.repository';
import {
  beforeAll, vi, describe, it, expect, afterEach
} from 'vitest';

describe('Search Pets Use Case', () => {
  let useCase: SearchPetsUseCase;
  const mockPetsRepository: PetsRepository = {
    searchMany: vi.fn(),
    findById: vi.fn(),
    create: vi.fn(),
    update: vi.fn()
  };

  beforeAll(() => {
    useCase = new SearchPetsUseCase(mockPetsRepository);
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  it('should return the searched pets', async () => {
    const city = 'São Paulo';
    const age = 'Filhote';
    const energyLevel = 'Alto';
    const independenceLevel = 'Medio';
    const size = 'Medio';

    await useCase.execute({
      city, age, energyLevel, independenceLevel, size
    });

    expect(mockPetsRepository.searchMany).toHaveBeenCalledWith(city, {
      size, age, energyLevel, independenceLevel
    });
  });

  it('should return the searched pets for in a city', async () => {
    const city = 'São Paulo';

    await useCase.execute({ city });

    expect(mockPetsRepository.searchMany).toHaveBeenCalledWith(city, {});
  });
});
