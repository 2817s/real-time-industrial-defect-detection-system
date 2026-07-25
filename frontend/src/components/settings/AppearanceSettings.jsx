import "./AppearanceSettings.css";
import { useTheme } from "../../context/ThemeContext";

const AppearanceSettings = () => {
  const {
    darkMode,
    setDarkMode,
    themeColor,
    setThemeColor,
  } = useTheme();

  return (
    <div className="settings-card">
      <div className="settings-card-header">
        <h2>Appearance</h2>
        <p>Customize the application's appearance</p>
      </div>

      <div className="appearance-options">

        <label className="toggle-item">
          <span>Dark Mode</span>

          <input
            type="checkbox"
            checked={darkMode}
            onChange={(e) => setDarkMode(e.target.checked)}
          />
        </label>

        <div className="theme-group">

          <label>Theme Color</label>

          <select
            className="theme-select"
            value={themeColor}
            onChange={(e) => setThemeColor(e.target.value)}
          >
            <option value="blue">Blue</option>
            <option value="green">Green</option>
            <option value="purple">Purple</option>
            <option value="orange">Orange</option>
          </select>

        </div>

      </div>
    </div>
  );
};

export default AppearanceSettings;