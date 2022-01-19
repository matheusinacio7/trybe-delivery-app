
const { describe, it } = require('@jest/globals');
const request = require('supertest');

const server = require('../../server');

const { resetDb } = require('../helpers');

const { sign } = require('../../token');

describe('PUT /sales', () => {
  beforeEach(function () {
    resetDb();
  });

  const url = '/sales';

  describe('for a CUSTOMER', () => {
    const customerId = 3;;
    let tokenHeader;

    const validSaleId = 1;
    const saleIdNotMadeByTheCustomer = 2;
    const saleIdsWithInvalidCurrentStatuses = [3, 4, 5];

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
      {
        status: '',
      },
    ];

    beforeAll(function () {
      const token = sign({ id: customerId, role: 'customer' });
      tokenHeader = ['Authorization', token];
    });

    it.only('for a sale not made by the customer, returns a forbidden error', () => request(server)
      .put(`${url}/${saleIdNotMadeByTheCustomer}`)
      .set(...tokenHeader)
      .send(validStatusUpdate)
      .expect(403));

    it('for invalid status updates, returns a forbidden error', () => invalidStatusUpdates.forEach((invalidStatusUpdate) => request(server)
      .put(`${url}/${validSaleId}`)
      .set(...tokenHeader)
      .send(invalidStatusUpdate)
      .expect(403)));

    it('for a sale made by the customer, with the correct status update, but invalid current status, returns a forbidden error', () => saleIdsWithInvalidCurrentStatuses.forEach((saleIdWithInvalidCurrentStatus) => request(server)
      .put(`${url}/${saleIdWithInvalidCurrentStatus}`)
      .set(...tokenHeader)
      .send(validStatusUpdate)
      .expect(403)));
  });
});
