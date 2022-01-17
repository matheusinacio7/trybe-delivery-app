const Model = require('./sales.model');

const { validate } = require('../validation');

const create = async (saleData) => {
  await validate({ schema: 'sale_create', data: saleData });

  const newSale = {
    saleDate: new Date().toISOString(),
    ...saleData,
  };

  const response = await Model.create(newSale);
  console.log(response);
}

module.exports = {
  create,
};
