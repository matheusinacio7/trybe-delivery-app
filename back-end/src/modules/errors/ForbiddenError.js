module.exports = class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.code = 'FORBIDDEN_ERROR';
    this.message = message;
  }
};
