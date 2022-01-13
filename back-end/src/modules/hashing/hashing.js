const md5 = require('md5');

function hash(value) {
  return md5(value);
}

function compare({ value, hash: hashedValue }) {
  if (hash(value) !== hashedValue) {
    throw new Error('Hashing failed');
  }

  return true;
}

module.exports = {
  hash,
  compare,
};
