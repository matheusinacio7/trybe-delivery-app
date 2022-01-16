import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';

import * as localStorage from '../localStorage';

export const ShoppingCartContext = createContext({
  addItem: () => {},
  setItemQuantity: () => {},
  getItemQuantity: () => {},
  removeItem: () => {},
  clearCart: () => {},
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
  const parsedObjectState = JSON.parse(storedObject);
  const mapState = new Map();

  if (parsedObjectState) {
    Object.entries(parsedObjectState).forEach(([key, value]) => {
      mapState.set(key, value);
    });
  }

  return mapState;
};

const clearFromLocalStorage = () => {
  localStorage.remove('shoppingCart');
};

const reducer = (state, action) => {
  switch (action.type) {
  case 'ADD_ITEM':
    if (state.has(action.id)) {
      state.set(action.id, state.get(action.id) + 1);
      saveToLocalStorage(state);
      return state;
    }
    state.set(action.id, 1);
    saveToLocalStorage(state);
    return state;
  case 'REMOVE_ITEM':
    if (state.has(action.id)) {
      state.set(action.id, state.get(action.id) - 1);
      if (state.get(action.id) === 0) {
        state.delete(action.id);
      }
      saveToLocalStorage(state);
      return state;
    }
    saveToLocalStorage(state);
    return state;
  case 'SET_ITEM_QUANTITY':
    if (action.quantity > 0) {
      state.set(action.id, action.quantity);
    } else {
      state.delete(action.id);
    }
    saveToLocalStorage(state);
    return state;
  case 'CLEAR_CART':
    clearFromLocalStorage();
    return new Map();
  default:
    return state;
  }
};

export function ShoppingCartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, getFromLocalStorage());

  const addItem = (id) => {
    dispatch({ type: 'ADD_ITEM', id });
  };

  const removeItem = (id) => {
    dispatch({ type: 'REMOVE_ITEM', id });
  };

  const setItemQuantity = ({ id, quantity }) => {
    dispatch({ type: 'SET_ITEM_QUANTITY', id, quantity });
  };

  const getItemQuantity = (id) => {
    if (state.has(id)) {
      return state.get(id);
    }
    return 0;
  };

  return (
    <ShoppingCartContext.Provider
      value={ {
        addItem,
        getItemQuantity,
        setItemQuantity,
        removeItem,
      } }
    >
      { children }
    </ShoppingCartContext.Provider>
  );
}

ShoppingCartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
