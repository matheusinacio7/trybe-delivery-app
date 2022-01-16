import React from 'react';
import { Routes, Router } from '../router';
import { ShoppingCartProvider } from '../shoppingCart';

export default function App() {
  return (
    <Router>
      <ShoppingCartProvider>
        <Routes />
      </ShoppingCartProvider>
    </Router>
  );
}
