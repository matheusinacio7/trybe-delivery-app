const Sequelize = require('sequelize');
const Model = require('../Model');
const { sale: SaleModel, salesProducts: SalesProductsModel } = require('../../../database/models');

class Product extends Model {
  static async create(data) {
    const transaction = await new Sequelize().transaction();
    console.log(transaction);
  }
}

Product.Model = ProductModel;

module.exports = Product;
