const { Sale } = require('../db').models;

const findOne = ({ query, includeProducts }) => Sale.findOne({ query, includeProducts });
const create = (saleData) => Sale.create(saleData);
const search = (query) => Sale.search(query);
const update = ({ id, newValues }) => Sale.update({ id, newValues });

module.exports = {
  create,
  findOne,
  search,
  update,
};
