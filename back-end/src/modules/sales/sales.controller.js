const Model = require('./sales.model');

const { ForbiddenError } = require('../errors');
const { validate } = require('../validation');

const NOT_ALLOWED_ERROR_MESSAGE = 'Not allowed.';

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
  if (!searchByCustomer) throw new ForbiddenError(NOT_ALLOWED_ERROR_MESSAGE);

  if (userId !== searchByCustomer) throw new ForbiddenError(NOT_ALLOWED_ERROR_MESSAGE);

  return Model.search({ userId });
};

const sellerGetSales = async ({ userId, searchBySeller }) => {
  if (!searchBySeller) throw new ForbiddenError(NOT_ALLOWED_ERROR_MESSAGE);

  if (userId !== searchBySeller) throw new ForbiddenError(NOT_ALLOWED_ERROR_MESSAGE);

  return Model.search({ sellerId: userId });
};

const getMany = async ({ userId, userRole, searchByCustomer, searchBySeller }) => {
  const getFunctions = {
    customer: customerGetSales,
    seller: sellerGetSales,
  };

  return getFunctions[userRole]({
    userId,
    searchByCustomer: searchByCustomer ? Number(searchByCustomer) : null,
    searchBySeller: searchBySeller ? Number(searchBySeller) : null,
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

  delete sale.sellerId;

  return sale;
};

module.exports = {
  create,
  getMany,
  getDetailed,
};
