import { useEffect, useState } from 'react';

export default function useApi(apiFunction, ...apiParams) {
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    apiFunction(...apiParams)
      .then(setResult)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [apiFunction]);

  return { result, loading, error };
}
