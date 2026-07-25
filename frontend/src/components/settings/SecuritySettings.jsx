import "./SecuritySettings.css";

const SecuritySettings = () => {
  return (
    <div className="settings-card">
      <div className="settings-card-header">
        <h2>Security</h2>
        <p>Manage your account security</p>
      </div>

      <div className="security-grid">

        <button className="security-btn">
          Change Password
        </button>

        <button className="security-btn">
          Enable Two-Factor Authentication
        </button>

      </div>
    </div>
  );
};

export default SecuritySettings;