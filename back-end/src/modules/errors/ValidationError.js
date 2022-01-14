module.exports = class ValidationError extends Error {
  constructor({ errors, message }) {
    super(message || errors[0].message || 'Validation failed');
    this.code = 'VALIDATION_ERROR';
    this.properties = { errors };
  }
};
