import React from 'react';

import Layout from '../layout';

import useProducts from './useProducts';
import { useShoppingCart } from '../shoppingCart';

import { Button } from '../buttons';

import ProductCard from './ProductCard.view';

export default function Products() {
  const { products } = useProducts();
  const { total } = useShoppingCart();

  return (
    <Layout context="customer">
      <main>
        <h1>Produtos!</h1>
        { products && products.map((product) => (
          <ProductCard
            key={ product.id }
            id={ product.id }
            name={ product.name }
            image={ product.image }
            price={ product.price }
          />
        )) }
        <div>
          <Button
            navigateTo="/customer/checkout"
            testId="customer_products__button-cart"
            disabled={ total === 0 }
          >
            <span>Ver carrinho: </span>
            <span>R$ </span>
            <span data-testid="customer_products__checkout-bottom-value">
              { total.toFixed(2).replace('.', ',') }
            </span>
          </Button>
        </div>
      </main>
    </Layout>
  );
}
