import React from 'react';

import { useParams } from 'react-router';

import Layout from '../layout';
import { Button } from '../buttons';
import { useApi } from '../api/hooks';
import { getById } from '../api/sales';

import * as localStorage from '../localStorage';

const ORDER_NUMBER_SIZE = 4;

const testIds = {
  orderNumber: 'customer_order_details__element-order-details-label-order-id',
  sellerName: 'customer_order_details__element-order-details-label-seller-name',
  orderDate: 'customer_order_details__element-order-details-label-order-date',
  orderStatus: 'customer_order_details__element-order-details-label-delivery-status',
  markAsDelivered: 'customer_order_details__button-delivery-check',
};

export default function CustomerOrderDetails() {
  const { orderId } = useParams();

  const { result } = useApi(getById, {
    saleId: orderId,
    token: localStorage.get('user').token,
  });

  console.log(result);

  return (
    <Layout context="customer">
      <main>
        <h1>Detalhes do pedido</h1>
        { result && (
          <section>
            <p>
              <span>Pedido </span>
              <span data-testid={ testIds.orderNumber }>
                { String(result.sale.id).padStart(ORDER_NUMBER_SIZE, '0') }
              </span>
            </p>
            <p>
              <span>Vendido por: </span>
              <span data-testid={ testIds.sellerName }>
                { result.sale.sellerName }
              </span>
            </p>
            <p data-testid={ testIds.orderDate }>
              { new Date(result.sale.saleDate).toLocaleDateString('pt-BR') }
            </p>
            <p data-testid={ testIds.orderStatus }>
              { result.sale.status }
            </p>
            <Button testId={ testIds.markAsDelivered }>
              Marcar como entregue
            </Button>
          </section>
        ) }
      </main>
    </Layout>
  );
}
