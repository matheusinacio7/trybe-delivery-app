import React from 'react';
import PropTypes from 'prop-types';

import { CustomerNavbar, SellerNavbar } from './navbars';

const NavBars = {
  customer: CustomerNavbar,
  seller: SellerNavbar,
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
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
  context: PropTypes.oneOf(['common', 'customer']).isRequired,
};
