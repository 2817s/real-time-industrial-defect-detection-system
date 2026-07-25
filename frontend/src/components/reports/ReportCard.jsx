import "./ReportCard.css";

const ReportCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  color,
}) => {
  return (
    <div className="report-card">
      <div
        className="report-card-icon"
        style={{ backgroundColor: color }}
      >
        <Icon size={22} />
      </div>

      <div className="report-card-content">
        <p>{title}</p>
        <h2>{value}</h2>
        <span>{subtitle}</span>
      </div>
    </div>
  );
};

export default ReportCard;