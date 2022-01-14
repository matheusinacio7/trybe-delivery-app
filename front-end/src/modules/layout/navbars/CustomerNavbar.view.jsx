import React from 'react';
import { Link } from 'react-router-dom';

export default function CustomerNavbar() {
  return (
    <nav>
      <div>
        <Link to="/customer/products">Produtos</Link>
        <Link to="/customer/orders">Meus Pedidos</Link>
      </div>
      <div>
        <Link to="/customer/profile">Meu Perfil</Link>
        <Link to="/customer/logout">Sair</Link>
      </div>
    </nav>
  );
}
