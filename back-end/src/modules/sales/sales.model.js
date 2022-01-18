const { Sale } = require('../db').models;

// const findOne = (query) => Sale.findOne(query);
const create = (saleData) => Sale.create(saleData);
const search = (query) => Sale.search(query);

module.exports = {
  create,
  search,
};
