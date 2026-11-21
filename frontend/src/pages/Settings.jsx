import { useEffect, useState } from "react";
import {
  Settings as SettingsIcon,
  Server,
  Database,
  Cpu,
  Activity,
  RefreshCw,
  CheckCircle,
  XCircle,
  Clock,
  ShieldCheck,
  Gauge,
  Image,
  Layers,
  Code,
} from "lucide-react";

import "./Settings.css";

const API_URL = "http://127.0.0.1:8000/api";

const defectClasses = [
  "Crazing",
  "Inclusion",
  "Patches",
  "Pitted Surface",
  "Rolled-In Scale",
  "Scratches",
];

function StatusBadge({ status }) {
  if (status === "checking") {
    return <span className="settings-badge checking">Checking...</span>;
  }

  if (status === "online") {
    return (
      <span className="settings-badge online">
        <CheckCircle size={14} />
        Online
      </span>
    );
  }

  return (
    <span className="settings-badge offline">
      <XCircle size={14} />
      Offline
    </span>
  );
}

function Settings() {
  const [backendStatus, setBackendStatus] = useState("checking");
  const [databaseStatus, setDatabaseStatus] = useState("checking");
  const [lastChecked, setLastChecked] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const checkSystemStatus = async () => {
    setRefreshing(true);
    setBackendStatus("checking");
    setDatabaseStatus("checking");

    try {
      const response = await fetch(`${API_URL}/health`);
      if (!response.ok) {
        throw new Error("Backend is unavailable");
      }

      const healthData = await response.json();

      setBackendStatus(
        healthData.success === true ? "online" : "offline"
      );
    } catch (error) {
      console.error("Backend health check failed:", error);
      setBackendStatus("offline");
    }

    try {
      const response = await fetch(`${API_URL}/dashboard/stats`);

      if (!response.ok) {
        throw new Error("Database statistics unavailable");
      }

      await response.json();
      setDatabaseStatus("online");
    } catch (error) {
      console.error("Database health check failed:", error);
      setDatabaseStatus("offline");
    }

    setLastChecked(new Date());
    setRefreshing(false);
  };

  useEffect(() => {
    checkSystemStatus();
  }, []);

  return (
    <div className="settings-page">
      {/* Page Header */}
      <div className="settings-header">
        <div>
          <h1>Settings</h1>
          <p>System Configuration & Infrastructure Status</p>
        </div>

        <button
          className="settings-refresh-btn"
          onClick={checkSystemStatus}
          disabled={refreshing}
        >
          <RefreshCw
            size={17}
            className={refreshing ? "settings-spin" : ""}
          />
          Refresh Status
        </button>
      </div>

      {/* System Status */}
      <section className="settings-section">
        <div className="settings-section-heading">
          <div className="settings-heading-icon">
            <Activity size={21} />
          </div>

          <div>
            <h2>System Health</h2>
            <p>Live status of connected project services</p>
          </div>
        </div>

        <div className="settings-status-grid">
          <div className="settings-status-card">
            <div className="settings-status-left">
              <div className="settings-service-icon blue">
                <Server size={23} />
              </div>

              <div>
                <h3>Backend API</h3>
                <p>FastAPI application server</p>
              </div>
            </div>

            <StatusBadge status={backendStatus} />
          </div>

          <div className="settings-status-card">
            <div className="settings-status-left">
              <div className="settings-service-icon green">
                <Database size={23} />
              </div>

              <div>
                <h3>MongoDB Database</h3>
                <p>MongoDB Atlas connection</p>
              </div>
            </div>

            <StatusBadge status={databaseStatus} />
          </div>

          <div className="settings-status-card">
            <div className="settings-status-left">
              <div className="settings-service-icon purple">
                <Cpu size={23} />
              </div>

              <div>
                <h3>YOLOv8 Model</h3>
                <p>Defect detection model</p>
              </div>
            </div>

            <span className="settings-badge online">
              <CheckCircle size={14} />
              Configured
            </span>
          </div>
        </div>

        <div className="settings-last-checked">
          <Clock size={15} />

          {lastChecked
            ? `Last checked: ${lastChecked.toLocaleTimeString()}`
            : "System status has not been checked yet"}
        </div>
      </section>

      {/* Model Configuration */}
      <section className="settings-section">
        <div className="settings-section-heading">
          <div className="settings-heading-icon">
            <Cpu size={21} />
          </div>

          <div>
            <h2>Model Configuration</h2>
            <p>Currently configured defect detection model</p>
          </div>
        </div>

        <div className="settings-model-card">
          <div className="settings-model-header">
            <div className="settings-model-icon">
              <ShieldCheck size={27} />
            </div>

            <div>
              <h3>YOLOv8n</h3>
              <p>Industrial Surface Defect Detection</p>
            </div>

            <span className="settings-model-tag">Experiment 3</span>
          </div>

          <div className="settings-config-grid">
            <div className="settings-config-item">
              <span>Model Architecture</span>
              <strong>YOLOv8 Nano</strong>
            </div>

            <div className="settings-config-item">
              <span>Input Image Size</span>
              <strong>800 × 800 px</strong>
            </div>

            <div className="settings-config-item">
              <span>Confidence Threshold</span>
              <strong>0.25 (25%)</strong>
            </div>

            <div className="settings-config-item">
              <span>Number of Classes</span>
              <strong>6 Defect Categories</strong>
            </div>

            <div className="settings-config-item">
              <span>Model Format</span>
              <strong>PyTorch (.pt)</strong>
            </div>

            <div className="settings-config-item">
              <span>Model File</span>
              <strong className="settings-file-name">
                defect_model_exp3_img800.pt
              </strong>
            </div>
          </div>
        </div>
      </section>

      {/* Model Performance */}
      <section className="settings-section">
        <div className="settings-section-heading">
          <div className="settings-heading-icon">
            <Gauge size={21} />
          </div>

          <div>
            <h2>Model Performance</h2>
            <p>Experiment 3 validation results</p>
          </div>
        </div>

        <div className="settings-performance-grid">
          <div className="settings-performance-card">
            <span>Precision</span>
            <strong>66.9%</strong>
            <div className="settings-progress">
              <div style={{ width: "66.9%" }} />
            </div>
          </div>

          <div className="settings-performance-card">
            <span>Recall</span>
            <strong>68.5%</strong>
            <div className="settings-progress">
              <div style={{ width: "68.5%" }} />
            </div>
          </div>

          <div className="settings-performance-card">
            <span>mAP@50</span>
            <strong>72.5%</strong>
            <div className="settings-progress">
              <div style={{ width: "72.5%" }} />
            </div>
          </div>

          <div className="settings-performance-card">
            <span>mAP@50–95</span>
            <strong>36.9%</strong>
            <div className="settings-progress">
              <div style={{ width: "36.9%" }} />
            </div>
          </div>
        </div>

        <p className="settings-metrics-note">
          These are validation metrics from Experiment 3, not live
          prediction confidence or real-time accuracy.
        </p>
      </section>

      {/* Defect Categories */}
      <section className="settings-section">
        <div className="settings-section-heading">
          <div className="settings-heading-icon">
            <Layers size={21} />
          </div>

          <div>
            <h2>Defect Categories</h2>
            <p>Classes supported by the NEU-DET dataset</p>
          </div>
        </div>

        <div className="settings-classes-grid">
          {defectClasses.map((category, index) => (
            <div className="settings-class-item" key={category}>
              <span className="settings-class-number">
                {String(index + 1).padStart(2, "0")}
              </span>

              <span>{category}</span>

              <CheckCircle size={16} />
            </div>
          ))}
        </div>
      </section>

      {/* API Information */}
      <section className="settings-section">
        <div className="settings-section-heading">
          <div className="settings-heading-icon">
            <Code size={21} />
          </div>

          <div>
            <h2>API Information</h2>
            <p>Backend service endpoints</p>
          </div>
        </div>

        <div className="settings-api-card">
          <div className="settings-api-base">
            <span>Backend Base URL</span>
            <strong>http://127.0.0.1:8000</strong>
          </div>

          <div className="settings-endpoint-list">
            <div className="settings-endpoint">
              <span className="settings-method get">GET</span>
              <code>/api/health</code>
              <span>Health Check</span>
            </div>

            <div className="settings-endpoint">
              <span className="settings-method post">POST</span>
              <code>/api/predict</code>
              <span>Defect Prediction</span>
            </div>

            <div className="settings-endpoint">
              <span className="settings-method get">GET</span>
              <code>/api/history</code>
              <span>Prediction History</span>
            </div>

            <div className="settings-endpoint">
              <span className="settings-method get">GET</span>
              <code>/api/dashboard/stats</code>
              <span>Dashboard Statistics</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <div className="settings-footer">
        <Image size={17} />
        <span>
          DefectAI – Real-Time Industrial Defect Detection System
        </span>
      </div>
    </div>
  );
}

export default Settings;