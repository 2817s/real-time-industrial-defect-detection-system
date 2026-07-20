import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { detectionTrendData } from "../../data/analyticsData";
import "./DetectionTrendChart.css";

const DetectionTrendChart = () => {
  return (
    <div className="detection-trend-card">
      <div className="detection-trend-header">
        <div>
          <h3>Detection Trend</h3>
          <p>Weekly inspection and defect activity</p>
        </div>

        <span className="trend-period">Last 7 days</span>
      </div>

      <div className="detection-trend-chart">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={detectionTrendData}>
            <defs>
              <linearGradient
                id="inspectionGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#38bdf8" stopOpacity={0} />
              </linearGradient>

              <linearGradient
                id="defectGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="5%" stopColor="#f97316" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#1f2f46"
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
                backgroundColor: "#0f1b2d",
                border: "1px solid #24344d",
                borderRadius: "10px",
                color: "#f8fafc",
              }}
            />

            <Area
              type="monotone"
              dataKey="inspections"
              stroke="#38bdf8"
              strokeWidth={3}
              fill="url(#inspectionGradient)"
            />

            <Area
              type="monotone"
              dataKey="defects"
              stroke="#f97316"
              strokeWidth={3}
              fill="url(#defectGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DetectionTrendChart;