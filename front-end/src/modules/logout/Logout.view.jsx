import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import * as localStorage from '../localStorage';

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.remove('user');
    navigate('/', { replace: true });
  }, [navigate]);

  return (
    <main>
      <h1>Saindo...</h1>
    </main>
  );
}
