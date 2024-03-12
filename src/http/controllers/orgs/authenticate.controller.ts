import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials.error';
import { authenticateUseCaseFactory } from '@/use-cases/factories/authenticate.use-case.factory';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function authenticate(req: FastifyRequest, reply: FastifyReply) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string()
  });

  const { email, password } = authenticateBodySchema.parse(req.body);

  try {
    const authenticateUseCase = authenticateUseCaseFactory();

    const { org } = await authenticateUseCase.execute({ email, password });

    const token = await reply.jwtSign({ }, { sign: { sub: org.id, } });

    const refreshToken = await reply.jwtSign({ }, { sign: { sub: org.id, expiresIn: '1d' } });

    return reply
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true,
        httpOnly: true,
        sameSite: true,
      })
      .status(200)
      .send({ token });
  } catch (error) {

    if (error instanceof InvalidCredentialsError) {
      return reply
        .status(401)
        .send({ message: error.message });
    }

    throw error;
  }
}
