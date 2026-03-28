export default function renderRecommendationCard(course) {
  return (
    <li className="rec-card" key={course.qualification_code}>
      {/* fit score badge - sits to the left */}
      <div className="rec-card__score-badge">
        <span className="rec-card__score-badge__value">{course.fit_score}</span>
        <span className="rec-card__score-badge__label">fit</span>
      </div>

      {/* name + code */}
      <div className="rec-card__header">
        <h3 className="rec-card__title">{course.qualification_name}</h3>
        <span className="rec-card__code">{course.qualification_code}</span>
      </div>

      {/* AI reasoning */}
      <p className="rec-card__reason">
        <strong>Why this course?</strong> {course.reason}
      </p>
    </li>
  );
}
