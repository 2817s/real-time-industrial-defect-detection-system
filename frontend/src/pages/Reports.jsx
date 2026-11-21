import { useEffect, useMemo, useState } from "react";
import {
  FileText,
  Image,
  AlertTriangle,
  Download,
  RefreshCw,
  Search,
  Filter,
  CheckCircle,
  Clock,
} from "lucide-react";

import "./Reports.css";

const API_URL = "http://127.0.0.1:8000/api";

const defectCategories = [
  "All Categories",
  "Crazing",
  "Inclusion",
  "Patches",
  "Pitted Surface",
  "Rolled-In Scale",
  "Scratches",
];

function formatDefectName(name = "") {
  return name
    .replaceAll("_", " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function formatConfidence(value) {
  const confidence = Number(value);

  if (!Number.isFinite(confidence)) return "N/A";

  return `${(confidence <= 1 ? confidence * 100 : confidence).toFixed(2)}%`;
}

function formatDate(value) {
  if (!value) return "N/A";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "N/A";

  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function Reports() {
  const [predictions, setPredictions] = useState([]);
  const [statistics, setStatistics] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState("All Categories");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchReports = async () => {
    try {
      setLoading(true);
      setError("");

      const [historyResponse, statsResponse] = await Promise.all([
        fetch(`${API_URL}/history?limit=50`),
        fetch(`${API_URL}/dashboard/stats`),
      ]);

      if (!historyResponse.ok) {
        throw new Error("Unable to retrieve inspection history.");
      }

      if (!statsResponse.ok) {
        throw new Error("Unable to retrieve dashboard statistics.");
      }

      const historyData = await historyResponse.json();
      const statsData = await statsResponse.json();

      const historyRecords = Array.isArray(historyData)
        ? historyData
        : historyData.history ||
          historyData.predictions ||
          historyData.data ||
          [];

      setPredictions(historyRecords);
      setStatistics(statsData);
    } catch (err) {
      console.error("Reports loading error:", err);
      setError(err.message || "Something went wrong while loading reports.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  // Convert each prediction into individual detection rows.
  const reportRows = useMemo(() => {
    return predictions.flatMap((prediction, index) => {
      const detections = prediction.detections || [];

      if (detections.length === 0) {
        return [
          {
            id: `${index}-none`,
            filename: prediction.filename || "Unknown",
            defect: "No Defect Detected",
            confidence: null,
            createdAt: prediction.created_at,
            status: "Completed",
          },
        ];
      }

      return detections.map((detection, detectionIndex) => ({
        id: `${index}-${detectionIndex}`,
        filename: prediction.filename || "Unknown",
        defect: formatDefectName(detection.class_name),
        confidence: detection.confidence,
        createdAt: prediction.created_at,
        status: "Completed",
      }));
    });
  }, [predictions]);

  // Search and category filtering.
  const filteredRows = useMemo(() => {
    return reportRows.filter((row) => {
      const matchesSearch =
        row.filename.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.defect.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "All Categories" ||
        row.defect.toLowerCase() === selectedCategory.toLowerCase();

      return matchesSearch && matchesCategory;
    });
  }, [reportRows, searchTerm, selectedCategory]);

  // Export currently filtered records.
  const exportCSV = () => {
    if (filteredRows.length === 0) {
      alert("No records available to export.");
      return;
    }

    const headers = [
      "Image Filename",
      "Defect Category",
      "Confidence",
      "Inspection Time",
      "Status",
    ];

    const csvRows = filteredRows.map((row) => [
      row.filename,
      row.defect,
      row.confidence === null
        ? "N/A"
        : formatConfidence(row.confidence),
      formatDate(row.createdAt),
      row.status,
    ]);

    const escapeCSV = (value) =>
      `"${String(value ?? "").replace(/"/g, '""')}"`;

    const csvContent = [
      headers,
      ...csvRows,
    ]
      .map((row) => row.map(escapeCSV).join(","))
      .join("\n");

    const blob = new Blob(["\uFEFF" + csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `DefectAI_Inspection_Report_${new Date()
      .toISOString()
      .slice(0, 10)}.csv`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  return (
    <div className="reports-page">
      <div className="reports-header">
        <div>
          <h1>Reports</h1>
          <p>Inspection History & Defect Detection Reports</p>
        </div>

        <div className="reports-header-actions">
          <button
            className="reports-refresh-btn"
            onClick={fetchReports}
            disabled={loading}
          >
            <RefreshCw size={17} className={loading ? "spin-icon" : ""} />
            Refresh
          </button>

          <button
            className="reports-export-btn"
            onClick={exportCSV}
            disabled={loading || filteredRows.length === 0}
          >
            <Download size={17} />
            Export CSV
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="reports-stats-grid">
        <div className="reports-stat-card">
          <div className="reports-stat-icon blue">
            <Image size={23} />
          </div>

          <div>
            <p>Total Inspections</p>
            <h2>{statistics.images_analyzed ?? 0}</h2>
            <span>All stored inspections</span>
          </div>
        </div>

        <div className="reports-stat-card">
          <div className="reports-stat-icon orange">
            <AlertTriangle size={23} />
          </div>

          <div>
            <p>Defects Detected</p>
            <h2>{statistics.defects_detected ?? 0}</h2>
            <span>Total detected defects</span>
          </div>
        </div>

        <div className="reports-stat-card">
          <div className="reports-stat-icon green">
            <CheckCircle size={23} />
          </div>

          <div>
            <p>Average Confidence</p>
            <h2>{Number(statistics.average_confidence ?? 0).toFixed(2)}%</h2>
            <span>Prediction confidence</span>
          </div>
        </div>

        <div className="reports-stat-card">
          <div className="reports-stat-icon purple">
            <FileText size={23} />
          </div>

          <div>
            <p>Available Records</p>
            <h2>{predictions.length}</h2>
            <span>Latest 50 inspection records</span>
          </div>
        </div>
      </div>

      {/* Inspection History */}
      <section className="reports-table-section">
        <div className="reports-section-heading">
          <div>
            <h2>Inspection History</h2>
            <p>Prediction records retrieved from MongoDB</p>
          </div>

          <span className="reports-record-count">
            {filteredRows.length} detections
          </span>
        </div>

        {/* Search and Filter */}
        <div className="reports-toolbar">
          <div className="reports-search">
            <Search size={18} />

            <input
              type="text"
              placeholder="Search filename or defect..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="reports-filter">
            <Filter size={17} />

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {defectCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="reports-message">
            <RefreshCw className="spin-icon" size={24} />
            <p>Loading inspection reports...</p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="reports-message reports-error">
            <AlertTriangle size={25} />
            <p>{error}</p>
            <button onClick={fetchReports}>Try Again</button>
          </div>
        )}

        {/* Table */}
        {!loading && !error && (
          <div className="reports-table-wrapper">
            <table className="reports-table">
              <thead>
                <tr>
                  <th>Image Filename</th>
                  <th>Defect Category</th>
                  <th>Confidence</th>
                  <th>Model</th>
                  <th>Inspection Time</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {filteredRows.length > 0 ? (
                  filteredRows.map((row) => (
                    <tr key={row.id}>
                      <td className="reports-filename">
                        <span className="reports-filename-content">
                          <FileText size={17} />
                          <span>{row.filename}</span>
                        </span>
                      </td>

                      <td>{row.defect}</td>

                      <td>
                        {row.confidence === null
                          ? "N/A"
                          : formatConfidence(row.confidence)}
                      </td>

                      <td>
                        <span className="reports-model-badge">
                          YOLOv8n
                        </span>
                      </td>

                      <td className="reports-time">
                        <Clock size={15} />
                        {formatDate(row.createdAt)}
                      </td>

                      <td>
                        <span className="reports-status">
                          <CheckCircle size={15} />
                          Completed
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="reports-empty">
                      No inspection records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <div className="reports-footer-note">
        <FileText size={16} />
        Showing the latest 50 inspection records stored in MongoDB.
      </div>
    </div>
  );
}

export default Reports;