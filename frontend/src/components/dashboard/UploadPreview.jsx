import {
  CheckCircle2,
  ImagePlus,
  LoaderCircle,
  RotateCcw,
  ScanSearch,
  UploadCloud,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

function UploadPreview({ onAnalyze, onReset, isAnalyzing }) {
  const [preview, setPreview] = useState(null);
  const [fileInfo, setFileInfo] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  function handleFile(file) {
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png"];

    if (!allowedTypes.includes(file.type)) {
      alert("Please upload a JPG, JPEG, or PNG image.");
      return;
    }

    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setPreview(URL.createObjectURL(file));

    setFileInfo({
      name: file.name,
      size: (file.size / 1024).toFixed(1),
      type: file.type,
    });

    onReset();
  }

  function handleChange(event) {
    handleFile(event.target.files[0]);
  }

  function handleDrop(event) {
    event.preventDefault();
    handleFile(event.dataTransfer.files[0]);
  }

  function handleReset() {
    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setPreview(null);
    setFileInfo(null);
    fileInputRef.current.value = "";
    onReset();
  }

  return (
    <section className="dashboard-panel upload-preview-panel">
      <div className="panel-heading">
        <div>
          <span className="panel-label">QUICK INSPECTION</span>
          <h2>Upload Metal Surface Image</h2>
        </div>

        <ImagePlus size={22} />
      </div>

      <div
        className="upload-dropzone"
        onDragOver={(event) => event.preventDefault()}
        onDrop={handleDrop}
        onClick={() => !preview && fileInputRef.current.click()}
      >
        {preview ? (
          <div className="preview-container">
            <img
              className="uploaded-preview-image"
              src={preview}
              alt="Uploaded metal surface preview"
            />

            <div className="image-details">
              <h3>Image Ready for AI Detection</h3>

              <div className="detail-row">
                <span>Filename</span>
                <strong>{fileInfo.name}</strong>
              </div>

              <div className="detail-row">
                <span>Type</span>
                <strong>{fileInfo.type}</strong>
              </div>

              <div className="detail-row">
                <span>Size</span>
                <strong>{fileInfo.size} KB</strong>
              </div>

              <div className="ready-status">
                <CheckCircle2 size={18} />
                Ready for AI Detection
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="upload-icon">
              <UploadCloud size={30} />
            </div>

            <h3>Drag and drop an image here</h3>
            <p>or click to browse your device</p>
            <span>JPG, JPEG and PNG supported</span>
          </>
        )}
      </div>

      <input
        ref={fileInputRef}
        className="hidden-file-input"
        type="file"
        accept=".jpg,.jpeg,.png"
        onChange={handleChange}
      />

      <div className="upload-actions">
        {preview && (
          <button
            className="secondary-button"
            type="button"
            onClick={handleReset}
            disabled={isAnalyzing}
          >
            <RotateCcw size={17} />
            Reset
          </button>
        )}

        <button
          className="secondary-button"
          type="button"
          onClick={() => fileInputRef.current.click()}
          disabled={isAnalyzing}
        >
          <ImagePlus size={17} />
          Browse Image
        </button>

        <button
          className="primary-button"
          type="button"
          disabled={!preview || isAnalyzing}
          onClick={onAnalyze}
        >
          {isAnalyzing ? (
            <>
              <LoaderCircle className="spinning-icon" size={18} />
              Analyzing...
            </>
          ) : (
            <>
              <ScanSearch size={18} />
              Start AI Detection
            </>
          )}
        </button>
      </div>
    </section>
  );
}

export default UploadPreview;