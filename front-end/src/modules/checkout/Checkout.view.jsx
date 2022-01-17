import React from 'react';

import { Heading } from '../text';
import Layout from '../layout';

import { useProducts } from '../products';
import { useShoppingCart } from '../shoppingCart';

export default function Checkout() {
  const { products } = useProducts();
  const { cartState, total } = useShoppingCart();

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

    const testIds = {
      productName: 'customer_checkout__element-order-table-name',
      productQuantity: 'customer_checkout__element-order-table-quantity',
      productPrice: 'customer_checkout__element-order-table-price',
      productTotal: 'customer_checkout__element-order-table-total',
      productRemove: 'customer_checkout__element-order-table-remove',
    };

    return (
      <tbody>
        {
          products && Array.from(cartState.entries()).map(([productId, quantity],
            index) => {
            const product = products.find((p) => p.id === productId);

            return (
              <tr key={ productId }>
                <td data-testid={ `${testIds.productName}-${index}` }>
                  { product.name }
                </td>
                <td data-testid={ `${testIds.productQuantity}-${index}` }>
                  { quantity }
                </td>
                <td data-testid={ `${testIds.productPrice}-${index}` }>
                  { product.price.replace('.', ',') }
                </td>
                <td data-testid={ `${testIds.productQuantity}-${index}` }>
                  { (product.price * quantity).toFixed(2).replace('.', ',') }
                </td>
                <td data-testid={ `${testIds.productRemove}-${index}` }>
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
        {/* { console.log({ cartState, products }) } */}
        { console.log(total) }
        <Heading level={ 1 }>Finalizar pedido</Heading>
        <section>
          <table>
            { renderTableHead() }
            { renderTableBody() }
          </table>
          <div>
            <span>Total: </span>
            <span>R$ </span>
            <span data-testid="customer_checkout__element-order-total-price">
              { total.toFixed(2).replace('.', ',') }
            </span>
          </div>
        </section>
      </main>
    </Layout>
  );
}
