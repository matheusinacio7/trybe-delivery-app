const fs = require('fs');
const jwt = require('jsonwebtoken');

const key = fs.readFileSync('jwt.evaluation.key');

const sign = (payload) => {
  return jwt.sign(payload, key);
}

const decrypt = (token) => {
  return jwt.verify(token, key);
}

module.exports = {
  sign,
  decrypt,
};
