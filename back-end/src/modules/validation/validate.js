const Ajv = require('ajv');
const addFormats = require('ajv-formats');

const { ValidationError } = require('../shared/errors');

const userSchemas = {
  login: [require('./schemas/user/session/login.schema.json'), 'user_session_login'],
};

const ajv = new Ajv();
addFormats(ajv);

ajv.addSchema(...userSchemas.login);

const validate = async ({ schema, data }) => {
  const validateSchema = ajv.getSchema(schema);
  const isValid = validateSchema(data);

  if (!isValid) {
    throw new ValidationError({
      errors: validateSchema.errors,
    });
  }

  return true;
};

module.exports = {
  validate,
};
