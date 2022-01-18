const { describe, it } = require('@jest/globals');
const request = require('supertest');

const server = require('../../server');

const { resetDb } = require('../helpers');

const { sign } = require('../../token');

describe('GET /sales', () => {
  beforeEach(function() {
    resetDb();
  });

  const url = '/sales';

  describe('for a CUSTOMER', () => {
    const customerId = 3;
    const validSearchParam = `customer=${customerId}`;
    const invalidSearchParam = 'customer=2';
    let tokenHeader;

    beforeAll(function () {
      const token = sign({ id: customerId, role: 'customer' });
      tokenHeader = ['Authorization', token];
    });

    it('without search params, throws a forbidden error', () => request(url)
      .get(url)
      .set(...tokenHeader)
      .expect(403));

    it('with search params for a different customer, throws forbidden error', () => request(url)
      .get(`${url}?${invalidSearchParam}`)
      .set(...tokenHeader)
      .expect(403));

    it('with matching search params, returns a list of sales', () => request(url)
      .get(`${url}?${validSearchParam}`)
      .set(...tokenHeader)
      .expect(200)
      .then((response) => {
        expect(response.body.sales.length).toBe(1);
        expect(response.body.sales[0].totalPrice).toBe('100.00');
      }));
  });
});
