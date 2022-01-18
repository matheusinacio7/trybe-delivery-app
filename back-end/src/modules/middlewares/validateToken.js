const { decrypt } = require('../token');

const { AuthenticationError } = require('../errors');

async function validateToken(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    throw new AuthenticationError('A token is required');
  }

  try {
    const { id, role } = decrypt(token);
    res.locals.user = { id, role };
    next();
  } catch {
    throw new AuthenticationError('Invalid token');
  }
}

module.exports = validateToken;
