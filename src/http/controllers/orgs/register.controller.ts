import { OrgAlreadyExistsError } from '@/use-cases/errors/org-already-exists.error';
import { registerUseCaseFactory } from '@/use-cases/factories/register.use-case.factory';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function registerOrg(req: FastifyRequest, reply: FastifyReply) {

  const registerBodySchema = z.object({
    responsibleName: z.string(),
    email: z.string().email(),
    whatsapp: z.string(),
    password: z.string(),
    cep: z.string(),
    state: z.string(),
    city: z.string(),
    neighborhood: z.string(),
    street: z.string(),
    latitude: z.number(),
    longitude: z.number()
  });

  const {
    responsibleName,
    email,
    whatsapp,
    password,
    cep,
    state,
    city,
    neighborhood,
    street,
    latitude,
    longitude
  } = registerBodySchema.parse(req.body);

  try {
    const registerUseCase = registerUseCaseFactory();

    await registerUseCase.execute({
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
    });

  } catch (error) {
    if (error instanceof OrgAlreadyExistsError) {
      return reply.code(400).send({ message: error.message });
    }

    throw error;
  }

  return reply.code(201).send();
}
