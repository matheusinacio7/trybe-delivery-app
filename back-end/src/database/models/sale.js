'use strict';
import User from './user';

const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Sale extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Sale.init({
    total_price: DataTypes.DECIMAL(9, 2),
    delivery_address: DataTypes.STRING(100),
    delivery_number: DataTypes.STRING(50),
    sale_date: DataTypes.DATE,
    status: DataTypes.STRING(50),
  }, {
    sequelize,
    modelName: 'Sale',
  });
  Sale.belongsTo(User);
  // Sale.belongsTo(User, { foreignKey: 'seller_id' });
  return Sale;
};