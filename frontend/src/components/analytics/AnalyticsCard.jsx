import "./AnalyticsCard.css";

const AnalyticsCard = ({
  title,
  value,
  subtitle,
  icon,
}) => {
  return (
    <div className="analytics-card">
      <div className="analytics-card-top">
        <span>{icon}</span>
        <h4>{title}</h4>
      </div>

      <h2>{value}</h2>

      <p>{subtitle}</p>
    </div>
  );
};

export default AnalyticsCard;