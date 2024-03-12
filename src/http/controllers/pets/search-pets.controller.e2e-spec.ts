import request from 'supertest';
import { app } from '@/app';
import {
  afterAll,
  beforeAll,
  describe, expect, it
} from 'vitest';

describe('Search Pets (E2E)', () => {
  beforeAll(async () => {
    await app.ready();

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

    await request(app.server)
      .post('/pets')
      .set('Cookie', cookies)
      .send({
        name: 'Teste',
        age: 'adulto',
        size: 'médio',
        energyLevel: 'baixo',
        independenceLevel: 'baixo',
        about: 'Teste',
        environment: 'casa',
      });

    await request(app.server)
      .post('/pets')
      .set('Cookie', cookies)
      .send({
        name: 'Teste 2',
        age: 'filhote',
        size: 'pequeno',
        energyLevel: 'alto',
        independenceLevel: 'baixo',
        about: 'Teste 2',
        environment: 'casa',
      });
  });

  afterAll(async () => {
    await app.close();
  });

  it('should list pets by city', async () => {

    const response = await request(app.server)
      .get('/pets/search')
      .query({ city: 'Fortaleza', });

    expect(response.statusCode).toBe(200);
    expect(response.body.pets.length).toBe(3);
    expect(response.body.pets).toEqual(expect.arrayContaining([
      expect.objectContaining({ name: 'Rex' }),
      expect.objectContaining({ name: 'Teste' }),
      expect.objectContaining({ name: 'Teste 2' }),
    ]));
  });

  it('should list pets by city and size', async () => {

    const response = await request(app.server)
      .get('/pets/search')
      .query({ city: 'Fortaleza', size: 'médio' });

    expect(response.statusCode).toBe(200);
    expect(response.body.pets.length).toBe(1);
    expect(response.body.pets).toEqual(expect.arrayContaining([
      expect.objectContaining({ name: 'Teste' }),
    ]));
  });
});
