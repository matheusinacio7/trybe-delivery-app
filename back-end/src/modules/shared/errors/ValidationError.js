module.exports = class ValidationError extends Error {
  constructor({ errors, message }) {
    super(message | 'Validation failed');
    this.code = 'VALIDATION_ERROR';
    this.errors = errors;
  }
};
