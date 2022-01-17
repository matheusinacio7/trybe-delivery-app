const { Product } = require('../db').models;

const findAll = () => Product.findAll();

module.exports = {
  findAll,
};
