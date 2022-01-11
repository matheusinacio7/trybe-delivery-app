import React from 'react';
import { PropTypes } from 'prop-types';
import { Formik, Form as FormikForm } from 'formik';

export default function Form({ children, ...options }) {
  console.log(options);

  return (
    <Formik { ...options }>
      <FormikForm>
        { children }
      </FormikForm>
    </Formik>
  );
}

Form.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};
