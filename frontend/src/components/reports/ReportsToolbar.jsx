import "./ReportsToolbar.css";
import { Search, Filter, Download } from "lucide-react";

const ReportsToolbar = () => {
  return (
    <div className="reports-toolbar">

      <div className="reports-search">
        <Search size={18} />
        <input
          type="text"
          placeholder="Search reports..."
        />
      </div>

      <div className="reports-actions">

        <select>
          <option>All Status</option>
          <option>Completed</option>
          <option>Pending</option>
          <option>Failed</option>
        </select>

        <button>
          <Filter size={18} />
          Filter
        </button>

        <button className="export-btn">
          <Download size={18} />
          Export
        </button>

      </div>

    </div>
  );
};

export default ReportsToolbar;