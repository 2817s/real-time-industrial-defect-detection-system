import {
  AlertTriangle,
  CheckCircle2,
  Clock3,
  Cpu,
  LoaderCircle,
  ShieldCheck,
} from "lucide-react";

function DetectionStatus({ result, isAnalyzing }) {
  return (
    <section className="dashboard-panel detection-panel">
      <div className="panel-heading">
        <div>
          <span className="panel-label">AI RESULT</span>
          <h2>Detection Summary</h2>
        </div>

        <ShieldCheck size={22} />
      </div>

      {isAnalyzing ? (
        <div className="result-placeholder">
          <LoaderCircle className="analysis-loader" size={58} />

          <h3>Analyzing Image</h3>

          <p>
            The AI model is processing the uploaded metal surface image.
          </p>

          <div className="analysis-progress">
            <span />
          </div>
        </div>
      ) : result ? (
        <>
          <div className="result-success">
            <AlertTriangle size={30} />

            <div>
              <span>DEFECT DETECTED</span>
              <h3>{result.defect}</h3>
            </div>
          </div>

          <div className="confidence-section">
            <div className="confidence-heading">
              <span>Confidence score</span>
              <strong>{result.confidence}%</strong>
            </div>

            <div className="confidence-bar">
              <span style={{ width: `${result.confidence}%` }} />
            </div>
          </div>

          <div className="result-details">
            <div className="result-item">
              <AlertTriangle size={18} />

              <div>
                <span>Severity</span>
                <strong className="severity-medium">
                  {result.severity}
                </strong>
              </div>
            </div>

            <div className="result-item">
              <Clock3 size={18} />

              <div>
                <span>Processing time</span>
                <strong>{result.processingTime}</strong>
              </div>
            </div>

            <div className="result-item">
              <Cpu size={18} />

              <div>
                <span>Detection model</span>
                <strong>{result.model}</strong>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="result-placeholder">
            <CheckCircle2 size={55} />

            <h3>No Analysis Yet</h3>

            <p>
              Upload an image and click
              <strong> Start AI Detection </strong>
              to view the prediction.
            </p>
          </div>

          <div className="result-details">
            <div className="result-item">
              <AlertTriangle size={18} />

              <div>
                <span>Defect</span>
                <strong>--</strong>
              </div>
            </div>

            <div className="result-item">
              <ShieldCheck size={18} />

              <div>
                <span>Confidence</span>
                <strong>--</strong>
              </div>
            </div>

            <div className="result-item">
              <Clock3 size={18} />

              <div>
                <span>Processing</span>
                <strong>--</strong>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
}

export default DetectionStatus;