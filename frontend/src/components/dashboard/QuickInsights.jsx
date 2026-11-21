import {
  Brain,
  Gauge,
  Trophy,
  Database,
} from "lucide-react";

function QuickInsights({ stats }) {
  const insights = [
    {
      title: "Detection Model",
      value: "YOLOv8n - 800px",
      icon: Brain,
    },
    {
      title: "Average Confidence",
      value: `${stats.average_confidence}%`,
      icon: Gauge,
    },
    {
      title: "Highest Confidence",
      value: `${stats.highest_confidence}%`,
      icon: Trophy,
    },
    {
      title: "Total Inspections",
      value: stats.images_analyzed,
      icon: Database,
    },
  ];

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