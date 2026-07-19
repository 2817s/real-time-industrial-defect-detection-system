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
import { dashboardStats } from "../data/dashboardStats";
import QuickInsights from "../components/dashboard/QuickInsights";

import "../styles/dashboard.css";

function Dashboard() {
  return (
    <section className="dashboard-page">
      <h1>Industrial Defect Detection Dashboard</h1>

      <div className="stats-grid">
        <StatCard
          title="Images Analyzed"
          value={dashboardStats.imagesAnalyzed.toLocaleString()}
          subtitle="Today's uploads"
          icon={Image}
          color="#2563EB"
        />

        <StatCard
          title="Defects Detected"
          value={dashboardStats.defectsDetected}
          subtitle="Across all uploads"
          icon={AlertTriangle}
          color="#EF4444"
        />

        <StatCard
          title="Average Confidence"
          value={`${dashboardStats.averageConfidence}%`}
          subtitle="YOLO Prediction"
          icon={CheckCircle2}
          color="#22C55E"
        />

        <StatCard
          title="Detection Accuracy"
          value={`${dashboardStats.detectionAccuracy}%`}
          subtitle="Validation Result"
          icon={BarChart3}
          color="#F59E0B"
        />
      </div>

      <div className="dashboard-analytics-grid">
        <TrendChart />

        <div className="dashboard-secondary-grid">
          <DefectDistribution />
          <SystemHealth />
        </div>

        <RecentDetections />
          <QuickInsights />
      </div>
    </section>
  );
}

export default Dashboard;