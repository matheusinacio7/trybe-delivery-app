const { Sale } = require('../db').models;

// const findOne = (query) => Sale.findOne(query);
const create = (saleData) => Sale.create(saleData);

module.exports = {
  create,
};
