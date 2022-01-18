const { describe, it } = require('@jest/globals');
const request = require('supertest');

const server = require('../../server');

const { resetDb } = require('../helpers');

const { sign } = require('../../token');

describe('GET /sales/:id', () => {
  beforeEach(function () {
    resetDb();
  });

  const url = '/sales';

  describe('for a CUSTOMER', () => {
    const customerId = 3;
    const saleId = 1;

    beforeAll(function () {
      const token = sign({ id: customerId, role: 'customer' });
      tokenHeader = ['Authorization', token];
    });

    it('for a sale not made by the customer, returns a forbidden error', () => request(server)
      .get(`${url}/2`)
      .set(...tokenHeader)
      .expect(403));

    it('for a sale made by the customer, returns the sale with all products', () => request(server)
      .get(`${url}/${saleId}`)
      .set(...tokenHeader)
      .expect(200)
      .then((response) => {
        console.log(response);
      }));
  });
});
