import AnalyticsCard from "../components/analytics/AnalyticsCard";
import DefectDistribution from "../components/analytics/DefectDistribution";
import DetectionTrendChart from "../components/analytics/DetectionTrendChart";
import ConfidenceAnalysis from "../components/analytics/ConfidenceAnalysis";
import ModelPerformance from "../components/analytics/ModelPerformance";
import RecentPredictions from "../components/analytics/RecentPredictions";
import { analyticsStats } from "../data/analyticsStats";
import "../styles/analytics.css";

const Analytics = () => {
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

      <DetectionTrendChart />

      <div className="analytics-two-column">
        <DefectDistribution />
          <ConfidenceAnalysis />
      </div>

      <div className="analytics-row">
    <ModelPerformance />
</div>

<div className="analytics-row">
    <RecentPredictions />
</div>
    </section>
  );
};

export default Analytics;