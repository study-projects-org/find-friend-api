import { getPetDetailUseCaseFactory } from '@/use-cases/factories/get-pet-detail.use-case.factory';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function getPetDetail(request: FastifyRequest, reply: FastifyReply) {
  const queryParamSchema = z.object({ id: z.string().uuid(), });

  console.log('request.query', request.params);

  const { id } = queryParamSchema.parse(request.params);

  const useCase = getPetDetailUseCaseFactory();

  const response = await useCase.execute({ id });

  const pet = response.pet;

  return reply.send({ pet });
}
