import React, { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import * as localStorage from '../localStorage';

const homePages = {
  customer: '/customer/products',
  seller: '/seller/orders',
  visitor: '/login',
};

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.get('user');

    const role = user ? user.role : 'visitor';

    console.log(role);

    const homePage = homePages[role];

    navigate(homePage);
  }, []);

  return (
    <main>
      <h1>Redirecionando...</h1>
    </main>
  );
}
