import { CheckCircle2 } from "lucide-react";

export default function ProgressBar({ current, max }) {
  const pct = Math.min((current / max) * 100, 100);
  const minReached = current >= 7;

  return (
    <div className="as__progress">
      <div className="as__progress-track">
        <div
          className={`as__progress-fill ${minReached ? "as__progress-fill--ok" : ""}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="as__progress-label">
        {current} <span className="as__progress-sep">/</span> {max}
        {minReached && (
          <CheckCircle2
            size={13}
            strokeWidth={2.2}
            className="as__progress-check"
          />
        )}
      </span>
    </div>
  );
}
