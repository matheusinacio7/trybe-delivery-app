const Model = require('./user.model');

const { hash } = require('../hashing');
const SessionController = require('./session/session.controller');

const { ConflictError } = require('../errors');
const { validate } = require('../validation');

const create = async (userData) => {
  await validate({ schema: 'user_register', data: userData });

  const { password, ...otherData } = userData;
  
  try {
    const response = await Model.create({
      password: hash(password),
      role: 'customer',
      ...otherData,
    });
    return response;
  } catch (err) {
    if (err.original.code === 'ER_DUP_ENTRY') {
      throw new ConflictError('User already registered');
    }

    throw err;
  }
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
