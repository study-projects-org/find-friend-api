import { OrgsRepository } from '@/repositories/orgs.repository';
import { compare } from 'bcrypt';
import { InvalidCredentialsError } from './errors/invalid-credentials.error';
import { Org } from '@prisma/client';

interface Request {
  email: string;
  password: string;
}
interface Response {
  org: Org;
}
export class AuthenticateUseCase {
  constructor(private readonly orgsRepository: OrgsRepository) { }

  async execute({ email, password }: Request): Promise<Response> {
    const org = await this.orgsRepository.findByEmail(email);
    if (!org) {
      throw new InvalidCredentialsError();
    }

    const passwordAreMatched = await compare(password, org.password);

    if (!passwordAreMatched) {
      throw new InvalidCredentialsError();
    }

    return { org };
  }
}
