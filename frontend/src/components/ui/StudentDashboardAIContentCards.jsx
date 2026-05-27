import {
  Sparkles,
  Microscope,
  GitCompare,
  ArrowRight,
  Trophy,
  Star,
} from "lucide-react";

export default function AIContentCards({ activity, navigate }) {
  const { recommendation, deepDive, comparison } = activity;

  return (
    <div className="db__card">
      <div className="db__section-head">
        <div className="db__section-icon db__section-icon--orange">
          <Star size={18} strokeWidth={2} />
        </div>
        <h2 className="db__section-title">Your AI insights</h2>
      </div>

      <div className="db__ai-grid">
        {/* Recommendation */}
        {recommendation && (
          <div className="db__ai-card db__ai-card--blue">
            <div className="db__ai-card-icon">
              <Sparkles size={18} strokeWidth={1.8} />
            </div>
            <div className="db__ai-card-body">
              <span className="db__ai-label">Recent Course recommendation</span>
                    <p className="db__ai-main">{recommendation.name}</p>
              {/*<p className="db__ai-main">{recommendation.course_code}</p>*/}
               <p className="db__ai-desc">
                {recommendation.reason}
              </p>
              <div className="db__ai-meta">
               {/* <span className="db__ai-tag">
                  {recommendation.university_abbrev}
                </span>*/}
                
                <span className="db__ai-tag">NQF {recommendation.nqf}</span>
                <span className="db__ai-tag">APS {recommendation.minimum_aps}</span>

                <span className="db__ai-tag db__ai-tag--green">
                  {recommendation.fit_score}% fit
                </span>
              </div>
            </div>
            <button
              className="db__ai-btn"
              onClick={() => navigate("/view-courses")}
            >
              Get more Recommendations <ArrowRight size={13} strokeWidth={2.5} />
            </button>
          </div>
        )}

        {/* Deep Dive */}
        {deepDive && (
          <div className="db__ai-card db__ai-card--purple">
            <div className="db__ai-card-icon">
              <Microscope size={18} strokeWidth={1.8} />
            </div>
            <div className="db__ai-card-body">
              <span className="db__ai-label">Recent Career deep dive</span>
              <p className="db__ai-main">{deepDive.name}</p>
              <p className="db__ai-desc">
                {deepDive.description}
              </p>
              <div className="db__ai-meta">
                <span className="db__ai-tag">NQF {deepDive.nqf}</span>
                <span className="db__ai-tag">APS {deepDive.minimum_aps}</span>
              </div>
            </div>
            <button
              className="db__ai-btn"
              onClick={() => navigate("/student/ai-recommended-courses")}
            >
              Get more Deep Dive <ArrowRight size={13} strokeWidth={2.5} />
            </button>
          </div>
        )}

        {/* Comparison */}
        {comparison &&
          (() => {
            const [a, b] = comparison.courseComparisons || [];
            const winner =
              comparison.courseComparisons?.find((c) =>
                comparison.finalRecommendation?.includes(c.qualificationName),
              ) || a;
            return (
              <div className="db__ai-card db__ai-card--teal">
                <div className="db__ai-card-icon">
                  <GitCompare size={18} strokeWidth={1.8} />
                </div>
                <div className="db__ai-card-body">
                  <span className="db__ai-label">Recent Course comparison</span>
                  <p className="db__ai-main">
                    {a?.qualificationName} <span className="db__vs">vs</span>{" "}
                    {b?.qualificationName}
                  </p>
                  <div className="db__ai-meta">
                    <span className="db__ai-tag db__ai-tag--gold">
                      <Trophy size={10} strokeWidth={2.5} />{" "}
                      {winner?.qualificationName}
                    </span>
                    <span className="db__ai-tag db__ai-tag--green">
                      {winner?.matchScore}% match
                    </span>
                  </div>
                  <p className="db__ai-desc">{winner?.advantages?.[0]}</p>
                </div>
                <button
                  className="db__ai-btn"
                  onClick={() => navigate("/student/course-comparisons")}
                >
                  Compare more Courses <ArrowRight size={13} strokeWidth={2.5} />
                </button>
              </div>
            );
          })()}
      </div>
    </div>
  );
}