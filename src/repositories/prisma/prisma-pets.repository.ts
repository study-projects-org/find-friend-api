import { Pet, Prisma } from '@prisma/client';
import { PetDetail, PetsRepository } from '../pets.repository';
import { prisma } from '@/database/prisma';

export class PrismaPetsRepository implements PetsRepository {
  async getPetDetail(id: string): Promise<PetDetail | null> {
    const result = await prisma.pet.findUnique({
      where: { id },
      include: { org: true }
    });

    if (!result) {
      return null;
    }

    return {
      ...result,
      org: {
        responsibleName: result.org.responsibleName,
        whatsapp: result.org.whatsapp,
        cep: result.org.cep,
        city: result.org.city,
        state: result.org.state,
        neighborhood: result.org.neighborhood,
        street: result.org.street,
        latitude: result.org.latitude.toNumber(),
        longitude: result.org.longitude.toNumber()
      }
    };
  }

  async findById(id: string): Promise<Pet | null> {
    const pet = await prisma.pet.findUnique({ where: { id } });
    return pet;
  }

  async searchMany(city: string, filters: { age?: string; size?: string; energyLevel?: string; independenceLevel?: string; }): Promise<Pet[]> {
    const pets = await prisma.pet.findMany({
      where: {
        org: { city },
        age: filters.age,
        size: filters.size,
        energyLevel: filters.energyLevel,
        independenceLevel: filters.independenceLevel
      }
    });

    return pets;
  }

  async create(data: Prisma.PetCreateInput): Promise<Pet> {
    const pet = await prisma.pet.create({ data });
    return pet;
  }

  async update(id: string, data: Prisma.PetUpdateInput): Promise<Pet> {
    const pet = await prisma.pet.update({ where: { id }, data });
    return pet;
  }
}
