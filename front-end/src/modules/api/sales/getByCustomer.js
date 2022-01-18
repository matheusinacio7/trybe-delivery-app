import { authenticatedGet, config } from '../common';

export default function getByCustomer({
  customerId,
  token,
}) {
  return authenticatedGet({
    url: `${config.baseUrl}/sales?customer=${customerId}`,
    token,
  });
}
