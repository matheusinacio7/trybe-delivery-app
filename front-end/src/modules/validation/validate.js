import { ModuleNotFoundError, ValidationError } from '../errors';

import schemas from './schemas';

export default function validate(schema, data) {
  if (!schemas[schema]) {
    throw new ModuleNotFoundError(`Schema ${schema} not found`);
  }

  return schemas[schema].validate(data, { abortEarly: false })
    .catch((err) => {
      throw new ValidationError(err.errors);
    });

  // import (`./schemas/${schema}.schema`) o codigo que poderia ter sido :/ babel lint desatualizado
  //   .then((schema) => {
  //     console.log(schema);
  //     return schema.validate(data);
  //   })
  //   .catch((err) => {
  //     if (err.code === 'VALIDATION_ERROR') {
  //       throw new ValidationError(err.errors);
  //     }

  //     throw new ModuleNotFoundError(schema);
  //   });
}
