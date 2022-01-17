const { Sequelize } = require('sequelize');
const Model = require('../Model');
const { sale: SaleModel, salesProducts: SalesProductsModel } = require('../../../database/models');


const db = require('../../../database/models');

class Sale extends Model {
  static async create(data) {
    try {
      const result = await db.sequelize.transaction(async (transaction) => {
        const { products, ...saleData } = data;
        console.log({ saleData });
        const sale = await SaleModel.create(saleData, { transaction });

        console.log(sale);
        
        const salesProducts = products.map(product => ({
          saleId: sale.id,
          productId: product.id,
          quantity: product.quantity,
        }));

        await SalesProductsModel.bulkCreate(salesProducts, { transaction });

        // console.log(sale);
        return sale;
      });

      console.log(result);
    } catch (err) {
      console.log(err);
    }
  }
}

Sale.Model = SaleModel;

module.exports = Sale;
