import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { model: "YOLOv8", accuracy: 99.1 },
  { model: "YOLOv9", accuracy: 98.8 },
  { model: "CNN", accuracy: 96.7 },
  { model: "ResNet", accuracy: 95.4 },
];

const ModelPerformance = () => {
  return (
    <div className="analytics-card chart-card">
      <h2>Model Performance</h2>
      <p>Accuracy comparison</p>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#22324c" />
          <XAxis dataKey="model" stroke="#8FA2C3" />
          <YAxis stroke="#8FA2C3" />
          <Tooltip />
          <Bar
            dataKey="accuracy"
            fill="#38bdf8"
            radius={[6, 6, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ModelPerformance;