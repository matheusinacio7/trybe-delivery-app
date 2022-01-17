const Model = require('./sales.model');

const { validate } = require('../validation');

const create = async (saleData) => {
  await validate({ schema: 'sales_create', data: saleData });

  const newSale = {
    saleDate: new Date().toISOString(),
    status: 'PENDING',
    ...saleData,
  };

  const { sale, products } = await Model.create(newSale);
  return { ...sale, products };
}

module.exports = {
  create,
};
