import React from 'react';
import PropTypes from 'prop-types';
import { Field as FormikField } from 'formik';

export default function Field({ testId, children, ...props }) {
  if (!children) {
    return <FormikField data-testid={ testId } { ...props } />;
  }

  return (
    <FormikField data-testid={ testId } { ...props }>
      { children }
    </FormikField>
  );
}

Field.propTypes = {
  testId: PropTypes.string,
  children: PropTypes.node,
};

Field.defaultProps = {
  testId: '',
  children: null,
};
