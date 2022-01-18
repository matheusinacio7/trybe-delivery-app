const { describe, it } = require('@jest/globals');
const request = require('supertest');

const server = require('../../server');

const { getToken, resetDb } = require('../helpers');

const token = getToken();

describe('POST /sales', () => {
  beforeEach(function () {
    resetDb();
  });

  const url = '/sales';

  const tokenHeader = ['Authorization', token];

  const saleWithInvalidProductQuantity = {
    sellerId: 2,
    totalPrice: '10.00',
    deliveryAddress: '123 Main St',
    deliveryNumber: '123456789',
    products: [
      {
        productId: 1,
        quantity: 0,
      },
      {
        productId: 2,
        quantity: 1,
      },
    ],
  };

  const saleWithInvalidProductId = {
    sellerId: 2,
    totalPrice: '10.00',
    deliveryAddress: '13 Main St',
    deliveryNumber: '123456789',
    products: [
      {
        productId: 0,
        quantity: 1,
      },
      {
        productId: 2,
        quantity: 1,
      },
    ],
  };

  const saleWithInvalidSellerId = {
    sellerId: 0,
    totalPrice: '10.00',
    deliveryAddress: '1234 Main St',
    deliveryNumber: '123456789',
    products: [
      {
        productId: 1,
        quantity: 1,
      },
      {
        productId: 2,
        quantity: 1,
      },
    ],
  };

  const validSale = {
    sellerId: 2,
    totalPrice: '10.00',
    deliveryAddress: '1238 Main St',
    deliveryNumber: '123456789',
    products: [
      {
        productId: 1,
        quantity: 1,
      },
      {
        productId: 2,
        quantity: 1,
      },
    ],
  };

  describe('returns an authentication error', () => {
    it('when no token is provided', () => request(server)
      .post(url)
      .send(validSale)
      .expect(401)
      .then((res) => {
        expect(res.body.error.message).toBe('A token is required');
      }));

    it('when an invalid token is provided', () => request(server)
      .post(url)
      .set(tokenHeader[0], 'invalid-token')
      .send(validSale)
      .expect(401)
      .then((res) => {
        expect(res.body.error.message).toBe('Invalid token');
      }));
  });

  describe('returns a validation error with invalid', () => {
    it('product quantity', () => request(server)
      .post(url)
      .set(...tokenHeader)
      .send(saleWithInvalidProductQuantity)
      .expect(400)
      .then((response) => {
        expect(response.body.error.message).toBe('Invalid product quantity');
        expect(response.body.error.code).toBe('VALIDATION_ERROR');
      }));

    it('product id', () => request(server)
      .post(url)
      .set(...tokenHeader)
      .send(saleWithInvalidProductId)
      .expect(400)
      .then((response) => {
        expect(response.body.error.message).toBe('Invalid product id');
        expect(response.body.error.code).toBe('VALIDATION_ERROR');
      }));

    it('seller id', () => request(server)
      .post(url)
      .set(...tokenHeader)
      .send(saleWithInvalidSellerId)
      .expect(400)
      .then((response) => {
        expect(response.body.error.message).toBe('Invalid seller id');
        expect(response.body.error.code).toBe('VALIDATION_ERROR');
      }));
  });

  describe('returns a success response with valid', () => {
    it('sale', () => request(server)
      .post(url)
      .set(...tokenHeader)
      .send(validSale)
      .expect(201)
      .then((response) => {
        expect(response.body.sale.sellerId).toBe(validSale.sellerId);
        expect(response.body.sale.totalPrice).toBe(validSale.totalPrice);
        expect(response.body.sale.deliveryAddress).toBe(validSale.deliveryAddress);
        expect(response.body.sale.deliveryNumber).toBe(validSale.deliveryNumber);
        expect(response.body.sale.products).toEqual(validSale.products);
      }));
  });
});
