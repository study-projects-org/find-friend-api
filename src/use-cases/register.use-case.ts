import { OrgsRepository } from '@/repositories/orgs.repository';
import { hash } from 'bcrypt';
import { OrgAlreadyExistsError } from './errors/org-already-exists.error';
import { Org } from '@prisma/client';

interface Request {
  responsibleName: string;
  email: string;
  whatsapp: string;
  password: string;
  cep: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  latitude: number;
  longitude: number;
}

interface Response {
  org: Org;
}

export class RegisterUseCase {
  constructor(private readonly orgsRepository: OrgsRepository) { }

  async execute({
    responsibleName,
    email,
    whatsapp,
    password,
    cep,
    city,
    neighborhood,
    state,
    street,
    latitude,
    longitude
  }: Request): Promise<Response> {

    const orgAlreadyExists = await this.orgsRepository.findByEmail(email);
    if (orgAlreadyExists) {
      throw new OrgAlreadyExistsError();
    }

    const passwordHash = await hash(password, 8);

    const org = await this.orgsRepository.create({
      responsibleName,
      email,
      whatsapp,
      password: passwordHash,
      cep,
      city,
      neighborhood,
      state,
      street,
      latitude,
      longitude
    });

    return { org };
  }
}
