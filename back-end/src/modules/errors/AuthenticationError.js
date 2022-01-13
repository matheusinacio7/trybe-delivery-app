module.exports = class AuthenticationError extends Error {
  constructor(message) {
    super(message);
    this.code = 'AUTHENTICATION_ERROR';
    this.message = message;
  }
};
