import React from 'react';
import { PropTypes } from 'prop-types';
import { Form as FormikForm } from 'formik';

export default function Form({ children }) {
  return (
    <FormikForm>
      { children }
    </FormikForm>
  );
}

Form.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};
