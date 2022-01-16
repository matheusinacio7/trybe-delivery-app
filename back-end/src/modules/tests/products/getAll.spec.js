const { describe, it } = require('@jest/globals');
const request = require('supertest');

const server = require('../../server');
const { resetDb } = require('../helpers');

describe('GET /products', () => {
  beforeEach(function () {
    resetDb();
  });

  const url = '/products';
  const allProductsInDbLength = 11;

  describe('returns a list of all products', () => {
    it('with all products', () => request(server)
      .get(url)
      .expect(200)
      .then((response) => {
        expect(response.body.products.length).toBe(allProductsInDbLength);
      }));
  });
});
