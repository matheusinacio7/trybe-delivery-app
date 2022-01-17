const statusDict = {
  AUTHENTICATION_ERROR: 401,
  CONFLICT_ERROR: 409,
  NOT_FOUND: 404,
  VALIDATION_ERROR: 400,
};

function handleError(err, _req, res, _next) {
  const status = statusDict[err.code] || 500;
  const message = err.message || 'Internal server error';
  res.status(status).json({ error: { message, code: err.code, ...err.properties } });
}

module.exports = handleError;
