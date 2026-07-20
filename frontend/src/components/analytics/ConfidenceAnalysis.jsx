import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { confidenceAnalysisData } from "../../data/analyticsData";
import "./ConfidenceAnalysis.css";

const ConfidenceAnalysis = () => {
  return (
    <div className="analytics-panel">
      <div className="panel-header">
        <h3>Confidence Analysis</h3>
        <p>AI prediction confidence by defect</p>
      </div>

      <div className="panel-chart">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={confidenceAnalysisData}
            layout="vertical"
            margin={{ top: 10, right: 20, left: 10, bottom: 10 }}
          >
            <XAxis type="number" domain={[90, 100]} hide />
            <YAxis
              dataKey="defect"
              type="category"
              tick={{ fill: "#CBD5E1", fontSize: 13 }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip />

            <Bar
              dataKey="confidence"
              fill="#38BDF8"
              radius={[0, 8, 8, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ConfidenceAnalysis;