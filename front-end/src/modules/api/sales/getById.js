import { authenticatedGet, config } from '../common';

export default function getByCustomer({
  saleId,
  token,
}) {
  return authenticatedGet({
    url: `${config.baseUrl}/sales/${saleId}`,
    token,
  });
}
