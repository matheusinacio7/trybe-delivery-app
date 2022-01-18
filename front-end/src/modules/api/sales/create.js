import { authenticatedPost, config } from '../common';

export default function createSale({
  token,
  sellerId,
  totalPrice,
  deliveryAddress,
  deliveryNumber,
  products,
}) {
  return authenticatedPost({
    url: `${config.baseUrl}/sales`,
    body: {
      sellerId,
      totalPrice,
      deliveryAddress,
      deliveryNumber,
      products,
    },
    token,
  });
}
