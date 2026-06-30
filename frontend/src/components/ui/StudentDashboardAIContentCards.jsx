import {
  Sparkles,
  Microscope,
  GitCompare,
  ArrowRight,
  Trophy,
  Star,
  Calendar,
} from "lucide-react";
import { formatTimestamp } from "../../Utils/datetime";

export default function AIContentCards({ activity, navigate }) {
  const { recommendation, deepDive, comparison } = activity;
  const [a, b] = comparison?.courseComparisons || [];
  const winner =
    comparison?.courseComparisons?.find((c) =>
      comparison.finalRecommendation?.includes(c.qualificationName)
    ) || a;

  return (
    <div className="aic">

      {/* ── Section heading ── */}
      <div className="aic__head">
        <div className="aic__head-icon">
          <Star size={15} strokeWidth={2} />
        </div>
        <h2 className="aic__head-title">Your AI insights</h2>
      </div>

      {/* ── Row 1: Recommendation + Deep Dive ── */}
      <div className="aic__row">

        {/* Recommendation */}
        {recommendation && (
          <div className="aic__card">
            <div className="aic__card-accent aic__card-accent--blue" />
            <div className="aic__card-inner">
              <div className="aic__card-top">
                <div className="aic__icon aic__icon--blue">
                  <Sparkles size={15} strokeWidth={1.8} />
                </div>
                <span className="aic__date">
                  <Calendar size={10} strokeWidth={2} />
                  {formatTimestamp(recommendation.created_at)}
                </span>
              </div>

              <span className="aic__label">Recent recommendation</span>
              <p className="aic__title">{recommendation.name}</p>
              <p className="aic__desc">{recommendation.reason}</p>

              <div className="aic__tags">
                <span className="aic__tag">NQF {recommendation.nqf}</span>
                <span className="aic__tag">APS {recommendation.minimum_aps}</span>
                <span className="aic__tag aic__tag--green">
                  {recommendation.fit_score}% fit
                </span>
              </div>

              <button
                className="aic__btn"
                onClick={() => navigate("/view-courses")}
              >
                More recommendations
                <ArrowRight size={13} strokeWidth={2.5} />
              </button>
            </div>
          </div>
        )}

        {/* Deep Dive */}
        {deepDive && (
          <div className="aic__card">
            <div className="aic__card-accent aic__card-accent--purple" />
            <div className="aic__card-inner">
              <div className="aic__card-top">
                <div className="aic__icon aic__icon--purple">
                  <Microscope size={15} strokeWidth={1.8} />
                </div>
                <span className="aic__date">
                  <Calendar size={10} strokeWidth={2} />
                  {formatTimestamp(deepDive.created_at)}
                </span>
              </div>

              <span className="aic__label">Recent deep dive</span>
              <p className="aic__title">{deepDive.name}</p>
              <p className="aic__desc">{deepDive.description}</p>

              <div className="aic__tags">
                <span className="aic__tag">NQF {deepDive.nqf}</span>
                <span className="aic__tag">APS {deepDive.minimum_aps}</span>
              </div>

              <button
                className="aic__btn"
                onClick={() => navigate("/student/ai-recommended-courses")}
              >
                More deep dives
                <ArrowRight size={13} strokeWidth={2.5} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── Row 2: Comparison full width ── */}
      {comparison && (
        <div className="aic__card aic__card--full">
          <div className="aic__card-accent aic__card-accent--teal" />
          <div className="aic__card-inner">

            <div className="aic__card-top">
              <div className="aic__icon aic__icon--teal">
                <GitCompare size={15} strokeWidth={1.8} />
              </div>
              <span className="aic__date">
                <Calendar size={10} strokeWidth={2} />
                {formatTimestamp(comparison.created_at)}
              </span>
            </div>

            <span className="aic__label">Recent courses comparison</span>

            {/* Two course columns */}
            <div className="aic__cmp-cols">
              {[a, b].filter(Boolean).map((course) => {
                const isWinner =
                  winner?.qualificationName === course.qualificationName;
                return (
                  <div
                    key={course.qualificationName}
                    className={`aic__cmp-col ${isWinner ? "aic__cmp-col--winner" : ""}`}
                  >
                    {isWinner && (
                      <span className="aic__cmp-badge">
                        <Trophy size={9} strokeWidth={2.5} />
                        WINNER
                      </span>
                    )}
                    <p className="aic__cmp-name">{course.qualificationName}</p>
                    <div className="aic__cmp-score-wrap">
                      <div className="aic__cmp-track">
                        <div
                          className="aic__cmp-fill"
                          style={{ width: `${course.matchScore}%` }}
                        />
                      </div>
                      <span className="aic__cmp-score">{course.matchScore}%</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              className="aic__btn"
              onClick={() => navigate("/student/course-comparisons")}
            >
              View full comparison
              <ArrowRight size={13} strokeWidth={2.5} />
            </button>

          </div>
        </div>
      )}

    </div>
  );
}