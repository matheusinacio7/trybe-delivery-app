import React, { useState } from 'react';

import { login } from '../api/user';
import { Button, Form, FormProvider, Field, Heading } from '../shared';

export default function Login() {
  const [error, setError] = useState(null);

  return (
    <main>
      <Heading level={ 1 }>Delivery App!</Heading>
      <Heading level={ 2 }>Entrar</Heading>
      <FormProvider
        initialValues={ { email: '', password: '' } }
        onSubmit={ (credentials) => {
          login(credentials)
            .then((response) => {
              console.log(response);
              setError(null);
            })
            .catch((err) => {
              setError(err);
            });
        } }
        schema="login"
        validateOnChange
        initialErrors={ { email: 'Invalid email' } }
      >
        {({ isValid }) => (
          <>
            <Form>
              <Field name="email" type="email" data-testid="common_login__input-email" />
              <Field
                name="password"
                type="password"
                data-testid="common_login__input-password"
              />
              <Button
                disabled={ !isValid }
                type="submit"
                testId="common_login__button-login"
              >
                Login
              </Button>
              <Button
                testId="common_login__button-register"
              >
                Ainda não tenho conta
              </Button>
            </Form>
            { error && (
              <p data-testid="common_login__element-invalid-email">
                { error.message }
              </p>
            ) }
          </>
        )}
      </FormProvider>
    </main>
  );
}
