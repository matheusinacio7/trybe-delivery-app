export const post = ({ url, body }) => fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(body),
})
  .then((response) => response.json())
  .then((result) => {
    if (result.error) {
      throw result.error;
    }

    return result;
  });

export const get = ({ url }) => fetch(url, {
  method: 'GET',
  headers: {
    Accept: 'application/json',
  },
});
