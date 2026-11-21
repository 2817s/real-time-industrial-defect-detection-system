import {
  AlertTriangle,
  CheckCircle2,
  Clock3,
  Cpu,
  LoaderCircle,
  ShieldCheck,
} from "lucide-react";

function DetectionStatus({ result, isAnalyzing, error }) {
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
      ) : error ? (
        <div className="result-placeholder">
          <AlertTriangle size={55} />

          <h3>Analysis Failed</h3>

          <p>{error}</p>
        </div>
      ) : result ? (
        <>
          {result.count > 0 ? (
            <>
              <div className="result-success">
                <AlertTriangle size={30} />

                <div>
                  <span>DEFECTS DETECTED</span>
                  <h3>{result.count} Detection(s)</h3>
                </div>
              </div>

              <div className="confidence-section">
                <div className="confidence-heading">
                  <span>Highest confidence score</span>

                  <strong>
                    {Math.max(
                      ...result.detections.map(
                        (item) => Number(item.confidencePercentage)
                      )
                    ).toFixed(2)}
                    %
                  </strong>
                </div>

                <div className="confidence-bar">
                  <span
                    style={{
                      width: `${
                        Math.max(
                          ...result.detections.map(
                            (item) => Number(item.confidencePercentage)
                          )
                        )
                      }%`,
                    }}
                  />
                </div>
              </div>

              <div className="result-details">
                {result.detections.map((detection, index) => (
                  <div className="result-item" key={index}>
                    <AlertTriangle size={18} />

                    <div>
                      <span>Detection {index + 1}</span>

                      <strong>
                        {detection.displayName} -{" "}
                        {detection.confidencePercentage}%
                      </strong>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="result-placeholder">
              <CheckCircle2 size={55} />

              <h3>No Defects Detected</h3>

              <p>
                The AI model did not identify any defects in this
                metal surface image.
              </p>
            </div>
          )}

          <div className="result-details">
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

            <div className="result-item">
              <ShieldCheck size={18} />

              <div>
                <span>Total detections</span>
                <strong>{result.count}</strong>
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