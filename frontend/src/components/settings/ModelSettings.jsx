import "./ModelSettings.css";

const ModelSettings = () => {
  return (
    <div className="settings-card">

      <div className="settings-card-header">
        <h2>AI Model Settings</h2>
        <p>Select the AI model used for defect detection</p>
      </div>

      <div className="model-grid">

        <label className="model-option">
          <input
            type="radio"
            name="model"
            defaultChecked
          />
          <span>YOLOv8</span>
        </label>

        <label className="model-option">
          <input
            type="radio"
            name="model"
          />
          <span>YOLOv9</span>
        </label>

        <label className="model-option">
          <input
            type="radio"
            name="model"
          />
          <span>CNN</span>
        </label>

        <label className="model-option">
          <input
            type="radio"
            name="model"
          />
          <span>ResNet</span>
        </label>

      </div>

    </div>
  );
};

export default ModelSettings;