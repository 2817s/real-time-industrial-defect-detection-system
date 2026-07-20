import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { defectDistributionData } from "../../data/analyticsData";
import "./DefectDistribution.css";

const COLORS = [
  "#38bdf8",
  "#22c55e",
  "#f97316",
  "#a855f7",
  "#64748b",
];

const DefectDistribution = () => {
  return (
    <div className="analytics-panel">
      <div className="panel-header">
        <h3>Defect Distribution</h3>
        <p>Most detected defect types</p>
      </div>

      <div className="panel-chart">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={defectDistributionData}
              dataKey="value"
              nameKey="name"
              innerRadius={70}
              outerRadius={100}
              paddingAngle={4}
            >
              {defectDistributionData.map((entry, index) => (
                <Cell
                  key={entry.name}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DefectDistribution;