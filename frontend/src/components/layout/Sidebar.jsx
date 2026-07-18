import {
  BarChart3,
  FileText,
  LayoutDashboard,
  ScanLine,
  Settings,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const menuItems = [
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { name: "Live Inspection", path: "/inspection", icon: ScanLine },
  { name: "Analytics", path: "/analytics", icon: BarChart3 },
  { name: "Reports", path: "/reports", icon: FileText },
  { name: "Settings", path: "/settings", icon: Settings },
];

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-icon">
          <ScanLine size={24} />
        </div>

        <div>
          <h2>DefectAI</h2>
          <p>Industrial Vision</p>
        </div>
      </div>

      <nav className="sidebar-menu">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "active" : ""}`
              }
            >
              <Icon size={20} />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="system-status">
        <span className="status-dot"></span>

        <div>
          <strong>System Online</strong>
          <p>All services operational</p>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;