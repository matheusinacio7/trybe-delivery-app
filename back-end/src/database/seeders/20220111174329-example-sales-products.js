'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('sales_products', [
      {
        sale_id: 1,
        product_id: 3,
        quantity: 5,
      },
      // {
      //   sale_id: 1,
      //   product_id: 8,
      //   quantity: 3,
      // },
      // {
      //   sale_id: 1,
      //   product_id: 3,
      //   quantity: 5,
      // },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('sales_products', null, {});
  }

};
