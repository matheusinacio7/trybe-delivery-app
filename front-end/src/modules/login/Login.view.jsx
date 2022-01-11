import React from 'react';

import { Form, Field, Button } from '../shared';

export default function Login() {
  return (
    <main>
      <h1>Delivery App!</h1>
      <h2>Entrar</h2>
      <Form
        initialValues={ { email: '', password: '' } }
        onSubmit={ (values) => console.log(values) }
      >
        <Field name="email" type="email" data-testid="common_login__input-email" />
        <Field
          name="password"
          type="password"
          data-testid="common_login__input-password"
        />
        <Button type="submit" testId="common_login__button-login">Login</Button>
        <Button testId="common_login__button-register">Ainda não tenho conta</Button>
      </Form>
    </main>
  );
}
