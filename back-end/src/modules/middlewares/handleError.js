const statusDict = {
  'NOT_FOUND': 404,
  'VALIDATION_ERROR': 400,
};

function handleError(err, req, res, _next) {
  console.log(err);
  console.log('k');
  const status = statusDict[err.code] || 500;
  const message = err.message || 'Internal server error';
  res.status(status).json({ error: { message, code: err.code } });
};

module.exports = handleError;
