import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const ModelPerformance = ({ metrics }) => {
  const data = [
    {
      metric: "mAP@50",
      value: metrics.map50,
    },
    {
      metric: "mAP@50–95",
      value: metrics.map50_95,
    },
  ];

  return (
    <div className="analytics-card chart-card">
      <h2>Model Performance</h2>
      <p>Experiment 3 - YOLOv8n validation metrics</p>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#22324c"
          />

          <XAxis
            dataKey="metric"
            stroke="#8FA2C3"
          />

          <YAxis
            domain={[0, 100]}
            stroke="#8FA2C3"
            tickFormatter={(value) => `${value}%`}
          />

          <Tooltip
            formatter={(value) => [`${value}%`, "Score"]}
          />

          <Bar
            dataKey="value"
            fill="#38bdf8"
            radius={[6, 6, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ModelPerformance;