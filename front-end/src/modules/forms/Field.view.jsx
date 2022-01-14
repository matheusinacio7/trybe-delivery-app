import React from 'react';
import PropTypes from 'prop-types';
import { Field as FormikField } from 'formik';

export default function Field({ testId, ...props }) {
  return <FormikField data-testid={ testId } { ...props } />;
}

Field.propTypes = {
  testId: PropTypes.string,
};

Field.defaultProps = {
  testId: '',
};
