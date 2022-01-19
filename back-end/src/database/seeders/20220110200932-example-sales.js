'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('sales', [
      {
        id: 1,
        user_id: 3,
        seller_id: 2,
        total_price: 100,
        delivery_address: 'Rua dos bobos',
        delivery_number: '1',
        sale_date: new Date(),
        status: 'Pendente',
      },
      {
        id: 2,
        user_id: 4,
        seller_id: 2,
        total_price: '29.30',
        delivery_address: 'Rua dos bobos',
        delivery_number: '34',
        sale_date: new Date(),
        status: 'Pendente',
      },
      {
        id: 3,
        user_id: 1,
        seller_id: 3,
        total_price: '29.30',
        delivery_address: 'Rua dos bobos',
        delivery_number: '1',
        sale_date: new Date(),
        status: 'Preparando',
      },
      {
        id: 4,
        user_id: 1,
        seller_id: 2,
        total_price: '55.80',
        delivery_address: 'Rua dos bobos',
        delivery_number: '1',
        sale_date: new Date(),
        status: 'Em Trânsito',
      },
      {
        id: 5,
        user_id: 1,
        seller_id: 3,
        total_price: '29.30',
        delivery_address: 'Rua dos bobos',
        delivery_number: '1',
        sale_date: new Date(),
        status: 'Entregue',
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('sales', null, {});
  },
};
