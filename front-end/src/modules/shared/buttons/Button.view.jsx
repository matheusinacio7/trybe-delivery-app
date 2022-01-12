import React from 'react';
import PropTypes from 'prop-types';

export default function Button({ disabled, children, testId, type }) {
  //! Isso ta aqui por causa da regra de button type ter de ser estatico (???????)
  if (type === 'button') {
    return (
      <button
        disabled={ disabled }
        type="button"
        data-testid={ testId }
      >
        { children }
      </button>
    );
  }

  return (
    <button
      disabled={ disabled }
      type="submit"
      data-testid={ testId }
    >
      { children }
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.string.isRequired,
  testId: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['button', 'submit']),
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  type: 'button',
  disabled: false,
};
