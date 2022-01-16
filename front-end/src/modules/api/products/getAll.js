import { get } from '../../http';
import { config } from '../common';

export default function getAll() {
  return get({
    url: `${config.baseUrl}/products`,
  });
}
