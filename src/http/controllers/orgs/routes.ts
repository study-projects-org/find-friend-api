import { FastifyInstance } from 'fastify';
import { registerOrg } from './register.controller';
import { authenticate } from './authenticate.controller';
import { refresh } from './refresh.controller';

export async function orgsRoutes(app: FastifyInstance) {
  app.post('/orgs', registerOrg);
  app.post('/sessions', authenticate);
  app.patch('/token/refresh', refresh);
}
