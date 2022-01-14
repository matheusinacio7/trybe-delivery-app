import React from 'react';
import PropTypes from 'prop-types';

export default function Layout({
  children,
  context,
}) {
  return (
    <>
      <h1>{ context }</h1>
      { children }
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  context: PropTypes.oneOf(['common', 'customer']).isRequired,
};
