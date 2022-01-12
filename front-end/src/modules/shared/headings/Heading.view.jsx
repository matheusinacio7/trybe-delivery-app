import React from 'react';
import PropTypes from 'prop-types';

export default function Heading({ children, level, testId, size }) {
  return React.createElement(`h${level}`, {
    'data-testid': testId,
    className: `heading heading--${size}`,
  }, children);
}

Heading.propTypes = {
  children: PropTypes.string.isRequired,
  level: PropTypes.number.isRequired,
  testId: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['s', 'm', 'l']),
};

Heading.defaultProps = {
  size: 'm',
};
