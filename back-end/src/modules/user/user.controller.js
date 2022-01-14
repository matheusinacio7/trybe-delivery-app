const Model = require('./user.model');

const SessionController = require('./session/session.controller');

const { validate } = require('../validation');

const create = async (userData) => {
  await validate({ schema: 'user_register', data: userData });
  const response = await Model.create(userData);
  return response;
};

const createAndLogin = async (userData) => {
  const response = await create(userData);
  console.log(response);
  return { token: 'k' };
}

module.exports = {
  create,
  createAndLogin
};
