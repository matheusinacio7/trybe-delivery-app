import { post } from '../../http';
import { config } from '../common';

export default function login({ name, email, password }) {
  return post({
    url: `${config.baseUrl}/user`,
    body: { name, email, password },
  });
}
