const recentDetections = [
  {
    id: 1,
    image: "steel_001.jpg",
    defect: "Scratches",
    confidence: "98.4%",
    time: "10:21 AM",
    status: "Completed",
  },
  {
    id: 2,
    image: "steel_002.jpg",
    defect: "Pitted",
    confidence: "95.8%",
    time: "10:16 AM",
    status: "Completed",
  },
  {
    id: 3,
    image: "steel_003.jpg",
    defect: "Inclusion",
    confidence: "93.2%",
    time: "10:08 AM",
    status: "Completed",
  },
  {
    id: 4,
    image: "steel_004.jpg",
    defect: "Rolled Scale",
    confidence: "91.6%",
    time: "09:57 AM",
    status: "Completed",
  },
];

function RecentDetections() {
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
            {recentDetections.map((item) => (
              <tr key={item.id}>
                <td>{item.image}</td>
                <td>{item.defect}</td>
                <td>{item.confidence}</td>
                <td>{item.time}</td>
                <td>
                  <span className="table-status">
                    <span className="health-dot" />
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default RecentDetections;