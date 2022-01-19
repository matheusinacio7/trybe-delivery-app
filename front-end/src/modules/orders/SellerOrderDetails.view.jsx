import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router';

import Layout from '../layout';
import { Button } from '../buttons';
import { useApi } from '../api/hooks';
import { getById, updateStatus } from '../api/sales';

import * as localStorage from '../localStorage';

const ORDER_NUMBER_SIZE = 4;

const testIds = {
  orderNumber: 'seller_order_details__element-order-details-label-order-id',
  sellerName: 'seller_order_details__element-order-details-label-seller-name',
  orderDate: 'seller_order_details__element-order-details-label-order-date',
  orderStatus: 'seller_order_details__element-order-details-label-delivery-status',
  markAsBeingPrepared: 'seller_order_details__button-preparing-check',
  markAsEnRoute: 'seller_order_details__button-dispatch-check',
  productNumber: 'seller_order_details__element-order-table-item-number',
  productName: 'seller_order_details__element-order-table-name',
  productQuantity: 'seller_order_details__element-order-table-quantity',
  productPrice: 'seller_order_details__element-order-table-unit-price',
  productTotal: 'seller_order_details__element-order-table-sub-total',
  saleTotal: 'seller_order_details__element-order-total-price',
};

export default function CustomerOrderDetails() {
  const { orderId } = useParams();
  const [status, setStatus] = useState(null);

  const { result } = useApi(getById, {
    saleId: orderId,
    token: localStorage.get('user').token,
  });

  useEffect(() => {
    if (!result) return;

    setStatus(result.sale.status);
  }, [result]);

  const updateSaleStatus = (newStatus) => {
    updateStatus({
      saleId: orderId,
      status: newStatus,
      token: localStorage.get('user').token,
    })
      .then(() => {
        setStatus(newStatus);
      })
      .catch(console.error);
  };

  const renderTableHead = () => (
    <thead>
      <tr>
        <th>Num</th>
        <th>Produto</th>
        <th>Quantidade</th>
        <th>Preço Unitário</th>
        <th>Preço Total</th>
      </tr>
    </thead>
  );

  const renderTableBody = (sale) => {
    const products = sale ? sale.products : null;

    return (
      <tbody>
        {
          products.map((product, index) => (
            <tr key={ product.id }>
              <td data-testid={ `${testIds.productNumber}-${index}` }>
                { index + 1 }
              </td>
              <td data-testid={ `${testIds.productName}-${index}` }>
                { product.name }
              </td>
              <td data-testid={ `${testIds.productQuantity}-${index}` }>
                { product.quantity }
              </td>
              <td data-testid={ `${testIds.productPrice}-${index}` }>
                { product.price.replace('.', ',') }
              </td>
              <td data-testid={ `${testIds.productTotal}-${index}` }>
                { (product.price * product.quantity).toFixed(2).replace('.', ',') }
              </td>
            </tr>
          ))
        }
      </tbody>
    );
  };

  return (
    <Layout context="seller">
      <main>
        <h1>Detalhes do pedido</h1>
        { result && (
          <>
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
                { status }
              </p>
              <Button
                disabled={ status !== 'Pendente' }
                onClick={ () => updateSaleStatus('Preparando') }
                testId={ testIds.markAsBeingPrepared }
              >
                Marcar como preparando
              </Button>
              <Button
                disabled={ status !== 'Preparando' }
                onClick={ () => updateSaleStatus('Em Trânsito') }
                testId={ testIds.markAsEnRoute }
              >
                Marcar como enviado
              </Button>
            </section>
            <section>
              <table>
                { renderTableHead() }
                { renderTableBody(result.sale) }
              </table>
              <p>
                <span>Total: R$ </span>
                <span data-testid={ testIds.saleTotal }>
                  { result.sale.totalPrice.replace('.', ',') }
                </span>
              </p>
            </section>
          </>
        ) }
      </main>
    </Layout>
  );
}
