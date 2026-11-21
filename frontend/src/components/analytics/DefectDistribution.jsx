import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

import "./DefectDistribution.css";

const COLORS = [
  "#38bdf8",
  "#22c55e",
  "#f97316",
  "#a855f7",
  "#64748b",
  "#ec4899",
];

const DefectDistribution = ({ data = [] }) => {
  return (
    <div className="analytics-panel">
      <div className="panel-header">
        <h3>Defect Distribution</h3>
        <p>Actual detected defect categories</p>
      </div>

      <div className="panel-chart">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={70}
              outerRadius={100}
              paddingAngle={4}
            >
              {data.map((entry, index) => (
                <Cell
                  key={entry.name}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip
              formatter={(value) => [
                `${value} detections`,
                "Count",
              ]}
            />

            <Legend
              verticalAlign="bottom"
              iconType="circle"
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DefectDistribution;