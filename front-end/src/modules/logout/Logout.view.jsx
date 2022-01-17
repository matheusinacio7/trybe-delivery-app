import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useShoppingCart } from '../shoppingCart';
import * as localStorage from '../localStorage';

export default function Logout() {
  const navigate = useNavigate();
  const { clearCart } = useShoppingCart();

  useEffect(() => {
    localStorage.remove('user');
    clearCart();
    navigate('/', { replace: true });
  }, [navigate]);

  return (
    <main>
      <h1>Saindo...</h1>
    </main>
  );
}
