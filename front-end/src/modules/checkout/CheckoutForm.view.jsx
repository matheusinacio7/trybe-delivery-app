import React from 'react';
import { useNavigate } from 'react-router';

import { Button } from '../buttons';
import { Field, Form, FormProvider } from '../forms';

import { useShoppingCart } from '../shoppingCart';
import * as localStorage from '../localStorage';

import * as salesApi from '../api/sales';

export default function CheckoutForm() {
  const { cartState, total } = useShoppingCart();
  const navigate = useNavigate();

  return (
    <FormProvider
      initialValues={ { seller: '', address: '', number: '' } }
      schema="checkout"
      initialErrors={ { seller: 'Invalid seller' } }
      onSubmit={ ({ seller, address, number }) => {
        const { token } = localStorage.get('user');

        salesApi.create({
          deliveryAddress: address,
          deliveryNumber: String(number),
          products: Array.from(cartState.entries()).map(([productId, quantity]) => ({
            productId,
            quantity,
          })),
          sellerId: Number(seller),
          token,
          totalPrice: total.toFixed(2),
        }).then(({ sale }) => {
          navigate(`/customer/orders/${sale.id}`);
        })
          .catch(console.log);
      } }
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
