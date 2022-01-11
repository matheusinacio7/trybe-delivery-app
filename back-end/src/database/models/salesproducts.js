'use strict';

const Product = require('./product');
const Sale = require('./sale');

const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class SalesProducts extends Model {};

  SalesProducts.init({
    sale_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: Sale,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: Product,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    quantity: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'SalesProducts',
  });
  return SalesProducts;
};
