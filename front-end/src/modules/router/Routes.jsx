import React from 'react';
import { Navigate, Routes as ReactRouterRoutes, Route } from 'react-router-dom';

import Login from '../login';

export default function Routes() {
  return (
    <ReactRouterRoutes>
      <Route exact path="/" element={ <Navigate to="/login" /> } />
      <Route path="/login" element={ <Login /> } />
      <Route path="/customer/products" element={ <div>Produtos!</div> } />
    </ReactRouterRoutes>
  );
}
