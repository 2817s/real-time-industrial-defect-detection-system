import { useEffect, useState } from "react";

import AnalyticsCard from "../components/analytics/AnalyticsCard";
import DefectDistribution from "../components/analytics/DefectDistribution";
import DetectionTrendChart from "../components/analytics/DetectionTrendChart";
import ConfidenceAnalysis from "../components/analytics/ConfidenceAnalysis";
import ModelPerformance from "../components/analytics/ModelPerformance";
import RecentPredictions from "../components/analytics/RecentPredictions";

import "../styles/analytics.css";

const API_URL = "http://127.0.0.1:8000/api/dashboard/stats";

const Analytics = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAnalytics() {
      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error("Unable to load analytics data.");
        }

        const data = await response.json();

        setStats(data);
        setError(null);
      } catch (err) {
        console.error("Analytics error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchAnalytics();

    const interval = setInterval(fetchAnalytics, 30000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <section className="analytics-page">
        <h2>Loading analytics...</h2>
      </section>
    );
  }

  if (error) {
    return (
      <section className="analytics-page">
        <h1>Analytics</h1>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>
          Retry
        </button>
      </section>
    );
  }

  const analyticsStats = [
    {
      title: "Total Inspections",
      value: stats.images_analyzed.toLocaleString(),
      subtitle: "All stored inspections",
      icon: "📋",
    },
    {
      title: "Defects Detected",
      value: stats.defects_detected.toLocaleString(),
      subtitle: "Actual YOLO detections",
      icon: "⚠️",
    },
    {
      title: "Average Confidence",
      value: `${stats.average_confidence}%`,
      subtitle: "Actual prediction confidence",
      icon: "📊",
    },
    {
      title: "Model mAP@50",
      value: `${stats.model_metrics.map50}%`,
      subtitle: `mAP@50–95: ${stats.model_metrics.map50_95}%`,
      icon: "🎯",
    },
  ];

  return (
    <section className="analytics-page">
      <div className="analytics-header">
        <h1>Analytics</h1>
        <p>AI Detection Performance & Production Insights</p>
      </div>

      <div className="analytics-grid">
        {analyticsStats.map((card) => (
          <AnalyticsCard
            key={card.title}
            {...card}
          />
        ))}
      </div>

      <DetectionTrendChart
        data={stats.detection_trend}
      />

      <div className="analytics-two-column">
        <DefectDistribution
          data={stats.defect_distribution}
        />

        <ConfidenceAnalysis
          data={stats.confidence_by_class}
        />
      </div>

      <div className="analytics-row">
        <ModelPerformance
          metrics={stats.model_metrics}
        />
      </div>

      <div className="analytics-row">
        <RecentPredictions
          data={stats.recent_predictions}
        />
      </div>
    </section>
  );
};

export default Analytics;