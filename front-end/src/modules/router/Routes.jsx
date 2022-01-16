import React from 'react';
import { Navigate, Routes as ReactRouterRoutes, Route } from 'react-router-dom';

import Login from '../login';
import Logout from '../logout';
import Products from '../products';
import Register from '../register';

export default function Routes() {
  return (
    <ReactRouterRoutes>
      <Route exact path="/" element={ <Navigate to="/login" /> } />
      <Route path="/login" element={ <Login /> } />
      <Route path="/register" element={ <Register /> } />
      <Route path="/customer/products" element={ <Products /> } />
      <Route path="/customer/logout" element={ <Logout /> } />
    </ReactRouterRoutes>
  );
}
