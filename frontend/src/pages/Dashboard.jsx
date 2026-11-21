import { useEffect, useState } from "react";

import {
  AlertTriangle,
  BarChart3,
  CheckCircle2,
  Image,
} from "lucide-react";

import DefectDistribution from "../components/dashboard/DefectDistribution";
import RecentDetections from "../components/dashboard/RecentDetections";
import StatCard from "../components/dashboard/StatCard";
import SystemHealth from "../components/dashboard/SystemHealth";
import TrendChart from "../components/dashboard/TrendChart";
import QuickInsights from "../components/dashboard/QuickInsights";

import "../styles/dashboard.css";

const API_URL = "http://127.0.0.1:8000/api/dashboard/stats";

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchDashboard() {
      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error("Unable to load dashboard statistics.");
        }

        const data = await response.json();

        setStats(data);
        setError(null);
      } catch (err) {
        console.error("Dashboard error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboard();

    const interval = setInterval(fetchDashboard, 30000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <section className="dashboard-page">
        <h2>Loading dashboard...</h2>
      </section>
    );
  }

  if (error) {
    return (
      <section className="dashboard-page">
        <h1>Industrial Defect Detection Dashboard</h1>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>
          Retry
        </button>
      </section>
    );
  }

  return (
    <section className="dashboard-page">
      <h1>Industrial Defect Detection Dashboard</h1>

      <div className="stats-grid">
        <StatCard
          title="Images Analyzed"
          value={stats.images_analyzed.toLocaleString()}
          subtitle="Total stored inspections"
          icon={Image}
          color="#2563EB"
        />

        <StatCard
          title="Defects Detected"
          value={stats.defects_detected}
          subtitle="Across all inspections"
          icon={AlertTriangle}
          color="#EF4444"
        />

        <StatCard
          title="Average Confidence"
          value={`${stats.average_confidence}%`}
          subtitle="Actual YOLO predictions"
          icon={CheckCircle2}
          color="#22C55E"
        />

        <StatCard
          title="Model mAP@50"
          value={`${stats.model_metrics.map50}%`}
          subtitle={`mAP@50–95: ${stats.model_metrics.map50_95}%`}
          icon={BarChart3}
          color="#F59E0B"
        />
      </div>

      <div className="dashboard-analytics-grid">
        <TrendChart data={stats.detection_trend} />

        <div className="dashboard-secondary-grid">
          <DefectDistribution
            data={stats.defect_distribution}
            total={stats.defects_detected}
          />

          <SystemHealth />
        </div>

        <RecentDetections data={stats.recent_predictions} />

        <QuickInsights stats={stats} />
      </div>
    </section>
  );
}

export default Dashboard;