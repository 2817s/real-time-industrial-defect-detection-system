import "./ProfileSettings.css";

const ProfileSettings = () => {
  return (
    <div className="settings-card">

      <div className="settings-card-header">
        <h2>Profile Information</h2>
        <p>Manage your account details</p>
      </div>

      <div className="profile-grid">

        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            defaultValue="Mukt Patel"
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            defaultValue="mukt@example.com"
          />
        </div>

        <div className="form-group">
          <label>Role</label>
          <input
            type="text"
            defaultValue="Frontend Engineer"
          />
        </div>

        <div className="form-group">
          <label>Company</label>
          <input
            type="text"
            defaultValue="DefectAI"
          />
        </div>

      </div>

    </div>
  );
};

export default ProfileSettings;