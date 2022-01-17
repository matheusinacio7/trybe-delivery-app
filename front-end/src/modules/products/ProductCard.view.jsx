import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { useShoppingCart } from '../shoppingCart';

export default function ProductCard({ id, name, image, price }) {
  const { addItem, setItemQuantity, getItemQuantity, removeItem } = useShoppingCart();
  const [quantity, setQuantity] = useState(getItemQuantity(id));

  useEffect(() => {
    setItemQuantity({ id, quantity });
  }, [quantity]);

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
          onClick={ () => {
            removeItem(id);
            setQuantity((previous) => Math.max(previous - 1, 0));
          } }
        >
          -
        </button>
        <input
          data-testid={ `customer_products__input-card-quantity-${id}` }
          value={ quantity }
          type="number"
          onChange={ (e) => {
            setQuantity(Math.max(Number(e.target.value), 0));
          } }
        />
        <button
          data-testid={ `customer_products__button-card-add-item-${id}` }
          type="button"
          onClick={ () => {
            addItem(id);
            setQuantity((previous) => previous + 1);
          } }
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
