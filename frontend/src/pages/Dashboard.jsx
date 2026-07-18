import {
  AlertTriangle,
  BarChart3,
  CheckCircle2,
  Image,
} from "lucide-react";

import StatCard from "../components/dashboard/StatCard";
import "../styles/dashboard.css";

function Dashboard() {
  return (
    <section className="dashboard-page">
      <h1>Industrial Defect Detection Dashboard</h1>

      <div className="stats-grid">
        <StatCard
          title="Images Analyzed"
          value="1,248"
          subtitle="Today's uploads"
          icon={Image}
          color="#2563EB"
        />

        <StatCard
          title="Defects Detected"
          value="178"
          subtitle="Across all uploads"
          icon={AlertTriangle}
          color="#EF4444"
        />

        <StatCard
          title="Average Confidence"
          value="98.4%"
          subtitle="YOLO Prediction"
          icon={CheckCircle2}
          color="#22C55E"
        />

        <StatCard
          title="Detection Accuracy"
          value="99.1%"
          subtitle="Validation Result"
          icon={BarChart3}
          color="#F59E0B"
        />
      </div>
    </section>
  );
}

export default Dashboard;