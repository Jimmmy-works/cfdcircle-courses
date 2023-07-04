import { useEffect, useState } from "react";

// Dùng để get API
export const useQuery = (promise, dependencies = []) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    fetchData();
  }, dependencies);

  const fetchData = async (query) => {
    try {
      const res = await promise(query);
      setData(res?.data?.data || []);
    } catch (error) {
      setError(!error);
    } finally {
      setLoading(false);
    }
  };
  return { data, error, loading, refetch: fetchData };
};
