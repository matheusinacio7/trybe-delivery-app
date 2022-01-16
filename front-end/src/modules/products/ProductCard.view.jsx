import React from 'react';

export default function ProductCard({ id, name, image, price }) {
  return (
    <div>
      <h1
        data-testid={`customer_products__element-card-title-${id}`}
      >
        { name }
      </h1>
      <img
        data-testid={`customer_products__img-card-bg-image-${id}`}
        src={ image }
        alt={ name }
      />
      <p
        data-testid={`customer_products__element-card-price-${id}`}
      >
        { price }
      </p>
      <div>
        <button
          data-testid={`customer_products__button-card-rm-item-${id}`}
        >
          -
        </button>
        <input
          data-testid={`customer_products__input-card-quantity-${id}`}
          value={ 1 }
          type="number"
        />
        <button
          data-testid={`customer_products__button-card-add-item-${id}`}
        >
          +
        </button>
      </div>
    </div>
  );
}
