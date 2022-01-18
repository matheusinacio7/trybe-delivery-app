const { QueryTypes } = require('sequelize');
const Model = require('../Model');
const {
  sale: SaleModel,
  salesProducts: SalesProductsModel,
 } = require('../../../database/models');

const db = require('../../../database/models');

class Sale extends Model {
  static async create(data) {
    try {
      const result = await db.sequelize.transaction(async (transaction) => {
        const { products, ...saleData } = data;
        
        const sale = await SaleModel.create(saleData, { transaction });

        const salesProducts = products.map((product) => ({
          saleId: sale.id,
          productId: product.productId,
          quantity: product.quantity,
        }));

        await SalesProductsModel.bulkCreate(salesProducts, { transaction });

        return { sale: sale.dataValues, products };
      });

      return result;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  static async findOne({ query, includeProducts }) {
    const result = await SaleModel.findOne({ where: query });

    const sale = result.dataValues;

    if (!includeProducts) return sale;

    const products = await db.sequelize.query(
      `SELECT
        p.id,
        p.name,
        p.price,
        p.url_image,
        sp.quantity
      FROM products AS p
      INNER JOIN salesProducts AS sp
        ON sp.product_id = p.id
      WHERE sp.sale_id = ?;`,
      {
        type: QueryTypes.SELECT,
        replacements: [sale.id],
      }
    );

    sale.products = products;

    return sale;
  }
}

Sale.Model = SaleModel;

module.exports = Sale;
