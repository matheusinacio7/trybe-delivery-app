import { post } from '../../http';
import { config } from '../common';

export default function login({ email, password }) {
  return post({
    url: `${config.baseUrl}/user/session`,
    body: { email, password },
  });
}
