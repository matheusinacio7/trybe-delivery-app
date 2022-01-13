const fs = require('fs');
const jwt = require('jsonwebtoken');

const key = fs.readFileSync('jwt.evaluation.key');

const sign = (payload) => {
  return jwt.sign(payload, key, { algorithm: 'RS256' });
}

const decrypt = (token) => {
  return jwt.verify(token, key, { algorithm: 'RS256' });
}

module.exports = {
  sign,
  decrypt,
};
