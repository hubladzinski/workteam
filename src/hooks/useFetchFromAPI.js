import { useState, useEffect } from "react";

export const useFetchFromAPI = (url, options) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [data, setData] = useState();

  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const response = await fetch(url, options);
        const json = await response.json();
        setData(json);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };
    fetchAPI();
  }, []);

  return { data, error, loading };
};
