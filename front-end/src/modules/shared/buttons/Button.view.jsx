import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function Button({ disabled, children, testId, type, navigateTo }) {
  if (navigateTo) {
    return (
      <button
        disabled={ disabled }
        data-testid={ testId }
        type="button"
      >
        <Link to={ navigateTo }>{ children }</Link>
      </button>
    );
  }

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
  navigateTo: PropTypes.string,
};

Button.defaultProps = {
  type: 'button',
  disabled: false,
  navigateTo: null,
};
