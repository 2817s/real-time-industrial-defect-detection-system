function RecentDetections({ data = [] }) {
  function formatTime(timestamp) {
    if (!timestamp) return "--";

    return new Date(timestamp).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  const rows = data.flatMap((record, recordIndex) => {
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
    <section className="dashboard-panel recent-detections-panel">
      <div className="panel-heading">
        <div>
          <span className="panel-label">LATEST INSPECTIONS</span>
          <h2>Recent Detections</h2>
        </div>
      </div>

      <div className="table-wrapper">
        <table className="detections-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Defect</th>
              <th>Confidence</th>
              <th>Time</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {rows.length > 0 ? (
              rows.map((item) => (
                <tr key={item.id}>
                  <td>{item.image}</td>
                  <td>{item.defect}</td>
                  <td>{item.confidence}</td>
                  <td>{item.time}</td>
                  <td>
                    <span className="table-status">
                      <span className="health-dot" />
                      Completed
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No inspection records available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default RecentDetections;