'use strict';

const Product = require('./product');
const Sale = require('./sale');

const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class SalesProducts extends Model {};

  SalesProducts.init({
    saleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: Sale,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      primaryKey: true,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: Product,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      primaryKey: true,
    },
    quantity: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'salesProducts',
    timestamps: false,
    underscored: true,
    tableName: 'salesProducts',
  });
  return SalesProducts;
};
