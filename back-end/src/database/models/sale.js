'use strict';
import User from './user';

const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Sale extends Model {};

  Sale.init({
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: User,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    seller_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: User,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    total_price: DataTypes.DECIMAL(9, 2),
    delivery_address: DataTypes.STRING(100),
    delivery_number: DataTypes.STRING(50),
    sale_date: DataTypes.DATE,
    status: DataTypes.STRING(50),
  }, {
    sequelize,
    modelName: 'Sale',
  });
  return Sale;
};