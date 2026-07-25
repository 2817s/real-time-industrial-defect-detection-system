import { useEffect, useState } from "react";
import { checkBackendHealth } from "../api/healthApi";

const useHealth = () => {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHealth = async () => {
      try {
        const data = await checkBackendHealth();
        setStatus(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchHealth();
  }, []);

  return { status, loading };
};

export default useHealth;