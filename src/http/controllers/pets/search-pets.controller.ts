import { searchPetsUseCaseFactory } from '@/use-cases/factories/search-pet.use-case.factory';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function searchPets(request: FastifyRequest, reply: FastifyReply) {
  const searchParamsSchema = z.object({
    city: z.string(),
    age: z.string().optional(),
    size: z.string().optional(),
    energyLevel: z.string().optional(),
    independenceLevel: z.string().optional(),
  });

  const {
    city, age, energyLevel, independenceLevel, size
  } = searchParamsSchema.parse(request.query);

  const useCase = searchPetsUseCaseFactory();

  const response = await useCase.execute({
    city, age, size, energyLevel, independenceLevel
  });

  const pets = response.pets;

  return reply.send({ pets });
}
