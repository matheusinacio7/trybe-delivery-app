const { Model } = require('../');

const { NotFoundError } = require('../../shared/errors');

const create = (userData) => {
  // validate
  const user = Model.find({ email: userData.email });

  if (!user) {
    throw new NotFoundError('User not found');
  }

  // compare hashed password
  // return token
};

module.exports = {
  create,
};
