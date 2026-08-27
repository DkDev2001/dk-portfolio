import { useState, useEffect } from "react";

// Small data hook: runs `fetcher` once on mount, with loading/error state and a
// graceful `fallback` so a section never renders blank if the API is down.
export function useFetch(fetcher, fallback = null) {
  const [data, setData] = useState(fallback);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let alive = true;
    fetcher()
      .then((res) => {
        if (alive && res != null) setData(res);
      })
      .catch((err) => {
        if (alive) setError(err);
      })
      .finally(() => {
        if (alive) setLoading(false);
      });
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, loading, error };
}
