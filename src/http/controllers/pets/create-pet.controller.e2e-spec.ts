import request from 'supertest';
import { app } from '@/app';
import {
  afterAll,
  beforeAll,
  describe, expect, it
} from 'vitest';

describe('Create Pet (E2E)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should create a pet', async () => {
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

    const response = await request(app.server)
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

    expect(response.statusCode).toBe(201);
  });
});
