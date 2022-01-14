import React from 'react';

import { Button, Form, FormProvider, Field, Heading } from '../shared';

export default function Register() {
  return (
    <main>
      <Heading level={ 1 }>Cadastro</Heading>
      <FormProvider
        initialValues={ { name: '', email: '', password: '' } }
      >
        {({ isValid }) => (
          <Form>
            <Field name="name" type="text" data-testid="common_register__input-name" />
            <Field name="email" type="email" data-testid="common_register__input-email" />
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
        )}
      </FormProvider>
    </main>
  );
}
