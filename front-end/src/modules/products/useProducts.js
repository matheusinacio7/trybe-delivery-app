import { useContext } from 'react';

import { ProductsContext } from './Products.context';

export default function useProducts() {
  const { products, error, loading } = useContext(ProductsContext);

  return { products, error, loading };
}
