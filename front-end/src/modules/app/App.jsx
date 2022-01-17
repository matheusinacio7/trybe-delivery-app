import React from 'react';
import { Routes, Router } from '../router';
import { ProductsProvider } from '../products/Products.context';
import { ShoppingCartProvider } from '../shoppingCart';

export default function App() {
  return (
    <Router>
      <ProductsProvider>
        <ShoppingCartProvider>
          <Routes />
        </ShoppingCartProvider>
      </ProductsProvider>
    </Router>
  );
}
