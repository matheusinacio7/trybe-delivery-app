import React from 'react';

export function Button({ children, testId }) {
  return <button data-testid={ testId }>{ children }</button>
}
