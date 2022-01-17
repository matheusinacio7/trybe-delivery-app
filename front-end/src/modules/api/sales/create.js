import { post } from '../../http';
import { config } from '../common';

export default function createSale({
  userId,
  sellerId,
  totalPrice,
  deliveryAddress,
  deliveryNumber,
  products,
}) {
  return post({
    url: `${config.baseUrl}/sales`,
    body: {
      userId,
      sellerId,
      totalPrice,
      deliveryAddress,
      deliveryNumber,
      products,
    },
  });
}
