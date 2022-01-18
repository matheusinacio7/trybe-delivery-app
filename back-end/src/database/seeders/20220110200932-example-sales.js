'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('sales', [
      {
        id: 1,
        user_id: 1,
        seller_id: 2,
        total_price: 100,
        delivery_address: 'Rua dos bobos',
        delivery_number: '1',
        sale_date: new Date(),
        status: 'Pendente',
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('sales', null, {});
  },
};
