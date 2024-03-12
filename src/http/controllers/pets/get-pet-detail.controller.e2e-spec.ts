import request from 'supertest';
import { app } from '@/app';
import {
  afterAll,
  beforeAll,
  describe, expect, it
} from 'vitest';
import { prisma } from '@/database/prisma';

describe('Get Pet Detail (E2E)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should list pets by city', async () => {
    await request(app.server)
      .post('/orgs')
      .send({
        responsibleName: 'John Doe',
        email: 'johndoe@email.com',
        whatsapp: '85988945632',
        password: '123456',
        cep: '12345678',
        state: 'Ceará',
        city: 'Fortaleza',
        neighborhood: 'Aldeota',
        street: 'Av. Santos Dumont',
        latitude: -3.745,
        longitude: -38.523,
      });

    const authResponse = await request(app.server)
      .post('/sessions')
      .send({
        email: 'johndoe@email.com',
        password: '123456',
      });

    const cookies = authResponse.get('Set-Cookie');

    await request(app.server)
      .post('/pets')
      .set('Cookie', cookies)
      .send({
        name: 'Rex',
        age: 'filhote',
        size: 'pequeno',
        energyLevel: 'alto',
        independenceLevel: 'baixo',
        about: 'Rex é um cachorro muito brincalhão',
        environment: 'casa',
      });

    const { id } = await prisma.pet.findFirstOrThrow({
      where: { name: 'Rex' },
      select: { id: true }
    });

    const response = await request(app.server)
      .get(`/pets/${id}`)
      .send();

    expect(response.statusCode).toBe(200);
    expect(response.body.pet).toEqual(expect.objectContaining({
      id,
      name: 'Rex',
      age: 'filhote',
      size: 'pequeno',
      energyLevel: 'alto',
      independenceLevel: 'baixo',
      about: 'Rex é um cachorro muito brincalhão',
      environment: 'casa',
      org: {
        responsibleName: 'John Doe',
        whatsapp: '85988945632',
        cep: '12345678',
        city: 'Fortaleza',
        state: 'Ceará',
        neighborhood: 'Aldeota',
        street: 'Av. Santos Dumont',
        latitude: -3.745,
        longitude: -38.523,
      }
    }));
  });

});
