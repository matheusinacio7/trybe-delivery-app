const Model = require('../Model');
const { product: ProductModel } = require('../../../database/models');

class Product extends Model { }

Product.Model = ProductModel;

module.exports = Product;
