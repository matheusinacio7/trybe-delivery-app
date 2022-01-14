const { describe, it } = require('@jest/globals');
const request = require('supertest');

const server = require('../../server');

const { resetDb } = require('../helpers');

describe('POST /user', () => {
  const url = '/user';

  const userWithInvalidEmail = {
    name: 'Jest McTest User',
    email: 'invalid@email',
    password: '123456',
  };

  const userWithInvalidPassword = {
    name: 'Jest McTest User',
    email: 'valid@email.com',
    password: '12345',
  };

  const userWithInvalidName = {
    name: 'Jest',
    email: 'valid@email.com',
    password: '123456',
  };

  const validUser = {
    name: 'Jest McTest User',
    email: 'valid@email.com',
    password: '123456',
  };

  describe('returns a validation error with invalid', () => {
    it('name', () => request(server)
      .post(url)
      .send(userWithInvalidName)
      .expect(400)
      .then((response) => {
        expect(response.body.error.message).toBe('Invalid name');
        expect(response.body.error.code).toBe('VALIDATION_ERROR');
      }));

    it('email', () => request(server)
      .post(url)
      .send(userWithInvalidEmail)
      .expect(400)
      .then((response) => {
        expect(response.body.error.message).toBe('Invalid email');
        expect(response.body.error.code).toBe('VALIDATION_ERROR');
      }));
    
    it('password', () => request(server)
      .post(url)
      .send(userWithInvalidPassword)
      .expect(400)
      .then((response) => {
        expect(response.body.error.message).toBe('Invalid password');
        expect(response.body.error.code).toBe('VALIDATION_ERROR');
      }));
  });

  it('returns a token when the user is registered successfully', async () => {
    resetDb();
    await request(server)
      .post(url)
      .send(validUser)
      .expect(201)
      .then((response) => {
        expect(response.body.token).toBeDefined();
      }
    );
  });
});
