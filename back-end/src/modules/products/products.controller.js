const Model = require('./products.model');

const getAll = async () => {
  const products = await Model.findAll();
  console.log(products);
  return { products };
}

module.exports = {
  getAll,
};
