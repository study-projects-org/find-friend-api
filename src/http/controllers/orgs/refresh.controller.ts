import { FastifyReply, FastifyRequest } from 'fastify';

export async function refresh(request: FastifyRequest, reply: FastifyReply) {

  await request.jwtVerify({ onlyCookie: true });

  const orgId = request.user.sub;

  const token = await reply.jwtSign({ }, { sign: { sub: orgId, } });

  const refreshToken = await reply.jwtSign({ }, { sign: { sub: orgId, expiresIn: '1d' } });

  return reply
    .setCookie('refreshToken', refreshToken, {
      path: '/',
      secure: true,
      httpOnly: true,
      sameSite: true,
    })
    .status(200)
    .send({ token });
}
