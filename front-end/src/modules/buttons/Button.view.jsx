import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function Button({
  disabled,
  children,
  testId,
  type,
  navigateTo,
  onClick,
}) {
  if (navigateTo) {
    return (
      <Link to={ navigateTo }>
        <button
          disabled={ disabled }
          data-testid={ testId }
          type="button"
        >
          { children }
        </button>
      </Link>
    );
  }

  //! Isso ta aqui por causa da regra de button type ter de ser estatico (???????)
  if (type === 'button') {
    return (
      <button
        disabled={ disabled }
        type="button"
        data-testid={ testId }
        onClick={ onClick }
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
      onClick={ onClick }
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
  onClick: PropTypes.func,
};

Button.defaultProps = {
  type: 'button',
  disabled: false,
  navigateTo: null,
  onClick: () => null,
};
