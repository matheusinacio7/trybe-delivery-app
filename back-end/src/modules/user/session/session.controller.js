const Model = require('../user.model');

const { NotFoundError } = require('../../shared/errors');

const create = async (userData) => {
  // validate
  const user = await Model.findOne({ email: userData.email });

  if (!user) {
    throw new NotFoundError('User not found');
  }

  // compare hashed password
  // return token
};

module.exports = {
  create,
};
