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
    let tokenHeader;

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
        expect(response.body.sale.id).toBe(saleId);
        expect(response.body.sale.userId).toBe(customerId);
        expect(response.body.sale.products.length).toBe(1);
      }));
  });

  describe.only('for a SELLER', () => {
    const sellerId = 2;
    const saleId = 1;
    let tokenHeader;

    beforeAll(function () {
      const token = sign({ id: sellerId, role: 'seller' });
      tokenHeader = ['Authorization', token];
    });

    it('for a sale not made by the seller, returns a forbidden error', () => request(server)
      .get(`${url}/3`)
      .set(...tokenHeader)
      .expect(403));

    it('for a sale made by the seller, returns the sale with all products', () => request(server)
      .get(`${url}/${saleId}`)
      .set(...tokenHeader)
      .expect(200)
      .then((response) => {
        expect(response.body.sale.id).toBe(saleId);
        expect(response.body.sale.sellerId).toBe(sellerId);
        expect(response.body.sale.products.length).toBe(1);
      }));
  });
});
