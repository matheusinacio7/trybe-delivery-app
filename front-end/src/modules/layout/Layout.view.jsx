import React from 'react';
import PropTypes from 'prop-types';

import { CustomerNavbar } from './navbars';

const NavBars = {
  customer: CustomerNavbar,
};

export default function Layout({
  children,
  context,
}) {
  return (
    <>
      <header>
        { NavBars[context]() }
      </header>
      { children }
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  context: PropTypes.oneOf(['common', 'customer']).isRequired,
};
