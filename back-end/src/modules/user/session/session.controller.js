const Model = require('../user.model');

const { validate } = require('../../validation');
const { NotFoundError } = require('../../shared/errors');

const create = async (userData) => {
  await validate({ schema: 'user_session_login', data: userData });
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
