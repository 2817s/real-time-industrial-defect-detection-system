import { useState } from "react";

import DetectionStatus from "../components/dashboard/DetectionStatus";
import UploadPreview from "../components/dashboard/UploadPreview";

import "../styles/dashboard.css";

const API_URL = "http://127.0.0.1:8000/api/predict";

function ImageInspection() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  async function handleAnalyze(file) {
    if (!file) {
      setError("Please select an image first.");
      return;
    }

    setIsAnalyzing(true);
    setResult(null);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);

    const startTime = performance.now();

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail || "Image prediction failed. Please try again."
        );
      }

      const endTime = performance.now();

      const detections = data.detections.map((detection) => ({
        ...detection,
        displayName: detection.class_name
          .replaceAll("_", " ")
          .replace(/\b\w/g, (letter) => letter.toUpperCase()),
        confidencePercentage: (
          detection.confidence * 100
        ).toFixed(2),
      }));

      setResult({
        filename: data.filename,
        detections,
        count: data.count,
        processingTime: `${((endTime - startTime) / 1000).toFixed(2)} sec`,
        model: "YOLOv8n - 800px",
      });
    } catch (err) {
      console.error("Prediction error:", err);

      setError(
        err.message || "Unable to connect to the prediction server."
      );
    } finally {
      setIsAnalyzing(false);
    }
  }

  function handleReset() {
    setResult(null);
    setError(null);
    setIsAnalyzing(false);
  }

  return (
    <section className="inspection-page">
      <h1>AI Image Inspection</h1>

      <p className="page-description">
        Upload a metal surface image and allow the AI model to
        detect defects automatically.
      </p>

      <div className="inspection-grid">
        <UploadPreview
          onAnalyze={handleAnalyze}
          onReset={handleReset}
          isAnalyzing={isAnalyzing}
        />

        <DetectionStatus
          result={result}
          isAnalyzing={isAnalyzing}
          error={error}
        />
      </div>
    </section>
  );
}

export default ImageInspection;