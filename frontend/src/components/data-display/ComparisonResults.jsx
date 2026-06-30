import {
  Trophy,
  CheckCircle2,
  AlertTriangle,
  GraduationCap,
  Briefcase,
  TrendingUp,
  Building2,
  Lightbulb,
  ArrowRight,
  Star,
} from "lucide-react";

/* ── Score ring ─────────────────────────── */
function ScoreRing({ score, color }) {
  const r = 28;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  return (
    <svg width="72" height="72" className="cc__ring">
      <circle cx="36" cy="36" r={r} className="cc__ring-bg" />
      <circle
        cx="36"
        cy="36"
        r={r}
        className={`cc__ring-fill cc__ring-fill--${color}`}
        style={{ strokeDasharray: circ, strokeDashoffset: offset }}
      />
      <text x="36" y="40" className="cc__ring-text">
        {score}%
      </text>
    </svg>
  );
}
/* ── Comparison result ──────────────────── */
export default function ComparisonResult({ comparison }) {
  const winner = comparison.winner.qualificationName;

  const dataA = comparison.courseComparisons.find(
    (course) => course.qualificationName === winner,
  );
  const dataB = comparison.courseComparisons.find(
    (course) => course.qualificationName !== winner,
  );

  const sections = [
    { key: "advantages", label: "Advantages", icon: CheckCircle2 },
    {
      key: "comparativeAdvantages",
      label: "Comparative advantages",
      icon: Star,
    },
    { key: "challenges", label: "Challenges", icon: AlertTriangle },
    { key: "academicFit", label: "Academic fit", icon: GraduationCap },
    { key: "personalityFit", label: "Personality fit", icon: Lightbulb },
    { key: "futureOutlook", label: "Future outlook", icon: TrendingUp },
  ];

  return (
    <div className="cc__result">
      {/* Winner banner */}
      <div className="cc__winner">
        <div className="cc__winner-icon">
          <Trophy size={24} strokeWidth={1.8} />
        </div>
        <div className="cc__winner-text">
          <span className="cc__winner-eyebrow">AI Recommendation</span>
          <h2 className="cc__winner-name">
            {comparison.winner.qualificationName}
          </h2>
          <p className="cc__winner-reason">{comparison.winner.reason}</p>
        </div>
      </div>

      {/* Score header */}
      <div className="cc__score-row">
        <div className="cc__score-card cc__score-card--winner">
          <span className="cc__winner-badge">
            <Trophy size={11} /> Winner
          </span>
          <ScoreRing score={dataA?.matchScore} color="blue" />
          <p className="cc__score-name">{dataA?.qualificationName}</p>
        </div>
        <span className="cc__vs">VS</span>
        <div className="cc__score-card">
          <ScoreRing score={dataB?.matchScore} color="gray" />
          <p className="cc__score-name">{dataB?.qualificationName}</p>
        </div>
      </div>

      {/* Side-by-side sections */}
      {sections.map(({ key, label, icon: Icon }) => (
        <div key={key} className="cc__section">
          <div className="cc__section-header">
            <Icon size={16} strokeWidth={2} className="cc__section-icon" />
            <h3 className="cc__section-title">{label}</h3>
          </div>
          <div className="cc__section-cols">
            <div className="cc__col cc__col--a">
              <p className="cc__col-label">{dataA?.qualificationName}</p>
              <ul className="cc__list">
                {dataA?.[key]?.map((item, i) => (
                  <li key={i} className="cc__list-item">
                    <ArrowRight
                      size={12}
                      strokeWidth={2.5}
                      className="cc__list-arrow"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="cc__col-divider" />
            <div className="cc__col cc__col--b">
              <p className="cc__col-label">{dataB?.qualificationName}</p>
              <ul className="cc__list">
                {dataB?.[key]?.map((item, i) => (
                  <li key={i} className="cc__list-item">
                    <ArrowRight
                      size={12}
                      strokeWidth={2.5}
                      className="cc__list-arrow"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}

      {/* Career comparison */}
      <div className="cc__section">
        <div className="cc__section-header">
          <Briefcase size={16} strokeWidth={2} className="cc__section-icon" />
          <h3 className="cc__section-title">Career comparison</h3>
        </div>
        <ul className="cc__list cc__list--full">
          {comparison.careerComparison?.map((item, i) => (
            <li key={i} className="cc__list-item">
              <ArrowRight
                size={12}
                strokeWidth={2.5}
                className="cc__list-arrow"
              />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Salary comparison */}
      <div className="cc__section">
        <div className="cc__section-header">
          <TrendingUp size={16} strokeWidth={2} className="cc__section-icon" />
          <h3 className="cc__section-title">Salary comparison</h3>
        </div>
        <div className="cc__salary-cards">
          {Object.entries(comparison.salaryComparison || {}).map(
            ([level, text]) => (
              <div key={level} className="cc__salary-card">
                <span className="cc__salary-level">{level}</span>
                <p className="cc__salary-text">{text}</p>
              </div>
            ),
          )}
        </div>
      </div>

      {/* Work environment */}
      <div className="cc__section">
        <div className="cc__section-header">
          <Building2 size={16} strokeWidth={2} className="cc__section-icon" />
          <h3 className="cc__section-title">Work environment</h3>
        </div>
        <ul className="cc__list cc__list--full">
          {comparison.workEnvironmentComparison?.map((item, i) => (
            <li key={i} className="cc__list-item">
              <ArrowRight
                size={12}
                strokeWidth={2.5}
                className="cc__list-arrow"
              />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Decision factors */}
      <div className="cc__section">
        <div className="cc__section-header">
          <Lightbulb size={16} strokeWidth={2} className="cc__section-icon" />
          <h3 className="cc__section-title">Decision factors</h3>
        </div>
        <ul className="cc__list cc__list--full">
          {comparison.decisionFactors?.map((item, i) => (
            <li key={i} className="cc__list-item">
              <ArrowRight
                size={12}
                strokeWidth={2.5}
                className="cc__list-arrow"
              />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Final recommendation */}
      <div className="cc__final">
        <p className="cc__final-text">{comparison.finalRecommendation}</p>
      </div>
    </div>
  );
}
