import React from 'react';

import { Heading } from '../text';
import Layout from '../layout';

import { useProducts } from '../products';
import { useShoppingCart } from '../shoppingCart';

export default function Checkout() {
  const { products } = useProducts();
  const { cartState } = useShoppingCart();

  const renderTableHead = () => (
    <thead>
      <tr>
        <th>Produto</th>
        <th>Quantidade</th>
        <th>Preço Unitário</th>
        <th>Preço Total</th>
        <th>Remover Item</th>
      </tr>
    </thead>
  );

  const renderTableBody = () => {
    if (cartState.size === 0) {
      return <Heading level={ 2 }>Seu carrinho está vazio!</Heading>;
    }

    return (
      <tbody>
        {
          products && Array.from(cartState.entries()).map(([productId, quantity]) => {
            const product = products.find((p) => p.id === productId);

            return (
              <tr key={ productId }>
                <td>{ product.name }</td>
                <td>{ quantity }</td>
                <td>{ product.price.replace('.', ',') }</td>
                <td>{ (product.price * quantity).toFixed(2).replace('.', ',') }</td>
                <td>
                  <button type="button">Remover</button>
                </td>
              </tr>
            );
          })
        }
      </tbody>
    );
  };

  return (
    <Layout context="customer">
      <main>
        { console.log({ cartState, products }) }
        { console.log(Array.from(cartState.entries())) }
        <Heading level={ 1 }>Finalizar pedido</Heading>
        <table>
          { renderTableHead() }
          { renderTableBody() }
        </table>
      </main>
    </Layout>
  );
}
