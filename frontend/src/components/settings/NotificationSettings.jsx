import "./NotificationSettings.css";

const NotificationSettings = () => {
  return (
    <div className="settings-card">
      <div className="settings-card-header">
        <h2>Notification Settings</h2>
        <p>Choose when the system should notify you</p>
      </div>

      <div className="notification-list">
        <label className="toggle-item">
          <span>Email Notifications</span>
          <input type="checkbox" defaultChecked />
        </label>

        <label className="toggle-item">
          <span>Critical Defect Alerts</span>
          <input type="checkbox" defaultChecked />
        </label>

        <label className="toggle-item">
          <span>Weekly Reports</span>
          <input type="checkbox" />
        </label>

        <label className="toggle-item">
          <span>System Maintenance Alerts</span>
          <input type="checkbox" defaultChecked />
        </label>
      </div>
    </div>
  );
};

export default NotificationSettings;