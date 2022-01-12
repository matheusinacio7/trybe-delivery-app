import React from 'react';
import { PropTypes } from 'prop-types';
import { Formik, Form as FormikForm } from 'formik';

import { ValidationError } from '../../errors';
import { validate } from '../../validation';

export default function Form({ children, schema, ...options }) {
  return (
    <Formik
      validate={ (data) => {
        validate(schema, data)
          .catch((err) => {
            if (err instanceof ValidationError) {
              return err.errors;
            }

            console.error(err);
          });
      } }
      { ...options }
    >
      { ({ errors }) => (
        <FormikForm>
          { console.log(errors) }
          { errors[0] }
          { children }
        </FormikForm>
      ) }
    </Formik>
  );
}

Form.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  schema: PropTypes.string.isRequired,
};
