const { describe, it } = require('@jest/globals');
const request = require('supertest');

const server = require('../../server');

const { resetDb } = require('../helpers');

const { sign } = require('../../token');

const descriptionsThanksLint = {
  customerStatus: null,
  customerCorrect: null,
  sellerCorrect: null,
};

descriptionsThanksLint.customerStatus = 'for a sale made by the customer, ';
descriptionsThanksLint.customerStatus += 'with the correct status update, '; 
descriptionsThanksLint.customerStatus += 'but invalid current status, ';
descriptionsThanksLint.customerStatus += 'returns a forbidden error';

descriptionsThanksLint.customerCorrect = 'for a sale made by the customer, ';
descriptionsThanksLint.customerCorrect += 'with the correct status update, returns a scs message';

descriptionsThanksLint.sellerCorrect = 'for a sale made by the seller, ';
descriptionsThanksLint.sellerCorrect += 'with the correct status update, returns a success message';

const EN_ROUTE_STATUS = 'Em Trânsito';

describe('PUT /sales', () => {
  beforeEach(function () {
    resetDb();
  });

  const url = '/sales';

  describe('for a CUSTOMER', () => {
    const customerId = 1;
    let tokenHeader;

    const validSaleId = 4;
    const saleIdNotMadeByTheCustomer = 2;
    const saleIdsInvalidStatuses = [1, 3, 5];

    const validStatusUpdate = {
      status: 'Entregue',
    };

    const invalidStatusUpdates = [
      {
        status: 'Pendente',
      },
      {
        status: 'Preparando',
      },
      {
        status: EN_ROUTE_STATUS,
      },
    ];

    beforeAll(function () {
      const token = sign({ id: customerId, role: 'customer' });
      tokenHeader = ['Authorization', token];
    });

    it('for a sale not made by the customer, returns a forbidden error', () => request(server)
      .put(`${url}/${saleIdNotMadeByTheCustomer}`)
      .set(...tokenHeader)
      .send(validStatusUpdate)
      .expect(403));

    it('for invalid status updates, returns a forbidden error', () => {
      const invalidStatusTests = invalidStatusUpdates.map((invalidStatusUpdate) => request(server)
        .put(`${url}/${validSaleId}`)
        .set(...tokenHeader)
        .send(invalidStatusUpdate)
        .expect(403));

      return Promise.all(invalidStatusTests);
    });

    it(descriptionsThanksLint.customerStatus, () => {
      const promises = saleIdsInvalidStatuses.map((saleId) => request(server)
        .put(`${url}/${saleId}`)
        .set(...tokenHeader)
        .send(validStatusUpdate)
        .expect(403));

      return Promise.all(promises);
    });

    it(descriptionsThanksLint.customerCorrect, () => request(server)
      .put(`${url}/${validSaleId}`)
      .set(...tokenHeader)
      .send(validStatusUpdate)
      .expect(200)
      .expect((response) => {
        expect(response.body).toHaveProperty('message');
      }));
  });

  describe('for a SELLER', () => {
    const sellerId = 2;
    let tokenHeader;

    const saleIdNotMadeByTheSeller = 3;

    const validStatusUpdates = [
      {
        update: {
          status: 'Preparando',
        },
        saleId: 1,
      },
      {
        update: {
          status: EN_ROUTE_STATUS,
        },
        saleId: 6,
      },
    ];

    const invalidStatusUpdates = [
      {
        update: {
          status: 'Pendente',
        },
        saleId: 1,
      },
      {
        update: {
          status: 'Entregue',
        },
        saleId: 6,
      },
      {
        update: {
          status: EN_ROUTE_STATUS,
        },
        saleId: 4,
      },
    ];

    beforeAll(function () {
      const token = sign({ id: sellerId, role: 'seller' });
      tokenHeader = ['Authorization', token];
    });

    it('for a sale not made by the seller, returns a forbidden error', () => request(server)
      .put(`${url}/${saleIdNotMadeByTheSeller}`)
      .set(...tokenHeader)
      .send(validStatusUpdates[0].update)
      .expect(403));

    it('for invalid status updates, returns a forbidden error', () => {
      const invalidStatusTests = invalidStatusUpdates.map((invalidStatusUpdate) => request(server)
        .put(`${url}/${invalidStatusUpdate.saleId}`)
        .set(...tokenHeader)
        .send(invalidStatusUpdate.update)
        .expect(403));

      return Promise.all(invalidStatusTests);
    });

    it(descriptionsThanksLint.sellerCorrect, () => {
      const promises = validStatusUpdates.map((validStatusUpdate) => request(server)
        .put(`${url}/${validStatusUpdate.saleId}`)
        .set(...tokenHeader)
        .send(validStatusUpdate.update)
        .expect(200));

      return Promise.all(promises);
    });
  });
});
