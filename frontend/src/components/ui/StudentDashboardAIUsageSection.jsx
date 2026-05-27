import { Sparkles } from "lucide-react";
export default function AIUsageSection({ flags }) {
  const features = [
    { label: "AI Recommendations", key: "hasRecommendation", color: "#2563eb" },
    { label: "Career Deep Dive", key: "hasDeepDive", color: "#9333ea" },
    { label: "Course Comparison", key: "hasComparison", color: "#ea580c" },
  ];

  const usedCount = features.filter((f) => flags[f.key]).length;
  const usageMsg =
    usedCount === 0
      ? "Start exploring AI tools to get personalised insights."
      : usedCount === 1
        ? "You're building your career profile — keep going!"
        : usedCount === 2
          ? "You're making great progress with AI career guidance."
          : "You're actively using all AI career guidance features!";

  return (
    <div className="db__card">
      <div className="db__section-head">
        <div className="db__section-icon db__section-icon--purple">
          <Sparkles size={18} strokeWidth={2} />
        </div>
        <h2 className="db__section-title">AI feature usage</h2>
      </div>

      <p className="db__usage-msg">{usageMsg}</p>

      <div className="db__bars">
        {features.map((f) => {
          const pct = flags[f.key] ? 100 : 0;
          return (
            <div key={f.key} className="db__bar-row">
              <span className="db__bar-label">{f.label}</span>
              <div className="db__bar-track">
                <div
                  className="db__bar-fill"
                  style={{ width: `${pct}%`, background: f.color }}
                />
              </div>
              <span className="db__bar-pct" style={{ color: f.color }}>
                {pct}%
              </span>
            </div>
          );
        })}

        {/* All users baseline */}
        <div className="db__bar-row db__bar-row--baseline">
          <span className="db__bar-label db__bar-label">Other users</span>
          <div className="db__bar-track">
            <div
              className="db__bar-fill db__bar-fill"
              style={{ width: "100%", backgroundColor: "green" }}
            />
          </div>
          <span className="db__bar-pct db__bar-pct" style={{ color: "green" }}>
            100%
          </span>
        </div>
      </div>
    </div>
  );
}
