const { Sale } = require('../db').models;

const findOne = ({ query, includeProducts }) => Sale.findOne({ query, includeProducts });
const create = (saleData) => Sale.create(saleData);
const search = (query) => Sale.search(query);

module.exports = {
  create,
  findOne,
  search,
};
