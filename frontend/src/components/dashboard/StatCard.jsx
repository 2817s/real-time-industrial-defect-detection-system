import { motion } from "framer-motion";

function StatCard({
  title,
  value,
  icon: Icon,
  color,
  subtitle,
}) {
  return (
    <motion.div
      className="stat-card"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <div className="stat-header">
        <div
          className="stat-icon"
          style={{ background: color }}
        >
          <Icon size={22} />
        </div>

        <span>{title}</span>
      </div>

      <h2>{value}</h2>

      <p>{subtitle}</p>
    </motion.div>
  );
}

export default StatCard;