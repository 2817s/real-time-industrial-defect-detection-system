import { useEffect, useState } from "react";
import { getInspectionHistory } from "../api/reportsApi";

const useReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const data = await getInspectionHistory();
        setReports(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  return { reports, loading };
};

export default useReports;