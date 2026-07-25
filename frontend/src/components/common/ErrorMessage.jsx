import "./ErrorMessage.css";

const ErrorMessage = ({
  message = "Something went wrong.",
}) => {
  return (
    <div className="error-message">
      <div className="error-icon">⚠️</div>

      <div>
        <h3>Error</h3>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default ErrorMessage;