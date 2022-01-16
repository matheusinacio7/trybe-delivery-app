import React from 'react';
import PropTypes from 'prop-types';

import { useShoppingCart } from '../shoppingCart';

export default function ProductCard({ id, name, image, price }) {
  const { addItem, getItemQuantity, removeItem } = useShoppingCart();

  return (
    <div>
      <h1
        data-testid={ `customer_products__element-card-title-${id}` }
      >
        { name }
      </h1>
      <img
        data-testid={ `customer_products__img-card-bg-image-${id}` }
        src={ image }
        alt={ name }
      />
      <p
        data-testid={ `customer_products__element-card-price-${id}` }
      >
        { price.replace('.', ',') }
      </p>
      <div>
        <button
          data-testid={ `customer_products__button-card-rm-item-${id}` }
          type="button"
          onClick={ () => removeItem(id) }
        >
          -
        </button>
        <input
          data-testid={ `customer_products__input-card-quantity-${id}` }
          value={ getItemQuantity(id) }
          type="number"
          readOnly
        />
        <button
          data-testid={ `customer_products__button-card-add-item-${id}` }
          type="button"
          onClick={ () => addItem(id) }
        >
          +
        </button>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
};
