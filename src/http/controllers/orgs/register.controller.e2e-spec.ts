import request from 'supertest';
import { app } from '@/app';
import {
  afterAll,
  beforeAll,
  describe, expect, it
} from 'vitest';

describe('Register (E2E)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should register an org', async () => {
    const response = await request(app.server)
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

    expect(response.statusCode).toBe(201);
  });
});

