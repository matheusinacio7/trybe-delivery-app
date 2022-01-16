import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';

export const ShoppingCartContext = createContext({
  addItem: () => {},
  setItemQuantity: () => {},
  getItemQuantity: () => {},
  removeItem: () => {},
});

const reducer = (state, action) => {
  switch (action.type) {
  case 'ADD_ITEM':
    if (state.has(action.id)) {
      state.set(action.id, state.get(action.id) + 1);
      return state;
    }
    state.set(action.id, 1);
    return state;
  case 'REMOVE_ITEM':
    if (state.has(action.id)) {
      state.set(action.id, state.get(action.id) - 1);
      if (state.get(action.id) === 0) {
        state.delete(action.id);
      }
      return state;
    }
    return state;
  case 'SET_ITEM_QUANTITY':
    if (action.quantity > 0) {
      state.set(action.id, action.quantity);
    } else {
      state.delete(action.id);
    }
    return state;
  default:
    return state;
  }
};

export function ShoppingCartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, new Map());

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
