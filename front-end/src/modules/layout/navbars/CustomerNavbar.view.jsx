import React from 'react';
import { Link } from 'react-router-dom';

export default function CustomerNavbar() {
  return (
    <nav>
      <div>
        <Link
          data-testid="customer_products__element-navbar-link-products"
          to="/customer/products"
        >
          Produtos
        </Link>
        <Link
          data-testid="customer_products__element-navbar-link-orders"
          to="/customer/orders"
        >
          Meus Pedidos
        </Link>
      </div>
      <div>
        <Link
          data-testid="customer_products__element-navbar-user-full-name"
          to="/customer/profile"
        >
          Meu Perfil
        </Link>
        <Link
          data-testid="customer_products__element-navbar-link-logout"
          to="/customer/logout"
        >
          Sair
        </Link>
      </div>
    </nav>
  );
}
