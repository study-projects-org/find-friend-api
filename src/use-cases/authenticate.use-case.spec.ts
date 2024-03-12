import { vi, describe, it, afterEach, expect, beforeEach } from "vitest";
import { AuthenticateUseCase } from "./authenticate.use-case";
import { hash } from "bcrypt";
import { InvalidCredentialsError } from "./errors/invalid-credentials.error";

describe("Authenticate use case", () => {
  let useCase: AuthenticateUseCase;

  const mockOrgsRepo ={
    findByEmail: vi.fn(),
    create: vi.fn(),
  }

  beforeEach(() => {
    useCase = new AuthenticateUseCase(mockOrgsRepo);
  });

  afterEach(() => {
    vi.resetAllMocks();
    vi.clearAllMocks();
  });

  it("should authenticate a user", async () => {
    const request = {
      email: 'test@email.com',
      password: '123456'
    };

    const hashedPassword = await hash('123456', 8);
    vi.spyOn(mockOrgsRepo, 'findByEmail').mockResolvedValue({
      email: request.email,
      password: hashedPassword
    });

    const { org } = await useCase.execute(request);

    expect(mockOrgsRepo.findByEmail).toHaveBeenCalledWith(request.email);
    expect(org).toEqual(expect.objectContaining({
      email: request.email
    }));
  });

  it("should not authenticate a user with wrong email", async () => {  
    const request = {
      email: 'casca@email.com',
      password: '123456'
    };

    vi.spyOn(mockOrgsRepo, 'findByEmail').mockResolvedValue(null);

    await expect(useCase.execute(request)).rejects.toBeInstanceOf(InvalidCredentialsError);
    expect(mockOrgsRepo.findByEmail).toHaveBeenCalledWith(request.email);
  });

  it("should not authenticate a user with wrong password", async () => {
    const request = {
      email: 'test@email.com',
      password: '987654'
    };

    const hashedPassword = await hash('123456', 8);
    vi.spyOn(mockOrgsRepo, 'findByEmail').mockResolvedValue({
      email: request.email,
      password: hashedPassword
    });


    await expect(useCase.execute(request)).rejects.toBeInstanceOf(InvalidCredentialsError);
    expect(mockOrgsRepo.findByEmail).toHaveBeenCalledWith(request.email);
  });
});