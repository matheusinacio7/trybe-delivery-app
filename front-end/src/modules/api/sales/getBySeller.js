import { authenticatedGet, config } from '../common';

export default function getByCustomer({
  sellerId,
  token,
}) {
  return authenticatedGet({
    url: `${config.baseUrl}/sales?seller=${sellerId}`,
    token,
  });
}
