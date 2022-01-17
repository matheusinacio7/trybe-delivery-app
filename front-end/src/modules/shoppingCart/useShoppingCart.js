import { useContext } from 'react';

import { ShoppingCartContext } from './ShoppingCart.context';

// save to local storage and clear it on logout

export default function useShoppingCart() {
  const {
    addItem,
    total,
    setItemQuantity,
    getItemQuantity,
    removeItem,
    clearCart,
  } = useContext(ShoppingCartContext);

  return {
    addItem,
    total,
    setItemQuantity,
    getItemQuantity,
    removeItem,
    clearCart,
  };
}
