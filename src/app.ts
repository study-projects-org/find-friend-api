import fastify from 'fastify';
import { orgsRoutes } from './http/controllers/orgs/routes';
import { ZodError } from 'zod';
import { env } from './config/env';
import fastifyJwt from '@fastify/jwt';
import fastifyCookie from '@fastify/cookie';
import { petsRoutes } from './http/controllers/pets/routes';

export const app = fastify();

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: { expiresIn: '10m' }
});

app.register(fastifyCookie);

app.register(orgsRoutes);
app.register(petsRoutes);

app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError){
    return reply
      .code(400)
      .send({ message: 'Validation error.', issues: error.format() });
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error);
  } else {
    // TODO: Send error to external tool like Sentry/NewRelic/DataDog
  }

  return reply.status(500).send({ message: 'Internal server error' });

});
