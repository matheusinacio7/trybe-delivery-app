const Model = require('./user.model');

const { hash } = require('../hashing');
const SessionController = require('./session/session.controller');

const { validate } = require('../validation');

const create = async (userData) => {
  await validate({ schema: 'user_register', data: userData });

  const { password, ...otherData } = userData;
  
  const response = await Model.create({
    password: hash(password),
    role: 'customer',
    ...otherData,
  });
  return response;
};

const createAndLogin = async (userData) => {
  await create(userData);
  const { token } = await SessionController.create({
    email: userData.email,
    password: userData.password,
  });

  return { token };
}

module.exports = {
  create,
  createAndLogin
};
