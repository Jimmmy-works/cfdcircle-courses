import { useEffect, useState } from "react";
// , { onSuccess, onFail }
// Dùng để post API
export const useMutation = (promise, config) => {
  const { onSuccess, onFail } = config || {};
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const execute = async (...payload) => {
    try {
      const res = await promise(...payload);
      if (res?.data?.data) {
        setLoading(true);
        setData(res?.data?.data || []);
        onSuccess && onSuccess();
      }
    } catch (error) {
      console.log("error", error);
      setError(!error);
      onFail && onFail();
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, execute };
};
