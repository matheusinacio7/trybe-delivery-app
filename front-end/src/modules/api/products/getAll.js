import { get } from '../../http';
import { config } from '../common';

const renameUrlImage = (product) => ({
  id: product.id,
  name: product.name,
  price: product.price,
  image: product.urlImage,
});

export default function getAll() {
  return get({
    url: `${config.baseUrl}/products`,
  })
    .then(({
      products,
      ...rest
    }) => ({ products: products.map(renameUrlImage), ...rest }));
}
