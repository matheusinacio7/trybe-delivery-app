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
    throw new ForbiddenError(NOT_ALLOWED_ERROR_MESSAGE);
  }

  delete sale.sellerId;

  return sale;
};

const validateStatusUpdate = async ({ userRole, sale, newValues }) => {
  const reverseStatusDictionary = {
    Preparando: 'Pendente',
    'Em Trânsito': 'Preparando',
    Entregue: 'Em Trânsito',
  };

  const allowedUpdatesByRole = {
    customer: ['Entregue'],
    seller: ['Preparando', 'Em Trânsito'],
  };

  await validate({ schema: 'sales_update_status', data: newValues });

  if (!allowedUpdatesByRole[userRole].includes(newValues.status)) {
    throw new ForbiddenError(NOT_ALLOWED_ERROR_MESSAGE);
  }

  if (reverseStatusDictionary[newValues.status] !== sale.status) {
    throw new ForbiddenError(NOT_ALLOWED_ERROR_MESSAGE);
  }

  return true;
};

const updateStatus = async ({ userRole, sale, newValues }) => {
  await validateStatusUpdate({ userRole, sale, newValues });

  const [updatedSaleCount] = await Model.update({
    id: sale.id,
    newValues: { status: newValues.status },
  });

  if (updatedSaleCount !== 1) {
    throw new Error('Error updating sale');
  }

  return {
    message: 'Sale status updated successfully',
    updateReport: {
      previousStatus: sale.status,
      newStatus: newValues.status,
    },
  };
};

const update = async ({ userId, userRole, saleId, newValues }) => {
  const attributesToCompare = {
    customer: 'userId',
    seller: 'sellerId',
  };

  const updateFunctions = {
    customer: updateStatus,
    seller: updateStatus,
  };

  const sale = await Model.findOne({ query: { id: saleId } });

  const attributeToCompare = attributesToCompare[userRole];

  if (sale[attributeToCompare] !== userId) {
    throw new ForbiddenError(NOT_ALLOWED_ERROR_MESSAGE);
  }

  const { message, updateReport } = await updateFunctions[userRole]({ userRole, sale, newValues });

  return { message, updateReport };
};

module.exports = {
  create,
  getMany,
  getDetailed,
  update,
};
