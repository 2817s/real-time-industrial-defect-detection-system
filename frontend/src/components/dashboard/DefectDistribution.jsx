import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const COLORS = [
  "#38BDF8",
  "#F59E0B",
  "#A855F7",
  "#22C55E",
  "#EF4444",
  "#EC4899",
];

function DefectDistribution({ data = [], total = 0 }) {
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
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="45%"
              innerRadius={70}
              outerRadius={105}
              paddingAngle={4}
            >
              {data.map((item, index) => (
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
              {total}
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
              formatter={(value, name) => [
                `${value} detections`,
                name,
              ]}
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