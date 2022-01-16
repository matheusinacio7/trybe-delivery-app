const Model = require('./products.model');

const getAll = async () => {
  const products = await Model.findAll();
  return { products };
}

module.exports = {
  getAll,
};
