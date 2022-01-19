import React, { useEffect, useState } from 'react';

import Layout from '../layout';

import { Button } from '../buttons';

import * as localStorage from '../localStorage';
import * as salesApi from '../api/sales';

export default function SellerOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const { token } = localStorage.get('user');
    const id = localStorage.get('userId');
    salesApi.getBySeller({
      sellerId: id,
      token,
    })
      .then(({ sales }) => {
        setOrders(sales);
        console.log(orders);
      })
      .catch(console.error);
  }, []);

  return (
    <Layout context="seller">
      <main>
        <ul>
          {
            orders.map(({
              id,
              saleDate,
              totalPrice,
              status,
              deliveryAddress,
              deliveryNumber,
            }) => (
              <li key={ id }>
                <Button
                  navigateTo={ `/seller/orders/${id}` }
                >
                  <section>
                    <div>Pedido</div>
                    <div
                      data-testid={ `seller_orders__element-order-id-${id}` }
                    >
                      { id }
                    </div>
                  </section>
                  <section
                    data-testid={ `seller_orders__element-delivery-status-${id}` }
                  >
                    { status }
                  </section>
                  <section>
                    <div
                      data-testid={ `seller_orders__element-order-date-${id}` }
                    >
                      { new Date(saleDate).toLocaleDateString('pt-BR') }
                    </div>
                    <div>
                      <span>R$ </span>
                      <span
                        data-testid={ `seller_orders__element-card-price-${id}` }
                      >
                        { totalPrice.replace('.', ',') }
                      </span>
                    </div>
                  </section>
                  <section>
                    <div
                      data-testid={ `seller_orders__element-card-address-${id}` }
                    >
                      { `${deliveryAddress}, ${deliveryNumber}` }
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
