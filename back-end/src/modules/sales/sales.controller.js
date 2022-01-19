const Model = require('./sales.model');

const { ForbiddenError } = require('../errors');
const { validate } = require('../validation');

const create = async (saleData) => {
  await validate({ schema: 'sales_create', data: saleData });

  const newSale = {
    saleDate: new Date().toISOString(),
    status: 'Pendente',
    ...saleData,
  };

  const { sale, products } = await Model.create(newSale);
  return { ...sale, products };
};

const customerGetSales = async ({ userId, searchByCustomer }) => {
  if (!searchByCustomer) throw new ForbiddenError('Not allowed.');

  if (userId !== searchByCustomer) throw new ForbiddenError('Not allowed.');

  return Model.search({ userId });
};

const getMany = async ({ userId, userRole, searchByCustomer }) => {
  const getFunctions = {
    customer: customerGetSales,
  };

  return getFunctions[userRole]({
    userId,
    searchByCustomer: searchByCustomer ? Number(searchByCustomer) : null,
  });
};

const getDetailed = async ({ userId, userRole, saleId }) => {
  const attributesToCompare = {
    customer: 'userId',
    seller: 'sellerId',
  };

  const sale = await Model.findOne({ query: { id: saleId }, includeProducts: true });

  const attributeToCompare = attributesToCompare[userRole];

  if (sale[attributeToCompare] !== userId) {
    throw new ForbiddenError('Not allowed');
  }

  return sale;
};

module.exports = {
  create,
  getMany,
  getDetailed,
};