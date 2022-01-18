import React, { useEffect, useState } from 'react';

import Layout from '../layout';

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
      <main><h1>Meus pedidos!</h1></main>
    </Layout>
  );
}
