import { useContext } from 'react';

import { ShoppingCartContext } from './ShoppingCart.context';

export default function useShoppingCart() {
  const {
    addItem,
    setItemQuantity,
    getItemQuantity,
    removeItem,
  } = useContext(ShoppingCartContext);

  return {
    addItem,
    setItemQuantity,
    getItemQuantity,
    removeItem,
  };
}
