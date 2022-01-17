const { describe, it } = require('@jest/globals');
const request = require('supertest');

const server = require('../../server');

const { resetDb } = require('../helpers');

describe('POST /sales', () => {
  beforeEach(function () {
    resetDb();
  });

  const url = '/sales';

  const saleWithInvalidProductQuantity = {
    userId: 3,
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
    userId: 3,
    sellerId: 2,
    totalPrice: '10.00',
    deliveryAddress: '123 Main St',
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
    userId: 3,
    sellerId: 0,
    totalPrice: '10.00',
    deliveryAddress: '123 Main St',
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

  const saleWithInvalidUserId = {
    userId: 0,
    sellerId: 2,
    totalPrice: '10.00',
    deliveryAddress: '123 Main St',
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
    userId: 3,
    sellerId: 2,
    totalPrice: '10.00',
    deliveryAddress: '123 Main St',
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

  describe('returns a validation error with invalid', () => {
    it('product quantity', () => request(server)
      .post(url)
      .send(saleWithInvalidProductQuantity)
      .expect(400)
      .then((response) => {
        expect(response.body.error.message).toBe('Invalid product quantity');
        expect(response.body.error.code).toBe('VALIDATION_ERROR');
      }));

    it('product id', () => request(server)
      .post(url)
      .send(saleWithInvalidProductId)
      .expect(400)
      .then((response) => {
        expect(response.body.error.message).toBe('Invalid product id');
        expect(response.body.error.code).toBe('VALIDATION_ERROR');
      }));

    it('seller id', () => request(server)
      .post(url)
      .send(saleWithInvalidSellerId)
      .expect(400)
      .then((response) => {
        expect(response.body.error.message).toBe('Invalid seller id');
        expect(response.body.error.code).toBe('VALIDATION_ERROR');
      }));

    it('user id', () => request(server)
      .post(url)
      .send(saleWithInvalidUserId)
      .expect(400)
      .then((response) => {
        expect(response.body.error.message).toBe('Invalid user id');
        expect(response.body.error.code).toBe('VALIDATION_ERROR');
      }));
  });

  describe.only('returns a success response with valid', () => {
    it('sale', () => request(server)
      .post(url)
      .send(validSale)
      .expect(201)
      .then((response) => {
        expect(response.body.sale.userId).toBe(validSale.userId);
        expect(response.body.sale.sellerId).toBe(validSale.sellerId);
        expect(response.body.sale.totalPrice).toBe(validSale.totalPrice);
        expect(response.body.sale.deliveryAddress).toBe(validSale.deliveryAddress);
        expect(response.body.sale.deliveryNumber).toBe(validSale.deliveryNumber);
        expect(response.body.sale.products).toBe(validSale.products);
      }));
  });
});
