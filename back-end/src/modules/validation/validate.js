const Ajv = require('ajv');
const addFormats = require('ajv-formats');
const addErrors = require('ajv-errors');

const { ValidationError } = require('../errors');

const loginSchema = require('./schemas/user/session/login.schema.json');
const registerSchema = require('./schemas/user/register.schema.json');

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);
addErrors(ajv);

const schemas = [
  [loginSchema, 'user_session_login'],
  [registerSchema, 'user_register'],
];

schemas.forEach(([schema, name]) => {
  ajv.addSchema(schema, name);
});

const validate = async ({ schema, data }) => {
  const validateSchema = ajv.getSchema(schema);
  const isValid = validateSchema(data);

  if (!isValid) {
    const errors = validateSchema.errors.map(({
      instancePath,
      message,
      keyword,
    }) => ({
      path: `${schema}/${instancePath}`,
      message,
      keyword,
    }));

    throw new ValidationError({
      errors,
    });
  }

  return true;
};

module.exports = {
  validate,
};
