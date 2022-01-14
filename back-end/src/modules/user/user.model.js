const { User } = require('../db').models;

const findOne = (query) => User.findOne(query);

module.exports = {
  findOne,
};
