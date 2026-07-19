import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import { defectDistributionData } from "../../data/dashboardData";
import { dashboardStats } from "../../data/dashboardStats";

const COLORS = [
  "#38BDF8",
  "#F59E0B",
  "#A855F7",
  "#22C55E",
  "#EF4444",
];

function DefectDistribution() {
  return (
    <section className="dashboard-panel defect-distribution-panel">
      <div className="panel-heading">
        <div>
          <span className="panel-label">DEFECT ANALYSIS</span>
          <h2>Defect Distribution</h2>
        </div>
      </div>

      <div className="distribution-chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={defectDistributionData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="45%"
              innerRadius={70}
              outerRadius={105}
              paddingAngle={4}
            >
              {defectDistributionData.map((item, index) => (
                <Cell
                  key={item.name}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <text
              x="50%"
              y="42%"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#F8FAFC"
              fontSize="34"
              fontWeight="700"
            >
              {dashboardStats.totalDefects}
            </text>

            <text
              x="50%"
              y="51%"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#94A3B8"
              fontSize="14"
            >
              Total Defects
            </text>

            <Tooltip
              formatter={(value) => [`${value}%`, "Share"]}
              contentStyle={{
                background: "#0f172a",
                border: "1px solid rgba(148, 163, 184, 0.15)",
                borderRadius: "12px",
                color: "#f8fafc",
              }}
            />

            <Legend
              verticalAlign="bottom"
              iconType="circle"
              iconSize={9}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

export default DefectDistribution;