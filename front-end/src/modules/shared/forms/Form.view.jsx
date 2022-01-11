import React from 'react';

import { Formik, Field as FormikField, Form as FormikForm } from 'formik';

export function Form({ children, ...options }) {
  return (
    <Formik {...options}>
      <FormikForm>
        { children }
      </FormikForm>
    </Formik>
  )
};

export { FormikField as Field };
