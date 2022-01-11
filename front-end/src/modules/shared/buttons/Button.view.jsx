import React from 'react';
import PropTypes from 'prop-types';

export default function Button({ children, testId, type }) {
  //! Isso ta aqui por causa da regra feiosa de button type ter de ser estatico (???????)
  return type === 'button'
    ? <button type="button" data-testid={ testId }>{ children }</button>
    : <button type="submit" data-testid={ testId }>{ children }</button>;
}

Button.propTypes = {
  children: PropTypes.string.isRequired,
  testId: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['button', 'submit']),
};

Button.defaultProps = {
  type: 'button',
};
