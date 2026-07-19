import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { detectionTrendData } from "../../data/dashboardData";

function TrendChart() {
  return (
    <section className="dashboard-panel trend-chart-panel">
      <div className="panel-heading">
        <div>
          <span className="panel-label">WEEKLY ANALYTICS</span>
          <h2>Detection Trend</h2>
        </div>
      </div>

      <div className="chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={detectionTrendData}>
            <defs>
              <linearGradient id="defectGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#38bdf8" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="4 4"
              stroke="rgba(148, 163, 184, 0.12)"
              vertical={false}
            />

            <XAxis
              dataKey="day"
              stroke="#64748b"
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              stroke="#64748b"
              tickLine={false}
              axisLine={false}
            />

            <Tooltip
              contentStyle={{
                background: "#0f172a",
                border: "1px solid rgba(148, 163, 184, 0.15)",
                borderRadius: "12px",
                color: "#f8fafc",
              }}
            />

            <Area
              type="monotone"
              dataKey="defects"
              stroke="#38bdf8"
              strokeWidth={3}
              fill="url(#defectGradient)"
              activeDot={{ r: 6 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

export default TrendChart;