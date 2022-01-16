import { useContext } from 'react';

import { ShoppingCartContext } from './ShoppingCart.context';

export default function useShoppingCart() {
  const { addItem, getItemQuantity, removeItem } = useContext(ShoppingCartContext);

  return {
    addItem,
    getItemQuantity,
    removeItem,
  };
}
