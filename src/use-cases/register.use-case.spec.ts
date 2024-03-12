import {
  afterEach, expect, it, vi, describe, beforeEach
} from 'vitest';
import { RegisterUseCase } from './register.use-case';
import { OrgAlreadyExistsError } from './errors/org-already-exists.error';

describe('Register Use Case', () => {
  let useCase: RegisterUseCase;

  const mockOrgsRepo = {
    create: vi.fn(),
    findByEmail: vi.fn(),
  };

  const request = {
    responsibleName: 'John Doe',
    email: 'test@email.com',
    whatsapp: '123456789',
    password: '123456',
    cep: '12345678',
    state: 'SP',
    city: 'São Paulo',
    neighborhood: 'Vila Mariana',
    street: 'Rua Vergueiro',
    latitude: -23.586276,
    longitude: -46.635623
  };

  beforeEach(() => {
    useCase = new RegisterUseCase(mockOrgsRepo);
  });

  afterEach(() => {
    vi.resetAllMocks();
    vi.clearAllMocks();
  });

  it('should password hashed before saving', async () => {
    await useCase.execute(request);

    expect(mockOrgsRepo.create).toHaveBeenCalledWith({
      ...request,
      password: expect.not.stringMatching(request.password)
    });

  });

  it('should register a new user', async () => {
    mockOrgsRepo.findByEmail.mockResolvedValue(null);

    await useCase.execute(request);

    expect(mockOrgsRepo.findByEmail).toHaveBeenCalledWith(request.email);
    expect(mockOrgsRepo.create).toHaveBeenCalledWith({
      ...request,
      password: expect.not.stringMatching(request.password)
    });
  });

  it('should not register a user with an existing email', async () => {
    mockOrgsRepo.findByEmail.mockResolvedValue(expect.objectContaining({
      responsibleName: 'Jane Doe',
      email: request.email
    }));

    expect(async () => {
      await useCase.execute(request);
    }).rejects.toBeInstanceOf(OrgAlreadyExistsError);
    expect(mockOrgsRepo.findByEmail).toHaveBeenCalledWith(request.email);
    expect(mockOrgsRepo.create).not.toHaveBeenCalled();
  });

});
