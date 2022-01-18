import { post } from '../../http';

export default function authenticatedPost({
  url,
  body,
  token,
}) {
  return post({
    url,
    body,
    headers: {
      authorization: token,
    },
  });
}
