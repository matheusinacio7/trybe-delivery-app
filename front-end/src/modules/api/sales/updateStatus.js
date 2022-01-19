import { authenticatedPut, config } from '../common';

export default function updateStatus({
  token,
  saleId,
  status,
}) {
  return authenticatedPut({
    url: `${config.baseUrl}/sales/${saleId}`,
    body: {
      status,
    },
    token,
  });
}
