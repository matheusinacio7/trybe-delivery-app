const fs = require('fs');
const jwt = require('jsonwebtoken');

const key = fs.readFileSync('jwt.evaluation.key');

const sign = (payload) => jwt.sign(payload, key);

const decrypt = (token) => jwt.verify(token, key);

module.exports = {
  sign,
  decrypt,
};
