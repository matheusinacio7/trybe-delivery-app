const { describe, it } = require('@jest/globals');
const request = require('supertest');

const server = require('../../server');

const { resetDb } = require('../helpers');

const { sign } = require('../../token');

const descriptionsThanksLint = {
  invalidCurrentStatus: null,
  correct: null,
};

descriptionsThanksLint.invalidCurrentStatus = 'for a sale made by the customer, ';
descriptionsThanksLint.invalidCurrentStatus += 'with the correct status update, '; 
descriptionsThanksLint.invalidCurrentStatus += 'but invalid current status, ';
descriptionsThanksLint.invalidCurrentStatus += 'returns a forbidden error';

descriptionsThanksLint.correct = 'for a sale made by the customer, ';
descriptionsThanksLint.correct += 'with the correct status update, returns a success message';

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
        status: 'Em Trânsito',
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

    it.only(descriptionsThanksLint.invalidCurrentStatus, () => {
      const promises = saleIdsInvalidStatuses.map((saleId) => request(server)
        .put(`${url}/${saleId}`)
        .set(...tokenHeader)
        .send(validStatusUpdate)
        .expect(403));

      return Promise.all(promises);
    });

    it(descriptionsThanksLint.correct, () => request(server)
      .put(`${url}/${validSaleId}`)
      .set(...tokenHeader)
      .send(validStatusUpdate)
      .expect(200)
      .expect((response) => {
        expect(response.body).toHaveProperty('message');
      }));
  });
});
