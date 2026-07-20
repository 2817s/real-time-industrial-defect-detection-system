import { recentPredictions } from "../../data/recentPredictions";
import "./RecentPredictions.css";

const RecentPredictions = () => {
  return (
    <div className="recent-card">
      <div className="section-header">
        <h2>Recent AI Predictions</h2>
        <p>Latest inspection results</p>
      </div>

      <table className="prediction-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Defect</th>
            <th>Confidence</th>
            <th>Model</th>
            <th>Time</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {recentPredictions.map((item) => (
            <tr key={item.image}>
              <td>{item.image}</td>
              <td>{item.defect}</td>
              <td>{item.confidence}</td>
              <td>{item.model}</td>
              <td>{item.time}</td>
              <td>
                <span className="status completed">
                  ● {item.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentPredictions;