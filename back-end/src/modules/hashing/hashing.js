const md5 = require('md5');

function hash(value) {
  return md5(value);
}

function compare({ value, hash: hashedValue }) {
  return hash(value) === hashedValue;
}

module.exports = {
  hash,
  compare,
};
