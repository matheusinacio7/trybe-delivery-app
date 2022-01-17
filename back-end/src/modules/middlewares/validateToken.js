const { decrypt } = require('../token');

const { AuthenticationError } = require('../errors');

async function validateToken(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    throw new AuthenticationError('A token is required');
  }

  const { id, role } = decrypt(token);
  res.locals.user = { id, role };
  next();
}

module.exports = validateToken;
