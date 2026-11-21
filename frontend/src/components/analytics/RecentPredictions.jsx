import "./RecentPredictions.css";

const RecentPredictions = ({ data = [] }) => {
  function formatTime(timestamp) {
    if (!timestamp) return "--";

    return new Date(timestamp).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  const predictions = data.flatMap((record, recordIndex) => {
    const detections = record.detections || [];

    if (detections.length === 0) {
      return [{
        id: `${record.filename}-${recordIndex}`,
        image: record.filename,
        defect: "No defects",
        confidence: "--",
        time: formatTime(record.created_at),
      }];
    }

    return detections.map((detection, detectionIndex) => ({
      id: `${record.filename}-${recordIndex}-${detectionIndex}`,
      image: record.filename,
      defect: detection.class_name
        .replaceAll("_", " ")
        .replace(/\b\w/g, (letter) => letter.toUpperCase()),
      confidence: `${(detection.confidence * 100).toFixed(2)}%`,
      time: formatTime(record.created_at),
    }));
  });

  return (
    <div className="recent-card">
      <div className="section-header">
        <h2>Recent AI Predictions</h2>
        <p>Latest MongoDB inspection results</p>
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
          {predictions.length > 0 ? (
            predictions.map((item) => (
              <tr key={item.id}>
                <td>{item.image}</td>
                <td>{item.defect}</td>
                <td>{item.confidence}</td>
                <td>YOLOv8n</td>
                <td>{item.time}</td>
                <td>
                  <span className="status completed">
                    ✓ Completed
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No prediction records available.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RecentPredictions;