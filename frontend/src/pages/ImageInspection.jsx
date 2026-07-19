import { useState } from "react";
import DetectionStatus from "../components/dashboard/DetectionStatus";
import UploadPreview from "../components/dashboard/UploadPreview";
import "../styles/dashboard.css";

function ImageInspection() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  function handleAnalyze() {
    setIsAnalyzing(true);
    setResult(null);

    // Temporary mock response.
    // Later, this will be replaced with the FastAPI request.
    setTimeout(() => {
      setResult({
        defect: "Scratches",
        confidence: 98.74,
        severity: "Medium",
        processingTime: "0.18 sec",
        model: "YOLOv8",
      });

      setIsAnalyzing(false);
    }, 1800);
  }

  function handleReset() {
    setResult(null);
    setIsAnalyzing(false);
  }

  return (
    <section className="inspection-page">
      <h1>AI Image Inspection</h1>

      <p className="page-description">
        Upload a metal surface image and allow the AI model to detect defects
        automatically.
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
        />
      </div>
    </section>
  );
}

export default ImageInspection;