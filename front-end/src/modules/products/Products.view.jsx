import React from 'react';

import Layout from '../layout';

import useProducts from './useProducts';

import ProductCard from './ProductCard.view';

export default function Products() {
  const { products } = useProducts();

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
      </main>
    </Layout>
  );
}
