'use strict';

const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {};

  Product.init({
    name: DataTypes.STRING(100),
    price: DataTypes.DECIMAL(4, 2),
    urlImage: DataTypes.STRING(200),
  }, {
    sequelize,
    modelName: 'product',
    timestamps: false,
    underscored: true,
  });

  return Product;
};
