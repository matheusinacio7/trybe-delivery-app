import React from 'react';

import Layout from '../layout';

import { getAll } from '../api/products';
import { useApi } from '../api/hooks';

import ProductCard from './ProductCard.view';

export default function Products() {
  const { result } = useApi(getAll);

  return (
    <Layout context="customer">
      <main>
        <h1>Produtos!</h1>
        { result && result.products && result.products.map((product) => (
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
