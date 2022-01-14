import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { register } from '../api/user';
import { Button } from '../buttons';
import { Field, Form, FormProvider } from '../forms';
import { Heading } from '../text';

export default function Register() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  return (
    <main>
      <Heading level={ 1 }>Cadastro</Heading>
      <FormProvider
        initialValues={ { name: '', email: '', password: '' } }
        initialErrors={ { email: 'Invalid email' } }
        onSubmit={ (values) => {
          const { name, email, password } = values;
          register({ name, email, password })
            .then(({ token }) => {
              console.log(token);
              navigate('/customer/products', { replace: true });
            })
            .catch(setError);
        } }
        schema="register"
        validateOnChange
      >
        {({ isValid }) => (
          <>
            <Form>
              <Field name="name" type="text" data-testid="common_register__input-name" />
              <Field
                name="email"
                type="email"
                data-testid="common_register__input-email"
              />
              <Field
                name="password"
                type="password"
                data-testid="common_register__input-password"
              />
              <Button
                disabled={ !isValid }
                type="submit"
                testId="common_register__button-register"
              >
                Cadastrar
              </Button>
            </Form>
            { error && (
              <p data-testid="common_register__element-invalid_register">
                { error.message }
              </p>
            ) }
          </>
        )}
      </FormProvider>
    </main>
  );
}
