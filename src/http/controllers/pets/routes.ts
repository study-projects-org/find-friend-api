import { FastifyInstance } from 'fastify';
import { createPet } from './create-pet.controller';
import { verifyJwtMiddleware } from '@/http/middlewares/verify-jwt.middleware';
import { searchPets } from './search-pets.controller';
import { getPetDetail } from './get-pet-detail.controller';

export async function petsRoutes(app: FastifyInstance) {
  app.post('/pets', { onRequest: verifyJwtMiddleware }, createPet);
  app.get('/pets/search', searchPets);
  app.get('/pets/:id', getPetDetail);
}
