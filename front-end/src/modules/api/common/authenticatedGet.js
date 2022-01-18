import { get } from '../../http';

export default function authenticatedGet({
  url,
  token,
}) {
  return get({
    url,
    headers: {
      authorization: token,
    },
  });
}
