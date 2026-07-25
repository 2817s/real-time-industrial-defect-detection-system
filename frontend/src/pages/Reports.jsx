import ReportCard from "../components/reports/ReportCard";
import ReportsToolbar from "../components/reports/ReportsToolbar";
import ReportsTable from "../components/reports/ReportsTable";
import { reportStats } from "../data/reportStats";
import "../styles/reports.css";

const Reports = () => {
  return (
    <section className="reports-page">
      <div className="reports-header">
        <h1>Reports</h1>
        <p>Manage and export industrial inspection reports</p>
      </div>

      <div className="reports-grid">
        {reportStats.map((card) => (
          <ReportCard
            key={card.title}
            {...card}
          />
        ))}
      </div>
      <ReportsToolbar />
      <ReportsTable />
    </section>
  );
};

export default Reports;