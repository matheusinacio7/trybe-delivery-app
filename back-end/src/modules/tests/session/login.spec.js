const { describe, it } = require('@jest/globals');
const request = require('supertest');

const server = require('../../server');

describe('POST /session', () => {
  const url = '/user/session';

  const userWithInvalidEmail = {
    email: 'invalid@email',
    password: '123456',
  };

  const userWithInvalidPassword = {
    email: 'valid@email.com',
    password: '12345',
  };

  const validUser = {
    email: 'valid@user.com',
    password: '123456',
  };

  describe('returns a validation error with invalid', () => {
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

  it('returns a not found error when the user doesn\'t exist', () => request(server)
    .post(url)
    .send({
      email: 'non-existing@user.com',
      password: '123456',
    })
    .expect(404)
    .then((res) => {
      expect(res.body.error.message).toBe('User not found');
    }));

  it('returns a token when the user exists', () => request(server)
    .post(url)
    .send(validUser)
    .expect(201)
    .then((res) => {
      expect(res.body.token).toBeDefined();
    }
  ));
});
