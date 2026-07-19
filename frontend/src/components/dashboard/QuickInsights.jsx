import {
  Brain,
  Clock3,
  Gauge,
  Trophy,
} from "lucide-react";

import { dashboardStats } from "../../data/dashboardStats";

const insights = [
  {
    title: "Best Model",
    value: "YOLOv8",
    icon: Brain,
  },
  {
    title: "Avg Processing",
    value: `${dashboardStats.averageProcessingTime} sec`,
    icon: Clock3,
  },
  {
    title: "Highest Confidence",
    value: `${dashboardStats.highestConfidence}%`,
    icon: Trophy,
  },
  {
    title: "Last Inspection",
    value: dashboardStats.lastInspection,
    icon: Gauge,
  },
];

function QuickInsights() {
  return (
    <section className="dashboard-panel quick-insights-panel">
      <div className="panel-heading">
        <div>
          <span className="panel-label">PERFORMANCE</span>
          <h2>Quick Insights</h2>
        </div>
      </div>

      <div className="insight-list">
        {insights.map((item) => {
          const Icon = item.icon;

          return (
            <div key={item.title} className="insight-item">
              <div className="health-icon">
                <Icon size={20} />
              </div>

              <div>
                <h3>{item.title}</h3>
                <p>{item.value}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default QuickInsights;