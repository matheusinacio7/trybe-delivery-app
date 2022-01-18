import React, { useEffect, useState } from 'react';

import Layout from '../layout';

import { Button } from '../buttons';

import * as localStorage from '../localStorage';
import * as salesApi from '../api/sales';

export default function CustomerOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const { token } = localStorage.get('user');
    const id = localStorage.get('userId');
    salesApi.getByCustomer({
      customerId: id,
      token,
    })
      .then(({ sales }) => {
        setOrders(sales);
      })
      .catch(console.error);
  }, []);

  return (
    <Layout context="customer">
      <main>
        <ul>
          {
            orders.map(({ id, saleDate, totalPrice, status }) => (
              <li key={ id }>
                <Button
                  navigateTo={ `/customer/orders/${id}` }
                >
                  <section>
                    <div>Pedido</div>
                    <div
                      data-testid={ `customer_orders__element-order-id-${id}` }
                    >
                      { id }
                    </div>
                  </section>
                  <section
                    data-testid={ `customer_orders__element-delivery-status-${id}` }
                  >
                    { status }
                  </section>
                  <section>
                    <div
                      data-testid={ `customer_orders__element-order-date-${id}` }
                    >
                      { new Date(saleDate).toLocaleDateString('pt-BR') }
                    </div>
                    <div>
                      <span>R$ </span>
                      <span
                        data-testid={ `customer_orders__element-card-price-${id}` }
                      >
                        { totalPrice.replace('.', ',') }
                      </span>
                    </div>
                  </section>
                </Button>
              </li>
            ))
          }
        </ul>
      </main>
    </Layout>
  );
}
