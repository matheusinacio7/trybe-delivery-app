import React from 'react';
import { Navigate, Routes as ReactRouterRoutes, Route } from 'react-router-dom';

import Login from '../login';
import Register from '../register';
import Layout from '../layout';

export default function Routes() {
  return (
    <ReactRouterRoutes>
      <Route exact path="/" element={ <Navigate to="/login" /> } />
      <Route path="/login" element={ <Login /> } />
      <Route path="/register" element={ <Register /> } />
      <Route
        path="/customer/products"
        element={ (
          <Layout
            context="customer"
          >
            <h1>Produtos!</h1>
          </Layout>
        ) }
      />
    </ReactRouterRoutes>
  );
}
