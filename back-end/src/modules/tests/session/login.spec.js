const { describe, it } = require('@jest/globals');
const request = require('supertest');

const server = require('../../server');

describe('POST /session', () => {
  it ("should return a not found error when the user doesn't exist", () => request(server)
    .post('/session')
    .send({
      email: 'non-existing@user.com',
      password: '123456',
    })
    .expect(404)
    .then((res) => {
      expect(res.body.message).toBe('User not found');
    }));
});
