const { User } = require('../db').models;

const findOne = (query) => User.findOne(query);
const create = (userData) => User.create(userData);

module.exports = {
  findOne,
  create,
};
