const parseResponseJson = (response) => response.json();

const contentType = 'application/json';

const throwIfError = (result) => {
  if (result.error) {
    throw result.error;
  }
  return result;
};

export const post = ({ url, body, headers }) => fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': contentType,
    ...headers,
  },
  body: JSON.stringify(body),
})
  .then(parseResponseJson)
  .then(throwIfError);

export const get = ({ url, headers }) => fetch(url, {
  method: 'GET',
  headers: {
    Accept: contentType,
    ...headers,
  },
})
  .then(parseResponseJson)
  .then(throwIfError);

export const put = ({ url, body, headers }) => fetch(url, {
  method: 'PUT',
  headers: {
    'Content-Type': contentType,
    ...headers,
  },
  body: JSON.stringify(body),
});
