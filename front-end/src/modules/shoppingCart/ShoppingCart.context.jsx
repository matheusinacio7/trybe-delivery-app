import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import * as localStorage from '../localStorage';

import { useProducts } from '../products';

export const ShoppingCartContext = createContext({
  addItem: () => {},
  setItemQuantity: () => {},
  getItemQuantity: () => {},
  getTotal: () => {},
  removeItem: () => {},
  clearCart: () => {},
  cartState: new Map(),
});

const saveToLocalStorage = (state) => {
  const objectState = Array.from(state).reduce((acc, [key, value]) => {
    acc[key] = value;
    return acc;
  }, {});
  localStorage.save({ key: 'shoppingCart', data: objectState });
};

const getFromLocalStorage = () => {
  const storedObject = localStorage.get('shoppingCart');
  const mapState = new Map();

  if (storedObject) {
    Object.entries(storedObject).forEach(([key, value]) => {
      mapState.set(Number(key), value);
    });
  }

  return mapState;
};

const clearFromLocalStorage = () => {
  localStorage.remove('shoppingCart');
};

export function ShoppingCartProvider({ children }) {
  const [cartState, setCartState] = useState(() => getFromLocalStorage());
  const { products, loading } = useProducts();

  const getTotal = () => {
    if (!products || !products.length) return 0;

    let total = 0;

    cartState.forEach((quantity, id) => {
      const product = products.find((prod) => prod.id === id);
      total += product.price * quantity;
    });

    return total;
  };

  const [total, setTotal] = useState(() => getTotal());

  const updateTotal = () => {
    setTotal(getTotal());
  };

  useEffect(() => {
    if (!loading) {
      updateTotal();
    }
  }, [loading]);

  const addItem = (id) => {
    setCartState((state) => {
      if (state.has(id)) {
        state.set(id, state.get(id) + 1);
      } else {
        state.set(id, 1);
      }
      saveToLocalStorage(state);
      updateTotal();
      return state;
    });
  };

  const deleteItemAndManageStorage = (id) => {
    setCartState((state) => {
      state.delete(id);
      if (state.size === 0) {
        clearFromLocalStorage();
      } else {
        saveToLocalStorage(state);
      }
      updateTotal();
      return state;
    });
  };

  const removeItem = (id) => {
    setCartState((state) => {
      if (state.has(id)) {
        state.set(id, state.get(id) - 1);
        if (state.get(id) === 0) {
          deleteItemAndManageStorage(id);
        }
      }
      saveToLocalStorage(state);
      return state;
    });
  };

  const setItemQuantity = ({ id, quantity }) => {
    setCartState((state) => {
      if (quantity > 0) {
        state.set(id, quantity);
        saveToLocalStorage(state);
      } else {
        deleteItemAndManageStorage(id);
      }
      updateTotal();
      return state;
    });
  };

  const getItemQuantity = (id) => {
    if (cartState.has(Number(id))) {
      return cartState.get(Number(id));
    }
    return 0;
  };

  const clearCart = () => {
    setCartState(new Map());
    clearFromLocalStorage();
    setTotal(0);
  };

  return (
    <ShoppingCartContext.Provider
      value={ {
        addItem,
        total,
        getItemQuantity,
        setItemQuantity,
        removeItem,
        clearCart,
        cartState,
      } }
    >
      { children }
    </ShoppingCartContext.Provider>
  );
}

ShoppingCartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
