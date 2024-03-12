import { Pet, Prisma } from '@prisma/client';

export type PetDetail = Pet & {
  org: {
    responsibleName: string,
    whatsapp: string,
    cep: string,
    city: string,
    state: string,
    neighborhood: string,
    street: string,
    latitude: number,
    longitude: number,
  }
};

export abstract class PetsRepository {
  abstract findById(id: string): Promise<Pet | null>;
  abstract getPetDetail(id: string): Promise<PetDetail | null>;
  abstract searchMany(city: string, filters: {age?: string,
    size?: string,
    energyLevel?: string,
    independenceLevel?: string,}): Promise<Pet[]>;
  abstract create(data: Prisma.PetCreateInput): Promise<Pet>;
  abstract update(id: string, data: Prisma.PetUpdateInput): Promise<Pet>;
}
