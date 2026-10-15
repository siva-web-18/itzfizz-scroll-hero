export default function MetricCard({
  value,
  suffix = "",
  label,
  index,
}) {
  return (
    <article className="metric-card">
      <span className="metric-index">
        0{index + 1} / IMPACT
      </span>

      <div className="metric-value">
        <span
          className="counter"
          data-value={value}
          data-suffix={suffix}
        >
          {value}{suffix}
        </span>
      </div>

      <p>{label}</p>

      <div className="metric-line">
        <span />
      </div>
    </article>
  );
}