'use strict';

const User = require('./user');

const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Sale extends Model {};

  Sale.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: User,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    sellerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: User,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    totalPrice: DataTypes.DECIMAL(9, 2),
    deliveryAddress: DataTypes.STRING(100),
    deliveryNumber: DataTypes.STRING(50),
    saleDate: DataTypes.DATE,
    status: DataTypes.STRING(50),
  }, {
    sequelize,
    modelName: 'sale',
    timestamps: false,
    underscored: true,
  });
  return Sale;
};