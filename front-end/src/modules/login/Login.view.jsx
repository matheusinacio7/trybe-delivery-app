import React from 'react';

import { Button, Form, FormProvider, Field, Heading } from '../shared';

export default function Login() {
  return (
    <main>
      <Heading level={ 1 }>Delivery App!</Heading>
      <Heading level={ 2 }>Entrar</Heading>
      <FormProvider
        initialValues={ { email: '', password: '' } }
        onSubmit={ (values) => console.log(values) }
        schema="login"
        validateOnChange
        initialErrors={ { email: 'Invalid email' } }
      >
        {({ isValid }) => (
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
            <Button testId="common_login__button-register">Ainda não tenho conta</Button>
          </Form>
        )}
      </FormProvider>
    </main>
  );
}
