import { useEffect, useState } from "react";
import { getAnalyticsSummary } from "../api/analyticsApi";

const useAnalytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const data = await getAnalyticsSummary();
        setAnalytics(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  return { analytics, loading };
};

export default useAnalytics;