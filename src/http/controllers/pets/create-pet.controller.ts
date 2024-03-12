import { createPetUseCaseFactory } from '@/use-cases/factories/create-pet.use-case.factory';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function createPet(request: FastifyRequest, reply: FastifyReply) {
  const createPetBodySchema = z.object({
    name: z.string(),
    age: z.string(),
    size: z.string(),
    energyLevel: z.string(),
    independenceLevel: z.string(),
    about: z.string(),
    environment: z.string(),
  });

  const {
    name,
    age,
    size,
    energyLevel,
    independenceLevel,
    about,
    environment
  } = createPetBodySchema.parse(request.body);

  const orgId = request.user.sub;
  const createPetUseCase = createPetUseCaseFactory();

  await createPetUseCase.execute({
    name,
    age,
    size,
    energyLevel,
    independenceLevel,
    about,
    environment,
    orgId,
  });

  return reply.code(201).send();
}
