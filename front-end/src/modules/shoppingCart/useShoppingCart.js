import { useEffect } from 'react';

const productQuantityMap = new Map();

export default function useShoppingCart() {
  function addItem(id) {
    if (productQuantityMap.has(id)) {
      productQuantityMap.set(id, productQuantityMap.get(id) + 1);
    } else {
      productQuantityMap.set(id, 1);
    }
  }

  function removeItem(id) {
    if (productQuantityMap.has(id)) {
      productQuantityMap.set(id, productQuantityMap.get(id) - 1);
    }

    if (productQuantityMap.get(id) === 0) {
      productQuantityMap.delete(id);
    }
  }

  function getItemQuantity(id) {
    return productQuantityMap.get(id);
  }

  return { addItem, removeItem, getItemQuantity };
}
