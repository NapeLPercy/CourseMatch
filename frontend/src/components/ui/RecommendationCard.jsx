import { Sparkles, ArrowRight } from "lucide-react";
import "../../styles/RecommendationCard.css";

function getScoreTier(score) {
  if (score >= 80) return "high";
  if (score >= 60) return "mid";
  return "low";
}

export default function renderRecommendationCard(course) {
  const handleDetails = () => {
    console.log("Course details clicked:", course);
  };

  return (
    <li className="rec-card" key={course.qualificationCode}>
      {/* Top row: score | name | code — one horizontal line */}
      <div className="rec-card__top">
        <div
          className={`rec-card__score rec-card__score--${getScoreTier(course.fitScore)}`}
        >
          <span className="rec-card__score-value">{course.fitScore}%</span>
          <span className="rec-card__score-label">fit</span>
        </div>

        <div className="rec-card__id">
          <h3 className="rec-card__title">{course.qualificationName}</h3>
          <span className="rec-card__code">{course.qualificationCode}</span>
        </div>
      </div>

      {/* Reason — full width, tinted for readability */}
      <div className="rec-card__reason">
        <span className="rec-card__reason-label">
          <Sparkles size={13} strokeWidth={2.2} />
          Why this course?
        </span>
        <p className="rec-card__reason-text">{course.reason}</p>
      </div>

      {/* Action */}
      <div className="rec-card__footer">
        <button
          className="rec-card__btn"
          type="button"
          onClick={handleDetails}
        >
          Course details
          <ArrowRight size={14} strokeWidth={2.5} />
        </button>
      </div>
    </li>
  );
}