const { describe, it } = require('@jest/globals');
const request = require('supertest');

const server = require('../../server');

describe('POST /session', () => {
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

  describe('should return a validation error with invalid', () => {
    it('email', () => request(server)
      .post('/user/session')
      .send(userWithInvalidEmail)
      .expect(400)
      .then((response) => {
        expect(response.body.error.message).toBe('Invalid email');
        expect(response.body.error.code).toBe('VALIDATION_ERROR');
      }));
    
    it('password', () => request(server)
      .post('/user/session')
      .send(userWithInvalidPassword)
      .expect(400)
      .then((response) => {
        expect(response.body.error.message).toBe('Invalid password');
        expect(response.body.error.code).toBe('VALIDATION_ERROR');
      }));
  });

  it.only("should return a not found error when the user doesn't exist", () => request(server)
    .post('/user/session')
    .send({
      email: 'non-existing@user.com',
      password: '123456',
    })
    .expect(404)
    .then((res) => {
      expect(res.body.message).toBe('User not found');
    }));
});
