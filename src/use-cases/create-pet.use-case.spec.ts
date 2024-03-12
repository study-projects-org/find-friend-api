import {
  beforeEach, describe, expect, vi, it, afterEach
} from 'vitest';
import { CreatePetUseCase } from './create-pet.use-case';

describe('Create Pet Use Case', () => {
  let useCase: CreatePetUseCase;

  const mockRepository = {
    create: vi.fn(),
    findById: vi.fn(),
    searchMany: vi.fn(),
    update: vi.fn(),
    getPetDetail: vi.fn(),
  };

  beforeEach(() =>{
    useCase = new CreatePetUseCase(mockRepository);
  });

  afterEach(() => {
    vi.resetAllMocks();
    vi.clearAllMocks();
  });

  it('should create a pet', async () => {
    const request = {
      name: 'Buddy',
      age: '3',
      about: 'A friendly dog',
      energyLevel: 'high',
      environment: 'indoor',
      independenceLevel: 'low',
      orgId: '1',
      size: 'small',
    };

    await useCase.execute(request);

    expect(mockRepository.create).toHaveBeenCalledWith({
      name: 'Buddy',
      age: '3',
      about: 'A friendly dog',
      energyLevel: 'high',
      environment: 'indoor',
      independenceLevel: 'low',
      size: 'small',
      org: { connect: { id: '1' } },
    });
    expect(mockRepository.create).toHaveBeenCalledTimes(1);
  });
});
