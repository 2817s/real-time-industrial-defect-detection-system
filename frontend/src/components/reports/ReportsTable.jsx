import "./ReportsTable.css";
import { reportsData } from "../../data/reportsData";

const ReportsTable = () => {
  return (
    <div className="reports-table-card">

      <div className="reports-table-header">
        <h2>Generated Reports</h2>
        <p>Latest inspection reports</p>
      </div>

      <table className="reports-table">

        <thead>
          <tr>
            <th>Report ID</th>
            <th>Image</th>
            <th>Defect</th>
            <th>Confidence</th>
            <th>Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {reportsData.map((report) => (

            <tr key={report.id}>

              <td>{report.id}</td>

              <td>{report.file}</td>

              <td>{report.defect}</td>

              <td>{report.confidence}</td>

              <td>{report.date}</td>

              <td>
                <span className="status completed">
                  {report.status}
                </span>
              </td>

              <td>
                <button className="download-btn">
                  Download
                </button>
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
};

export default ReportsTable;