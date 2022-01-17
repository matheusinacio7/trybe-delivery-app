import React from 'react';

import { Button } from '../buttons';
import { Field, Form, FormProvider } from '../forms';

export default function CheckoutForm() {
  return (
    <FormProvider
      initialValues={ { seller: '', address: '', number: '' } }
      schema="checkout"
      initialErrors={ { seller: 'Invalid seller' } }
      validateOnChange
    >
      <Form>
        <Field
          name="seller"
          label="Vendedor"
          component="select"
          testId="customer_checkout__select-seller"
        >
          <option value="">Selecione</option>
          <option value="1">Vendedor 1</option>
          <option value="2">Vendedor 2</option>
        </Field>
        <Field
          name="address"
          label="Endereço"
          placeholder="Rua, bairro, complemento"
          type="text"
          testId="customer_checkout__input-address"
        />
        <Field
          name="number"
          label="Número"
          placeholder="Número"
          type="number"
          testId="customer_checkout__input-addressNumber"
        />
        <Button
          type="submit"
          testId="customer_checkout__button-submit-order"
        >
          Finalizar Pedido
        </Button>
      </Form>
    </FormProvider>
  );
}
