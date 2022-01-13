export const post = ({ url, body }) => fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(body),
});

export const get = ({ url }) => fetch(url, {
  method: 'GET',
  headers: {
    Accept: 'application/json',
  },
});
