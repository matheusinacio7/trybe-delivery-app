import React from 'react';
import { PropTypes } from 'prop-types';
import { Formik } from 'formik';

import { ValidationError } from '../../errors';
import { validate } from '../../validation';

export default function FormProvider({ schema, children, ...options }) {
  return (
    <Formik
      validate={ (data) => validate(schema, data)
        .then(() => null)
        .catch((err) => {
          if (err instanceof ValidationError) {
            return err.errors;
          }

          console.error(err);
        }) }
      { ...options }
    >
      { children }
    </Formik>
  );
}

FormProvider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  schema: PropTypes.string.isRequired,
};
