module.exports = class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.message = message;
    this.code = 'CONFLICT_ERROR';
  }
};
