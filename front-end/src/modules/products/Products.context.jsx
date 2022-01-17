import React, { createContext } from 'react';
import PropTypes from 'prop-types';

import { useApi } from '../api/hooks';
import { getAll } from '../api/products';

export const ProductsContext = createContext({
  products: [],
  error: null,
  loading: true,
});

export const ProductsProvider = ({ children }) => {
  const { result, error, loading } = useApi(getAll);

  return (
    <ProductsContext.Provider
      value={ {
        products: result?.products,
        error,
        loading,
      } }
    >
      { children }
    </ProductsContext.Provider>
  );
};

ProductsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
