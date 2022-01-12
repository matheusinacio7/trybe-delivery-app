export default class ValidationError extends Error {
  constructor(errors) {
    super('Validation failed');
    this.code = 'VALIDATION_ERROR';
    this.errors = errors;
  }
}
