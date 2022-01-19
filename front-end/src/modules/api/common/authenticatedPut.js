import { put } from '../../http';

export default function authenticatedPut({
  url,
  body,
  token,
}) {
  return put({
    url,
    body,
    headers: {
      authorization: token,
    },
  });
}
