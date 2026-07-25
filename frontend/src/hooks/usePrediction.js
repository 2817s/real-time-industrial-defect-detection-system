import { useState } from "react";
import { predictDefect } from "../api/predictionApi";

const usePrediction = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const predict = async (imageFile) => {
    setLoading(true);

    try {
      const data = await predictDefect(imageFile);
      setResult(data);
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    result,
    loading,
    predict,
  };
};

export default usePrediction;