import {
  Cpu,
  Database,
  Server,
  Wifi,
} from "lucide-react";

const services = [
  {
    name: "Backend API",
    status: "Online",
    icon: Server,
  },
  {
    name: "YOLO Model",
    status: "Loaded",
    icon: Cpu,
  },
  {
    name: "Database",
    status: "Healthy",
    icon: Database,
  },
  {
    name: "Network",
    status: "Stable",
    icon: Wifi,
  },
];

function SystemHealth() {
  return (
    <section className="dashboard-panel system-health-panel">
      <div className="panel-heading">
        <div>
          <span className="panel-label">SYSTEM STATUS</span>
          <h2>System Health</h2>
        </div>
      </div>

      <div className="health-list">
        {services.map((service) => {
          const Icon = service.icon;

          return (
            <div className="health-item" key={service.name}>
              <div className="health-service">
                <div className="health-icon">
                  <Icon size={20} />
                </div>

                <div>
                  <h3>{service.name}</h3>
                  <p>Operational</p>
                </div>
              </div>

              <span className="health-status">
                <span className="health-dot" />
                {service.status}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default SystemHealth;