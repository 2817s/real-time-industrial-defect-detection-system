import ProfileSettings from "../components/settings/ProfileSettings";
import ModelSettings from "../components/settings/ModelSettings";
import NotificationSettings from "../components/settings/NotificationSettings";
import AppearanceSettings from "../components/settings/AppearanceSettings";
import SecuritySettings from "../components/settings/SecuritySettings";
import SaveSettings from "../components/settings/SaveSettings";

import "../styles/settings.css";

const Settings = () => {
  return (
    <section className="settings-page">

      <div className="settings-header">
        <h1>Settings</h1>
        <p>Manage your profile and application preferences</p>
      </div>

      <ProfileSettings />

      <ModelSettings />

      <NotificationSettings />

      <AppearanceSettings />

      <SecuritySettings />

      <SaveSettings />

    </section>
  );
};

export default Settings;