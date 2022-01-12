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
      >
        {({ errors, isValidating }) => (
          <Form>
            { console.log({ errors, isValidating }) }
            <Field name="email" type="email" data-testid="common_login__input-email" />
            <Field
              name="password"
              type="password"
              data-testid="common_login__input-password"
            />
            <Button
              disabled={ isValidating || Object.keys(errors).length > 0 }
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
