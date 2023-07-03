import { useEffect, useState } from "react";

// Dùng để get API
export const useQuery = (promise, dependencies = []) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    fetchData();
  }, dependencies);

  const fetchData = async (query) => {
    try {
      setLoading(true);
      const res = await promise(query);
      setData(res?.data?.data || []);
      setLoading(false);
    } catch (error) {
      setError(!error);
    } finally {
      setLoading(false);
    }
  };
  return { data, error, loading, refetch: fetchData };
};
